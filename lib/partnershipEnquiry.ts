import { isWixConfigured, queryWixCollection } from "@/lib/wix/client";
import { getSiteSettings } from "@/lib/wix/siteSettings";
import { getWixFields } from "@/lib/wix/normalizers";
import type { WixRecordFields } from "@/lib/wix/types";

export type PartnershipEnquiryResult =
  | { success: true }
  | {
      success: false;
      reason:
        | "invalid-input"
        | "invalid-file"
        | "missing-recipients"
        | "missing-email-config"
        | "send-error";
    };

export type PartnershipEnquirySubmission = {
  fullName: string;
  organisation: string;
  email: string;
  website: string;
  region: string;
  enquiryType: string;
  project: string;
  files: File[];
};

type AttachmentPayload = {
  filename: string;
  content: string;
  contentType?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT_LENGTH = 5000;
const MAX_EMAIL_LENGTH = 254;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_FILE_SIZE_BYTES = 20 * 1024 * 1024;
const PARTNERSHIP_PAGE_COLLECTION = "PartnershipPage";
const DEFAULT_PARTNERSHIP_PAGE_KEY = "partnership-main";
const GMAIL_SEND_SCOPE = "https://www.googleapis.com/auth/gmail.send";
const GMAIL_SENDER_NAME = "Castiglione Website";
const REQUIRED_GMAIL_SENDER_EMAIL = "helen.y@castiglione.com.au";
const GMAIL_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GMAIL_SEND_URL = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";

const allowedFileTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
]);

const allowedFileExtensions = new Set([
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "jpg",
  "jpeg",
  "png",
]);

function textValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function safeText(value: unknown, maxLength = MAX_TEXT_LENGTH) {
  return textValue(value).slice(0, maxLength);
}

function normalizeEmail(value: unknown) {
  return textValue(value).toLowerCase();
}

export function isValidEmail(value: string) {
  return Boolean(value && value.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(value));
}

