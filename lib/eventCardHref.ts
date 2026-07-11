import type { TourCardData } from "@/data/tours";
import { getTourHrefFromSlug, normalizeTourSlug } from "@/lib/tourSlug";

const invalidLinkValues = new Set(["", "#", "MANUAL", "OPTIONAL", "UPLOAD TO WIX"]);

function normalizeText(value?: string) {
  return value?.trim() ?? "";
}

function isValidExternalHref(href?: string) {
  const normalizedHref = normalizeText(href);

  if (invalidLinkValues.has(normalizedHref)) {
    return false;
  }

  return normalizedHref.startsWith("http://") || normalizedHref.startsWith("https://");
}

function isValidLocalHref(href?: string) {
  const normalizedHref = normalizeText(href);

  if (invalidLinkValues.has(normalizedHref)) {
    return false;
  }

  return normalizedHref.startsWith("/");
}

export function getEventCardHref(event: Pick<TourCardData, "externalEventUrl" | "href" | "slug">) {
  if (isValidExternalHref(event.externalEventUrl)) {
    return normalizeText(event.externalEventUrl);
  }

  const slug = normalizeTourSlug(event.slug) ?? (isValidLocalHref(event.href) ? normalizeTourSlug(event.href) : undefined);
  return getTourHrefFromSlug(slug);
}
