import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import vm from "node:vm";

process.env.WIX_API_KEY = "test-api-key";
process.env.WIX_SITE_ID = "test-site-id";
process.env.RESEND_API_KEY = "test-resend-key";
process.env.PARTNERSHIP_EMAIL_FROM = "Castiglione <noreply@example.com>";
process.env.PARTNERSHIP_EMAIL_TO = "fallback@example.com";
delete process.env.WIX_PARTNERSHIP_PAGE_RECORD_ID;
process.env.WIX_PARTNERSHIP_PAGE_KEY = "partnership-main";

const source = await readFile(
  new URL("../lib/partnershipEnquiry.ts", import.meta.url),
  "utf8",
);
const formSource = await readFile(
  new URL("../components/PartnershipForm.tsx", import.meta.url),
  "utf8",
);
const executableSource = stripTypeScriptTypes(
  source.replace(/import[\s\S]*?;\n/g, "").replace(/^export /gm, ""),
);

let partnershipPageItem = {
  _id: "partnership-page-main",
  fieldData: {
    recipientEmails:
      "fintan.hocking@castiglione.com.au, anna.x@castiglione.com.au\ninvalid-email; anna.x@castiglione.com.au",
  },
};
let siteSettings = { id: "site-settings-main", contactEmail: "site@example.com" };
const fetchCalls = [];

class MockFile {
  constructor(parts, name, options = {}) {
    this.name = name;
    this.type = options.type ?? "";
    this.buffer = Buffer.concat(parts.map((part) => Buffer.from(part)));
    this.size = this.buffer.length;
  }

  async arrayBuffer() {
    return this.buffer.buffer.slice(
      this.buffer.byteOffset,
      this.buffer.byteOffset + this.buffer.byteLength,
    );
  }
}

const sandbox = {
  process,
  console,
  Buffer,
  File: MockFile,
  Set,
  String,
  Number,
  Boolean,
  Array,
  JSON,
  RegExp,
  Object,
  Error,
  Date,
  async queryWixCollection(collectionName, options) {
    assert.equal(collectionName, "PartnershipPage");
    if (process.env.WIX_PARTNERSHIP_PAGE_RECORD_ID) {
      assert.deepEqual(JSON.parse(JSON.stringify(options.filter)), {
        _id: process.env.WIX_PARTNERSHIP_PAGE_RECORD_ID,
      });
    } else {
      assert.deepEqual(JSON.parse(JSON.stringify(options.filter)), {
        pageKey: "partnership-main",
      });
    }
    return partnershipPageItem ? [partnershipPageItem] : [];
  },
  getWixFields(item) {
    return {
      ...item,
      ...(item?.data ?? {}),
      ...(item?.fieldData ?? {}),
    };
  },
  isWixConfigured() {
    return Boolean(process.env.WIX_API_KEY && process.env.WIX_SITE_ID);
  },
  async getSiteSettings() {
    return siteSettings;
  },
  fetch: async (url, options) => {
    fetchCalls.push({ url: String(url), options });
    return {
      ok: true,
      status: 200,
      statusText: "OK",
      text: async () => JSON.stringify({ id: "email-id" }),
    };
  },
};

vm.createContext(sandbox);
vm.runInContext(
  `${executableSource}\nthis.__partnership = { parseRecipientEmails, getPartnershipRecipients, sendPartnershipEnquiry, validatePartnershipFile, validatePartnershipFiles, partnershipFileLimits };`,
  sandbox,
);

const {
  getPartnershipRecipients,
  parseRecipientEmails,
  partnershipFileLimits,
  sendPartnershipEnquiry,
  validatePartnershipFile,
  validatePartnershipFiles,
} = sandbox.__partnership;

assert.deepEqual(parseRecipientEmails("A@example.com, b@example.com; A@example.com\nbad"), [
  "a@example.com",
  "b@example.com",
]);

let recipients = await getPartnershipRecipients();
assert.equal(recipients.source, "PartnershipPage.recipientEmails");
assert.equal(recipients.recordId, "partnership-page-main");
assert.deepEqual(recipients.recipients, [
  "fintan.hocking@castiglione.com.au",
  "anna.x@castiglione.com.au",
]);

