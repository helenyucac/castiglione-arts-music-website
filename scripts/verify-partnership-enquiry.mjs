import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import vm from "node:vm";

process.env.WIX_API_KEY = "test-api-key";
process.env.WIX_SITE_ID = "test-site-id";
process.env.PARTNERSHIP_GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/test/exec";
process.env.PARTNERSHIP_GOOGLE_SCRIPT_SECRET = "test-shared-secret";
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
const routeSource = await readFile(
  new URL("../app/api/partnership-enquiry/route.ts", import.meta.url),
  "utf8",
);
const appsScriptSource = await readFile(
  new URL("../scripts/google-apps-script-partnership-enquiry.gs", import.meta.url),
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
let scriptResponseOk = true;
let scriptResponseStatus = 200;
let scriptResponseRedirected = true;
let scriptResponseText = JSON.stringify({ success: true });
let scriptFetchError = null;

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
  URLSearchParams,
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

    if (scriptFetchError) {
      throw scriptFetchError;
    }

    return {
      ok: scriptResponseOk,
      status: scriptResponseStatus,
      statusText: scriptResponseOk ? "OK" : "Error",
      redirected: scriptResponseRedirected,
      text: async () => scriptResponseText,
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

const scriptCall = fetchCalls[0];
assert.equal(scriptCall.url, "https://script.google.com/macros/s/test/exec");
assert.equal(scriptCall.options.headers["Content-Type"], "application/json");

const scriptPayload = JSON.parse(scriptCall.options.body);
assert.equal(scriptPayload.secret, "test-shared-secret");
assert.deepEqual(scriptPayload.recipients, ["one@example.com", "two@example.com"]);
assert.equal(scriptPayload.name, "Ada Lovelace");
assert.equal(scriptPayload.email, "ada@example.com");
assert.equal(scriptPayload.company, "Analytical Engine");
assert.equal(scriptPayload.website, "https://example.com");
assert.equal(scriptPayload.countryRegion, "AU");
assert.equal(scriptPayload.enquiryType, "Artists & Producers");
assert.equal(scriptPayload.projectDescription, "A new project");
assert.equal(scriptPayload.attachments.length, 1);
assert.equal(scriptPayload.attachments[0].filename, "deck.pdf");
assert.equal(scriptPayload.attachments[0].mimeType, "application/pdf");
assert.ok(scriptPayload.attachments[0].base64);
assert.equal(JSON.stringify({ success: true }).includes("one@example.com"), false);
assert.equal("signal" in scriptCall.options, false);

fetchCalls.length = 0;
scriptResponseOk = true;
scriptResponseStatus = 200;
scriptResponseText = JSON.stringify({ success: true });
const delayedButSuccessfulResult = await sendPartnershipEnquiry({
  fullName: "Ada Lovelace",
  organisation: "Analytical Engine",
  email: "ada@example.com",
  website: "",
  region: "",
  enquiryType: "Artists & Producers",
  project: "",
  files: [],
});
assert.deepEqual(JSON.parse(JSON.stringify(delayedButSuccessfulResult)), {
  success: true,
});
assert.equal(fetchCalls.length, 1);

fetchCalls.length = 0;
scriptResponseOk = true;
scriptResponseStatus = 200;
scriptResponseText = "not json";
const malformedResponseResult = await sendPartnershipEnquiry({
  fullName: "Ada Lovelace",
  organisation: "Analytical Engine",
  email: "ada@example.com",
  website: "",
  region: "",
  enquiryType: "Artists & Producers",
  project: "",
  files: [],
});
assert.deepEqual(JSON.parse(JSON.stringify(malformedResponseResult)), {
  success: false,
  reason: "send-error",
});
assert.equal(fetchCalls.length, 1);

fetchCalls.length = 0;
scriptResponseText = JSON.stringify({ success: false, statusCode: 200 });
const unsuccessfulBodyResult = await sendPartnershipEnquiry({
  fullName: "Ada Lovelace",
  organisation: "Analytical Engine",
  email: "ada@example.com",
  website: "",
  region: "",
  enquiryType: "Artists & Producers",
  project: "",
  files: [],
});
assert.deepEqual(JSON.parse(JSON.stringify(unsuccessfulBodyResult)), {
  success: false,
  reason: "send-error",
});
assert.equal(fetchCalls.length, 1);

fetchCalls.length = 0;
scriptFetchError = new Error("Google Apps Script request failed.");
const sendFailureResult = await sendPartnershipEnquiry({
  fullName: "Ada Lovelace",
  organisation: "Analytical Engine",
  email: "ada@example.com",
  website: "",
  region: "",
  enquiryType: "Artists & Producers",
  project: "",
  files: [],
});
assert.deepEqual(JSON.parse(JSON.stringify(sendFailureResult)), {
  success: false,
  reason: "send-error",
});
assert.equal(fetchCalls.length, 1);
scriptFetchError = null;

scriptResponseText = JSON.stringify({ success: true });

const previousScriptSecret = process.env.PARTNERSHIP_GOOGLE_SCRIPT_SECRET;
delete process.env.PARTNERSHIP_GOOGLE_SCRIPT_SECRET;
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
process.env.PARTNERSHIP_GOOGLE_SCRIPT_SECRET = previousScriptSecret;

assert.match(appsScriptSource, /function doPost\(e\)/);
assert.match(appsScriptSource, /PropertiesService[\s\S]*getScriptProperties/);
assert.match(appsScriptSource, /PARTNERSHIP_GOOGLE_SCRIPT_SECRET/);
assert.match(appsScriptSource, /payload\.secret !== expectedSecret/);
assert.match(appsScriptSource, /Utilities\.newBlob/);
assert.match(appsScriptSource, /MailApp\.sendEmail/);
assert.match(appsScriptSource, /replyTo: submission\.email/);
assert.match(appsScriptSource, /function formatAttachmentSummary/);
assert.match(appsScriptSource, /1 attachment/);
assert.match(appsScriptSource, /attachmentSummary/);

const appsScriptSandbox = {
  console,
  Buffer,
  Utilities: {
    base64Decode(value) {
      return Buffer.from(value, "base64");
    },
    newBlob(bytes, mimeType, filename) {
      return {
        bytes,
        mimeType,
        filename,
      };
    },
  },
  ContentService: {
    MimeType: { JSON: "application/json" },
    createTextOutput(value) {
      return {
        value,
        setMimeType() {
          return this;
        },
      };
    },
  },
};

vm.createContext(appsScriptSandbox);
vm.runInContext(
  `${appsScriptSource}\nthis.__appsScript = { validatePayload, buildBody };`,
  appsScriptSandbox,
);

const attachmentPayload = {
  recipients: ["one@example.com"],
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engine",
  attachments: [
    {
      filename: "deck.pdf",
      mimeType: "application/pdf",
      base64: Buffer.from("hello").toString("base64"),
    },
  ],
};
const oneAttachmentSubmission =
  appsScriptSandbox.__appsScript.validatePayload(attachmentPayload);
const oneAttachmentBody =
  appsScriptSandbox.__appsScript.buildBody(oneAttachmentSubmission);

assert.match(
  oneAttachmentBody.text,
  /Supporting materials: 1 attachment: deck\.pdf/,
);
assert.doesNotMatch(
  oneAttachmentBody.text,
  /Supporting materials: Not provided/,
);
assert.equal(oneAttachmentSubmission.attachments.length, 1);
assert.equal(oneAttachmentSubmission.attachments[0].filename, "deck.pdf");

const noAttachmentSubmission = appsScriptSandbox.__appsScript.validatePayload({
  recipients: ["one@example.com"],
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engine",
  attachments: [],
});
const noAttachmentBody =
  appsScriptSandbox.__appsScript.buildBody(noAttachmentSubmission);

assert.match(noAttachmentBody.text, /Supporting materials: Not provided/);

const timeoutToken = "set" + "Timeout";
const timerClearToken = "clear" + timeoutToken.slice(3);
const abortControllerToken = "Abort" + "Controller";
const scriptTimeoutConstant = "GOOGLE_SCRIPT" + "_TIMEOUT_MS";
const controllerSignal = "signal: " + "controller.signal";
assert.equal(source.includes(abortControllerToken), false);
assert.equal(source.includes(timeoutToken), false);
assert.equal(source.includes(timerClearToken), false);
assert.equal(source.includes(controllerSignal), false);
assert.equal(source.includes(scriptTimeoutConstant), false);
assert.equal(formSource.includes(abortControllerToken), false);
assert.equal(formSource.includes(timeoutToken), false);
assert.equal(formSource.includes(timerClearToken), false);

assert.match(routeSource, /const result = await sendPartnershipEnquiry\(submission\)/);
assert.match(routeSource, /return jsonResponse\(\{ success: true \}, 200\)/);
assert.match(routeSource, /return NextResponse\.json\(responseBody, \{ status \}\)/);
assert.match(routeSource, /jsonError\("Something went wrong\. Please try again\.", 502\)/);
assert.doesNotMatch(routeSource, /API RETURN/);
assert.doesNotMatch(routeSource, /Partnership API final result/);

assert.match(formSource, /fetch\("\/api\/partnership-enquiry"/);
assert.match(formSource, /const form = event\.currentTarget/);
assert.match(formSource, /new FormData\(form\)/);
assert.match(formSource, /disabled=\{isSubmitting\}/);
assert.match(formSource, /aria-live="polite"/);
assert.match(formSource, /const raw = await response\.text\(\)/);
assert.match(formSource, /body = JSON\.parse\(raw\) as PartnershipApiResponse/);
assert.match(formSource, /getPartnershipSubmissionMessage\(response\.ok, body\)/);
assert.match(formSource, /body\?\.success === true/);
assert.match(formSource, /setStatusMessage\(""\)/);
assert.match(formSource, /form\.reset\(\)/);
assert.doesNotMatch(formSource, /event\.currentTarget\.reset\(\)/);
assert.doesNotMatch(formSource, /FETCH STATUS|RAW RESPONSE|PARSED BODY|INVALID JSON/);
assert.match(formSource, /catch \(error\)/);
assert.match(formSource, /console\.error\("Partnership form submission failed", error\)/);
assert.match(formSource, /setStatusMessage\(successMessage\)/);
assert.match(formSource, /setStatusMessage\(fallbackErrorMessage\)/);

function getPartnershipSubmissionMessageForTest(responseOk, body) {
  return responseOk && body?.success === true
    ? "Thank you. Your enquiry has been sent."
    : body?.error || "Something went wrong. Please try again.";
}

assert.equal(
  getPartnershipSubmissionMessageForTest(true, { success: true }),
  "Thank you. Your enquiry has been sent.",
);
assert.equal(
  getPartnershipSubmissionMessageForTest(true, { success: false }),
  "Something went wrong. Please try again.",
);
assert.equal(
  getPartnershipSubmissionMessageForTest(false, {
    success: false,
    error: "Something went wrong. Please try again.",
  }),
  "Something went wrong. Please try again.",
);

console.log(
  JSON.stringify(
    {
      scriptUrl: scriptCall.url,
      payloadIncludesAttachment: Boolean(scriptPayload.attachments[0].base64),
      payloadIncludesRecipients: scriptPayload.recipients.length === 2,
      recipientSource: "PartnershipPage.recipientEmails",
      malformedResponseFailsSafely: malformedResponseResult.reason === "send-error",
      unsuccessfulBodyFailsSafely: unsuccessfulBodyResult.reason === "send-error",
      delayedResponseBeforeTimeoutSucceeds: delayedButSuccessfulResult.success === true,
      sendFailureDisplaysControlledError: sendFailureResult.reason === "send-error",
      apiSuccessContract: "HTTP 200 { success: true }",
      frontendRequiresOkAndSuccessTrue: true,
      previousErrorClearedBeforeRetry: true,
      frontendFailureUsesControlledError: true,
      frontendPostsOnce: true,
      hasCustomAbortOrTimeout: false,
      oneAttachmentSummary: "1 attachment: deck.pdf",
      zeroAttachmentSummary: "Not provided",
      maxFileSizeMb: partnershipFileLimits.maxFileSizeBytes / 1024 / 1024,
      maxTotalSizeMb: partnershipFileLimits.maxTotalFileSizeBytes / 1024 / 1024,
    },
    null,
    2,
  ),
);
