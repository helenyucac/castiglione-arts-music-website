import { NextResponse, type NextRequest } from "next/server";
import { subscribeEmailToWix } from "@/lib/newsletterSubscription";

const MAX_SUBSCRIBE_PAYLOAD_LENGTH = 2048;

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

  if (bodyText.length > MAX_SUBSCRIBE_PAYLOAD_LENGTH) {
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

  const allowedKeys = new Set(["email", "company"]);
  const incomingKeys = Object.keys(payload);

  if (incomingKeys.some((key) => !allowedKeys.has(key))) {
    return safeJsonError("Malformed request body.", 400);
  }

  const body = payload as { email?: unknown; company?: unknown };
  const result = await subscribeEmailToWix(body.email, body.company);

  if (result.success) {
    return NextResponse.json(result, { status: 200 });
  }

  if (result.reason === "bot") {
    return NextResponse.json({ success: true, alreadySubscribed: false }, { status: 200 });
  }

  if (result.reason === "invalid-email") {
    return safeJsonError("Please enter a valid email address.", 400);
  }

  return safeJsonError("Something went wrong. Please try again.", 502);
}
