import { NextResponse, type NextRequest } from "next/server";
import { sendPartnershipEnquiry } from "@/lib/partnershipEnquiry";

const MAX_PARTNERSHIP_PAYLOAD_LENGTH = 12000;
const allowedPayloadKeys = new Set([
  "fullName",
  "organisation",
  "email",
  "website",
  "region",
  "enquiryType",
  "project",
  "materials",
]);

function safeJsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  let bodyText = "";

  try {
    bodyText = await request.text();
  } catch {
    return safeJsonError("Malformed request body.", 400);
  }

  if (bodyText.length > MAX_PARTNERSHIP_PAYLOAD_LENGTH) {
    return safeJsonError("Malformed request body.", 400);
  }

  let payload: unknown;

  try {
    payload = bodyText ? (JSON.parse(bodyText) as unknown) : {};
  } catch {
    return safeJsonError("Malformed request body.", 400);
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return safeJsonError("Malformed request body.", 400);
  }

  const incomingKeys = Object.keys(payload);

  if (incomingKeys.some((key) => !allowedPayloadKeys.has(key))) {
    return safeJsonError("Malformed request body.", 400);
  }

  const result = await sendPartnershipEnquiry(payload);

  if (result.success) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  if (result.reason === "invalid-input") {
    return safeJsonError(result.message, 400);
  }

  return safeJsonError("Something went wrong. Please try again.", 502);
}