process.env.WIX_PARTNERSHIP_PAGE_RECORD_ID = "partnership-page-main";
recipients = await getPartnershipRecipients();
assert.equal(recipients.source, "PartnershipPage.recipientEmails");
assert.equal(recipients.recordId, "partnership-page-main");
delete process.env.WIX_PARTNERSHIP_PAGE_RECORD_ID;

partnershipPageItem = {
  _id: "partnership-page-main",
  fieldData: {
    recipientEmails: "",
    recipientEmail: "single@example.com",
  },
};
recipients = await getPartnershipRecipients();
assert.equal(recipients.source, "PartnershipPage.recipientEmail");
assert.deepEqual(recipients.recipients, ["single@example.com"]);

partnershipPageItem = { _id: "partnership-page-main", fieldData: {} };
recipients = await getPartnershipRecipients();
assert.equal(recipients.source, "SiteSettings.contactEmail");
assert.deepEqual(recipients.recipients, ["site@example.com"]);

siteSettings = { id: "site-settings-main", contactEmail: "" };
recipients = await getPartnershipRecipients();
assert.equal(recipients.source, "PARTNERSHIP_EMAIL_TO");
assert.deepEqual(recipients.recipients, ["fallback@example.com"]);

partnershipPageItem = {
  _id: "partnership-page-main",
  fieldData: {
    recipientEmails: "one@example.com\ntwo@example.com;bad, one@example.com",
  },
};

const pdfFile = new MockFile(["hello"], "deck.pdf", { type: "application/pdf" });
const exeFile = new MockFile(["bad"], "bad.exe", { type: "application/x-msdownload" });

assert.equal(validatePartnershipFile(pdfFile), true);
assert.equal(validatePartnershipFile(exeFile), false);
assert.equal(validatePartnershipFiles([pdfFile]), true);
assert.equal(partnershipFileLimits.maxFileSizeBytes, 10 * 1024 * 1024);
assert.equal(partnershipFileLimits.maxTotalFileSizeBytes, 20 * 1024 * 1024);

const result = await sendPartnershipEnquiry({
  fullName: "Ada Lovelace",
  organisation: "Analytical Engine",
  email: "ada@example.com",
  website: "https://example.com",
  region: "AU",
  enquiryType: "Artists & Producers",
  project: "A new project",
  files: [pdfFile],
});

assert.deepEqual(JSON.parse(JSON.stringify(result)), { success: true });
assert.equal(fetchCalls.length, 1);

const resendPayload = JSON.parse(fetchCalls[0].options.body);
assert.deepEqual(resendPayload.to, ["one@example.com", "two@example.com"]);
assert.equal(resendPayload.reply_to, "ada@example.com");
assert.equal(resendPayload.attachments.length, 1);
assert.equal(resendPayload.attachments[0].filename, "deck.pdf");
assert.equal(resendPayload.attachments[0].contentType, "application/pdf");
assert.ok(resendPayload.attachments[0].content);
assert.equal(JSON.stringify(resendPayload).includes("fintan.hocking@castiglione.com.au"), false);

const previousApiKey = process.env.RESEND_API_KEY;
delete process.env.RESEND_API_KEY;
const missingConfigResult = await sendPartnershipEnquiry({
  fullName: "Ada Lovelace",
  organisation: "Analytical Engine",
  email: "ada@example.com",
  website: "",
  region: "",
  enquiryType: "Artists & Producers",
  project: "",
  files: [],
});
assert.deepEqual(JSON.parse(JSON.stringify(missingConfigResult)), {
  success: false,
  reason: "missing-email-config",
});
process.env.RESEND_API_KEY = previousApiKey;

assert.match(formSource, /fetch\("\/api\/partnership-enquiry"/);
assert.match(formSource, /new FormData\(event\.currentTarget\)/);
assert.match(formSource, /disabled=\{isSubmitting\}/);
assert.match(formSource, /aria-live="polite"/);
assert.match(formSource, /setStatusMessage\("Thank you\. Your enquiry has been sent\."\)/);

console.log(
  JSON.stringify(
    {
      recipients: resendPayload.to,
      attachmentFilename: resendPayload.attachments[0].filename,
      recipientSource: "PartnershipPage.recipientEmails",
      maxFileSizeMb: partnershipFileLimits.maxFileSizeBytes / 1024 / 1024,
      maxTotalSizeMb: partnershipFileLimits.maxTotalFileSizeBytes / 1024 / 1024,
    },
    null,
    2,
  ),
);
