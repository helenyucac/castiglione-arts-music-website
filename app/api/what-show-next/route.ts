import { NextResponse } from "next/server";
import { submitWhatShowNextForm, type WixSurveySubmissionValue } from "@/lib/wix/forms";

type SurveyRequestBody = {
  values?: Record<string, WixSurveySubmissionValue>;
  website?: unknown;
};

function isSubmissionValue(value: unknown): value is WixSurveySubmissionValue {
  return (
    typeof value === "string" ||
    typeof value === "boolean" ||
    (Array.isArray(value) && value.every((item) => typeof item === "string"))
  );
}

function normalizeValues(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const entries = Object.entries(value).filter(([, fieldValue]) => isSubmissionValue(fieldValue));

  if (entries.length === 0) {
    return null;
  }

  return Object.fromEntries(
    entries.map(([key, fieldValue]) => [
      key,
      typeof fieldValue === "string" && fieldValue.length > 4000
        ? fieldValue.slice(0, 4000)
        : fieldValue,
    ]),
  ) as Record<string, WixSurveySubmissionValue>;
}

export async function POST(request: Request) {
  let body: SurveyRequestBody;

  try {
    body = (await request.json()) as SurveyRequestBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Please check your response and try again." },
      { status: 400 },
    );
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ success: true });
  }

  const values = normalizeValues(body.values);

  if (!values) {
    return NextResponse.json(
      { success: false, error: "Please complete the form before submitting." },
      { status: 400 },
    );
  }

  try {
    await submitWhatShowNextForm(values);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("What show next Wix form submission failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }
}
