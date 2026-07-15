import { NextResponse, type NextRequest } from "next/server";
import {
  getPartnershipSubmissionFromFormData,
  sendPartnershipEnquiry,
} from "@/lib/partnershipEnquiry";

const MAX_PARTNERSHIP_FORM_BODY_BYTES = 22 * 1024 * 1024;

function jsonResponse(responseBody: { success: boolean; error?: string }, status: number) {
  return NextResponse.json(responseBody, { status });
}

function jsonError(message: string, status: number) {
  return jsonResponse({ success: false, error: message }, status);
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_PARTNERSHIP_FORM_BODY_BYTES) {
    return jsonError("One or more files are too large. Please reduce your upload and try again.", 413);
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError("Malformed form submission.", 400);
  }

  const submission = getPartnershipSubmissionFromFormData(formData);

  if (!submission) {
    return jsonError("Please check your details and uploaded files before submitting.", 400);
  }

  const result = await sendPartnershipEnquiry(submission);

  if (result.success) {
    return jsonResponse({ success: true }, 200);
  }

  if (result.reason === "invalid-file") {
    return jsonError("One or more files are too large or not supported.", 400);
  }

  if (result.reason === "invalid-input") {
    return jsonError("Please check your details before submitting.", 400);
  }

  return jsonError("Something went wrong. Please try again.", 502);
}
