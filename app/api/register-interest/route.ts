import { NextResponse, type NextRequest } from "next/server";
import { submitRegisterInterest, type RegisterInterestSubmission } from "@/lib/registerInterest";

const MAX_REGISTER_INTEREST_PAYLOAD_LENGTH = 4096;

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  let bodyText = "";

  try {
    bodyText = await request.text();
  } catch {
    return jsonError("Malformed request body.", 400);
  }

  if (bodyText.length > MAX_REGISTER_INTEREST_PAYLOAD_LENGTH) {
    return jsonError("Malformed request body.", 400);
  }

  let payload: unknown;

  try {
    payload = bodyText ? (JSON.parse(bodyText) as unknown) : {};
  } catch {
    return jsonError("Malformed request body.", 400);
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return jsonError("Malformed request body.", 400);
  }

  const allowedKeys = new Set(["email", "eventSlug", "eventTitle", "city", "website"]);
  const incomingKeys = Object.keys(payload);

  if (incomingKeys.some((key) => !allowedKeys.has(key))) {
    return jsonError("Malformed request body.", 400);
  }

  const body = payload as Record<string, unknown>;
  const result = await submitRegisterInterest({
    email: body.email,
    eventSlug: body.eventSlug,
    eventTitle: body.eventTitle,
    city: body.city,
    website: body.website,
  } satisfies RegisterInterestSubmission);

  if (result.success) {
    return NextResponse.json(result, { status: 200 });
  }

  if (result.reason === "bot") {
    return NextResponse.json({ success: true, alreadyRegistered: false }, { status: 200 });
  }

  if (result.reason === "invalid-email") {
    return jsonError("Please enter a valid email address.", 400);
  }

  if (result.reason === "invalid-city") {
    return jsonError("Please select a city.", 400);
  }

  if (result.reason === "invalid-event") {
    return jsonError("Please choose an event from the website.", 400);
  }

  return jsonError("Something went wrong. Please try again.", 502);
}
