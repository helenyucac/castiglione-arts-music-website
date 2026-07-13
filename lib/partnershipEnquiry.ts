export type PartnershipEnquiryInput = {
  fullName?: unknown;
  organisation?: unknown;
  email?: unknown;
  website?: unknown;
  region?: unknown;
  enquiryType?: unknown;
  project?: unknown;
  materials?: unknown;
};

export type PartnershipEnquiryResult =
  | { success: true }
  | {
      success: false;
      reason: "invalid-input" | "email-not-configured" | "send-failed";
      message: string;
    };

const PARTNERSHIP_RECIPIENTS = [
  "fintan.hocking@castiglione.com.au",
  "anna.x@castiglione.com.au",
] as const;
const MAX_FIELD_LENGTH = 4000;
const MAX_MATERIALS = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeField(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return String(value).trim().slice(0, MAX_FIELD_LENGTH);
}

function normalizeEmail(value: unknown) {
  return normalizeField(value).toLowerCase();
}

function isValidEmail(value: string) {
  return Boolean(value && value.length <= 254 && EMAIL_PATTERN.test(value));
}

function normalizeMaterials(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeField(item))
    .filter(Boolean)
    .slice(0, MAX_MATERIALS);
}

function stripHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function normalizePartnershipEnquiry(input: PartnershipEnquiryInput) {
  const fullName = normalizeField(input.fullName);
  const organisation = normalizeField(input.organisation);
  const email = normalizeEmail(input.email);
  const website = normalizeField(input.website);
  const region = normalizeField(input.region);
  const enquiryType = normalizeField(input.enquiryType);
  const project = normalizeField(input.project);
  const materials = normalizeMaterials(input.materials);

  return {
    fullName,
    organisation,
    email,
    website,
    region,
    enquiryType,
    project,
    materials,
  };
}

export function validatePartnershipEnquiry(input: ReturnType<typeof normalizePartnershipEnquiry>) {
  if (!input.fullName || !input.organisation || !isValidEmail(input.email)) {
    return false;
  }

  return true;
}

function createEmailBody(input: ReturnType<typeof normalizePartnershipEnquiry>, submittedAt: Date) {
  const materials = input.materials.length > 0 ? input.materials.join(", ") : "Not provided";
  const rows = [
    ["Submitted at", submittedAt.toISOString()],
    ["Full name", input.fullName],
    ["Organisation", input.organisation],
    ["Email", input.email],
    ["Website", input.website || "Not provided"],
    ["Country / Region", input.region || "Not provided"],
    ["Enquiry type", input.enquiryType || "Not provided"],
    ["Supporting materials", materials],
    ["Project details", input.project || "Not provided"],
  ];
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:8px 16px 8px 0">${escapeHtml(
          label,
        )}</th><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return {
    text,
    html: `<table cellpadding="0" cellspacing="0" role="presentation">${htmlRows}</table>`,
  };
}

export async function sendPartnershipEnquiry(inputValue: PartnershipEnquiryInput) {
  const input = normalizePartnershipEnquiry(inputValue);

  if (!validatePartnershipEnquiry(input)) {
    return {
      success: false,
      reason: "invalid-input",
      message: "Please complete the required fields with a valid email address.",
    } satisfies PartnershipEnquiryResult;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PARTNERSHIP_EMAIL_FROM;

  if (!apiKey || !from) {
    console.error("Partnership enquiry email is not configured", {
      hasResendApiKey: Boolean(apiKey),
      hasFrom: Boolean(from),
    });

    return {
      success: false,
      reason: "email-not-configured",
      message: "Email delivery is not configured.",
    } satisfies PartnershipEnquiryResult;
  }

  const subjectName = stripHeaderValue(input.organisation || input.fullName);
  const subject = `New Partnership Enquiry — ${subjectName}`;
  const submittedAt = new Date();
  const body = createEmailBody(input, submittedAt);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: stripHeaderValue(from),
      to: PARTNERSHIP_RECIPIENTS,
      subject,
      reply_to: input.email,
      text: body.text,
      html: body.html,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const responseBody = await response.text().catch(() => "");

    console.error("Partnership enquiry email failed", {
      status: response.status,
      statusText: response.statusText,
      responseBody: responseBody.slice(0, 1000),
    });

    return {
      success: false,
      reason: "send-failed",
      message: "Email delivery failed.",
    } satisfies PartnershipEnquiryResult;
  }

  return { success: true } satisfies PartnershipEnquiryResult;
}

