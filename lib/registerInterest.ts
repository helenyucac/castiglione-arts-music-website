import { insertWixCollectionItem, queryWixCollection } from "@/lib/wix/client";
import type { WixRecordFields } from "@/lib/wix/types";
import { normalizeSubscriberEmail, validateSubscriberEmail } from "@/lib/newsletterSubscription";

export type RegisterInterestSubmission = {
  email: unknown;
  eventSlug: unknown;
  eventTitle: unknown;
  city: unknown;
  website?: unknown;
};

export type RegisterInterestResult =
  | { success: true; alreadyRegistered: boolean }
  | {
      success: false;
      reason: "invalid-email" | "invalid-event" | "invalid-city" | "bot" | "wix-error";
    };

const REGISTER_INTEREST_COLLECTION_NAME = "RegisterInterest";
const MAX_TEXT_LENGTH = 240;

function safeText(value: unknown, maxLength = MAX_TEXT_LENGTH) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return String(value).trim().slice(0, maxLength);
}

function buildRegisterInterestRecord(
  email: string,
  eventSlug: string,
  eventTitle: string,
  city: string,
): WixRecordFields {
  return {
    email,
    eventSlug,
    eventTitle,
    city,
    source: "website-register-interest",
    status: "new",
    consent: true,
    submittedAt: new Date().toISOString(),
  };
}

export async function submitRegisterInterest(
  submission: RegisterInterestSubmission,
): Promise<RegisterInterestResult> {
  const honeypot = typeof submission.website === "string" ? submission.website.trim() : "";

  if (honeypot) {
    return { success: false, reason: "bot" };
  }

  const email = normalizeSubscriberEmail(submission.email);
  const eventSlug = safeText(submission.eventSlug);
  const eventTitle = safeText(submission.eventTitle);
  const city = safeText(submission.city);

  if (!validateSubscriberEmail(email)) {
    return { success: false, reason: "invalid-email" };
  }

  if (!eventSlug || !eventTitle) {
    return { success: false, reason: "invalid-event" };
  }

  if (!city) {
    return { success: false, reason: "invalid-city" };
  }

  try {
    const existingItems = await queryWixCollection(REGISTER_INTEREST_COLLECTION_NAME, {
      filter: {
        email,
        eventSlug,
        city,
      },
      limit: 1,
      cache: "no-store",
    });

    if (existingItems.length > 0) {
      return { success: true, alreadyRegistered: true };
    }

    await insertWixCollectionItem(
      REGISTER_INTEREST_COLLECTION_NAME,
      buildRegisterInterestRecord(email, eventSlug, eventTitle, city),
    );

    return { success: true, alreadyRegistered: false };
  } catch (error) {
    console.error("Register interest submission failed", {
      eventSlug,
      city,
      message: error instanceof Error ? error.message : "Unknown Wix error",
    });

    return { success: false, reason: "wix-error" };
  }
}
