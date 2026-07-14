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
  mimeType?: string;
  base64: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT_LENGTH = 5000;
const MAX_EMAIL_LENGTH = 254;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_FILE_SIZE_BYTES = 20 * 1024 * 1024;
const GOOGLE_SCRIPT_TIMEOUT_MS = 15000;
const PARTNERSHIP_PAGE_COLLECTION = "PartnershipPage";
const DEFAULT_PARTNERSHIP_PAGE_KEY = "partnership-main";

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
    mimeType: file.type || undefined,
    base64: contentBuffer.toString("base64"),
  };
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

  const scriptUrl = textValue(process.env.PARTNERSHIP_GOOGLE_SCRIPT_URL);
  const scriptSecret = textValue(process.env.PARTNERSHIP_GOOGLE_SCRIPT_SECRET);

  if (!scriptUrl || !scriptSecret) {
    console.error("Partnership enquiry Google Apps Script webhook is not configured.");
    return { success: false, reason: "missing-email-config" };
  }

  try {
    const attachments = await Promise.all(submission.files.map(fileToAttachment));
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), GOOGLE_SCRIPT_TIMEOUT_MS);
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: scriptSecret,
        recipients: recipients.recipients,
        name: submission.fullName,
        email: submission.email,
        company: submission.organisation,
        website: submission.website,
        countryRegion: submission.region,
        enquiryType: submission.enquiryType,
        projectDescription: submission.project,
        attachments,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const responseText = await response.text();
    const responseBody = responseText
      ? ((JSON.parse(responseText) as { success?: unknown }) ?? {})
      : {};

    if (!response.ok || responseBody.success !== true) {
      throw new Error(`Google Apps Script send failed: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Partnership enquiry Google Apps Script send failed", {
      recipientSource: recipients.source,
      message: error instanceof Error ? error.message : "Unknown Apps Script error",
    });

    return { success: false, reason: "send-error" };
  }
}

export const partnershipFileLimits = {
  allowedFileExtensions: Array.from(allowedFileExtensions).sort(),
  maxFileSizeBytes: MAX_FILE_SIZE_BYTES,
  maxTotalFileSizeBytes: MAX_TOTAL_FILE_SIZE_BYTES,
};