export function parseRecipientEmails(value: unknown) {
  const text = textValue(value);

  if (!text) {
    return [];
  }

  const recipients = text
    .split(/[,\n;]+/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .filter(isValidEmail);

  return Array.from(new Set(recipients));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatLine(label: string, value: string) {
  return `${label}: ${value || "Not provided"}`;
}

function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export function validatePartnershipFile(file: File) {
  const extension = getFileExtension(file.name);
  const hasAllowedType = file.type ? allowedFileTypes.has(file.type) : false;
  const hasAllowedExtension = allowedFileExtensions.has(extension);

  return Boolean(
    file.size > 0 &&
      file.size <= MAX_FILE_SIZE_BYTES &&
      hasAllowedExtension &&
      (!file.type || hasAllowedType),
  );
}

export function validatePartnershipFiles(files: File[]) {
  const totalSize = files.reduce((total, file) => total + file.size, 0);

  return (
    totalSize <= MAX_TOTAL_FILE_SIZE_BYTES &&
    files.every(validatePartnershipFile)
  );
}

function getFilesFromFormData(formData: FormData) {
  return formData
    .getAll("materials")
    .filter((item): item is File => item instanceof File && item.size > 0);
}

export function getPartnershipSubmissionFromFormData(
  formData: FormData,
): PartnershipEnquirySubmission | null {
  const fullName = safeText(formData.get("fullName"), 200);
  const organisation = safeText(formData.get("organisation"), 200);
  const email = normalizeEmail(formData.get("email"));
  const website = safeText(formData.get("website"), 300);
  const region = safeText(formData.get("region"), 200);
  const enquiryType = safeText(formData.get("enquiryType"), 200);
  const project = safeText(formData.get("project"), MAX_TEXT_LENGTH);
  const files = getFilesFromFormData(formData);

  if (!fullName || !organisation || !isValidEmail(email)) {
    return null;
  }

  if (!validatePartnershipFiles(files)) {
    return null;
  }

  return {
    fullName,
    organisation,
    email,
    website,
    region,
    enquiryType,
    project,
    files,
  };
}

function getRecipientSourceFromFields(fields: WixRecordFields) {
  const recipientEmails = parseRecipientEmails(fields.recipientEmails);

  if (recipientEmails.length > 0) {
    return {
      source: "PartnershipPage.recipientEmails",
      recipients: recipientEmails,
    };
  }

  const recipientEmail = parseRecipientEmails(fields.recipientEmail);

  if (recipientEmail.length > 0) {
    return {
      source: "PartnershipPage.recipientEmail",
      recipients: recipientEmail,
    };
  }

  return null;
}

function getPartnershipPageLookup() {
  const recordId = textValue(process.env.WIX_PARTNERSHIP_PAGE_RECORD_ID);
  const pageKey = textValue(process.env.WIX_PARTNERSHIP_PAGE_KEY) || DEFAULT_PARTNERSHIP_PAGE_KEY;

  return recordId
    ? {
        filter: { _id: recordId },
        label: `WIX_PARTNERSHIP_PAGE_RECORD_ID:${recordId}`,
      }
    : {
        filter: { pageKey },
        label: `pageKey:${pageKey}`,
      };
}

async function getConfiguredPartnershipPageItem() {
  const lookup = getPartnershipPageLookup();
  const items = await queryWixCollection(PARTNERSHIP_PAGE_COLLECTION, {
    filter: lookup.filter,
    limit: 2,
  });

  if (items.length > 1) {
    console.error("Multiple PartnershipPage records matched the configured lookup.", {
      lookup: lookup.label,
      count: items.length,
    });
  }

  return {
    lookup: lookup.label,
    item: items[0] ?? null,
  };
}

export async function getPartnershipRecipients() {
  if (isWixConfigured()) {
    try {
      const { item: partnershipPageItem, lookup } = await getConfiguredPartnershipPageItem();
      const partnershipFields = partnershipPageItem ? getWixFields(partnershipPageItem) : {};
      const partnershipRecipients = getRecipientSourceFromFields(partnershipFields);

      if (partnershipRecipients) {
        return {
          ...partnershipRecipients,
          recordId:
            partnershipPageItem?._id ??
            partnershipPageItem?.id ??
            textValue(partnershipFields._id) ??
            textValue(partnershipFields.id) ??
            lookup,
        };
      }
    } catch (error) {
      console.error("PartnershipPage recipient lookup failed", {
        message: error instanceof Error ? error.message : "Unknown Wix error",
      });
    }

    try {
      const siteSettings = await getSiteSettings();
      const siteRecipients = parseRecipientEmails(siteSettings?.contactEmail);

      if (siteRecipients.length > 0) {
        return {
          source: "SiteSettings.contactEmail",
          recipients: siteRecipients,
          recordId: siteSettings?.id ?? "SiteSettings",
        };
      }
    } catch (error) {
      console.error("SiteSettings contactEmail lookup failed", {
        message: error instanceof Error ? error.message : "Unknown Wix error",
      });
    }
  }

  const envRecipients = parseRecipientEmails(process.env.PARTNERSHIP_EMAIL_TO);

  if (envRecipients.length > 0) {
    return {
      source: "PARTNERSHIP_EMAIL_TO",
      recipients: envRecipients,
      recordId: "server environment",
    };
  }

  return {
    source: "none",
    recipients: [],
    recordId: undefined,
  };
}

async function fileToAttachment(file: File): Promise<AttachmentPayload> {
  const contentBuffer = Buffer.from(await file.arrayBuffer());

  return {
    filename: file.name,
    content: contentBuffer.toString("base64"),
    contentType: file.type || undefined,
  };
}

function buildEmailBody(submission: PartnershipEnquirySubmission) {
  const submittedAt = new Date().toISOString();
  const lines = [
    "New Partnership Enquiry",
    "",
    formatLine("Submitted at", submittedAt),
    formatLine("Full name", submission.fullName),
    formatLine("Organisation", submission.organisation),
    formatLine("Email", submission.email),
    formatLine("Website", submission.website),
    formatLine("Country / Region", submission.region),
    formatLine("Enquiry type", submission.enquiryType),
    "",
    "Project:",
    submission.project || "Not provided",
    "",
    formatLine(
      "Supporting materials",
      submission.files.length > 0
        ? submission.files.map((file) => file.name).join(", ")
        : "None",
    ),
  ];

  const text = lines.join("\n");
  const html = `<div>${lines
    .map((line) => (line ? escapeHtml(line) : ""))
    .join("<br />")}</div>`;

  return { text, html };
}

function buildSubject(submission: PartnershipEnquirySubmission) {
  return `New Partnership Enquiry — ${submission.organisation || submission.fullName}`;
}

function encodeMimeHeader(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function formatMailbox(name: string, email: string) {
  return `${sanitizeHeaderValue(name)} <${sanitizeHeaderValue(email)}>`;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createMimeBoundary(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function buildMimeEmail({
  attachments,
  html,
  recipients,
  replyTo,
  senderEmail,
  subject,
  text,
}: {
  attachments: AttachmentPayload[];
  html: string;
  recipients: string[];
  replyTo: string;
  senderEmail: string;
  subject: string;
  text: string;
}) {
  const mixedBoundary = createMimeBoundary("castiglione_mixed");
  const alternativeBoundary = createMimeBoundary("castiglione_alt");
  const lines = [
    `From: ${formatMailbox(GMAIL_SENDER_NAME, senderEmail)}`,
    `To: ${recipients.map((recipient) => sanitizeHeaderValue(recipient)).join(", ")}`,
    `Reply-To: ${sanitizeHeaderValue(replyTo)}`,
    `Subject: =?UTF-8?B?${encodeMimeHeader(subject)}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`,
    "",
    `--${mixedBoundary}`,
    `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
    "",
    `--${alternativeBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(text, "utf8").toString("base64"),
    `--${alternativeBoundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(html, "utf8").toString("base64"),
    `--${alternativeBoundary}--`,
  ];

  for (const attachment of attachments) {
    const safeFilename = sanitizeHeaderValue(attachment.filename);
    lines.push(
      `--${mixedBoundary}`,
      `Content-Type: ${attachment.contentType ?? "application/octet-stream"}; name="${safeFilename}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${safeFilename}"`,
      "",
      attachment.content,
    );
  }

  lines.push(`--${mixedBoundary}--`, "");

  return lines.join("\r\n");
}

function getGmailConfig() {
  const clientId = textValue(process.env.GOOGLE_GMAIL_CLIENT_ID);
  const clientSecret = textValue(process.env.GOOGLE_GMAIL_CLIENT_SECRET);
  const refreshToken = textValue(process.env.GOOGLE_GMAIL_REFRESH_TOKEN);
  const senderEmail = normalizeEmail(process.env.GOOGLE_GMAIL_SENDER_EMAIL);

  if (
    !clientId ||
    !clientSecret ||
    !refreshToken ||
    senderEmail !== REQUIRED_GMAIL_SENDER_EMAIL
  ) {
    return null;
  }

  return {
    clientId,
    clientSecret,
    refreshToken,
    senderEmail,
  };
}

async function getGmailAccessToken(config: NonNullable<ReturnType<typeof getGmailConfig>>) {
  const response = await fetch(GMAIL_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const payload = (await response.json().catch(() => ({}))) as { access_token?: unknown };

  if (!response.ok || typeof payload.access_token !== "string" || !payload.access_token) {
    throw new Error(`Gmail OAuth token request failed: ${response.status}`);
  }

  return payload.access_token;
}

async function sendGmailMessage(rawMime: string, accessToken: string) {
  const response = await fetch(GMAIL_SEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      raw: base64UrlEncode(rawMime),
    }),
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Gmail API send failed: ${response.status} ${responseText.slice(0, 500)}`);
  }

  return responseText ? (JSON.parse(responseText) as unknown) : {};
}

export async function sendPartnershipEnquiry(
  submission: PartnershipEnquirySubmission,
): Promise<PartnershipEnquiryResult> {
  if (!validatePartnershipFiles(submission.files)) {
    return { success: false, reason: "invalid-file" };
  }

  const recipients = await getPartnershipRecipients();

  if (recipients.recipients.length === 0) {
    console.error("Partnership enquiry has no valid recipients configured.");
    return { success: false, reason: "missing-recipients" };
  }

  const gmailConfig = getGmailConfig();

  if (!gmailConfig) {
    console.error("Partnership enquiry Gmail API credentials are not configured.");
    return { success: false, reason: "missing-email-config" };
  }

  try {
    const attachments = await Promise.all(submission.files.map(fileToAttachment));
    const body = buildEmailBody(submission);
    const accessToken = await getGmailAccessToken(gmailConfig);
    const rawMime = buildMimeEmail({
      attachments,
      html: body.html,
      recipients: recipients.recipients,
      replyTo: submission.email,
      senderEmail: gmailConfig.senderEmail,
      subject: buildSubject(submission),
      text: body.text,
    });

    await sendGmailMessage(rawMime, accessToken);

    return { success: true };
  } catch (error) {
    console.error("Partnership enquiry Gmail send failed", {
      recipientSource: recipients.source,
      message: error instanceof Error ? error.message : "Unknown Gmail API error",
    });

    return { success: false, reason: "send-error" };
  }
}

export const partnershipFileLimits = {
  allowedFileExtensions: Array.from(allowedFileExtensions).sort(),
  gmailSendScope: GMAIL_SEND_SCOPE,
  maxFileSizeBytes: MAX_FILE_SIZE_BYTES,
  maxTotalFileSizeBytes: MAX_TOTAL_FILE_SIZE_BYTES,
};
