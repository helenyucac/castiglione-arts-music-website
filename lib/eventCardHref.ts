import type { TourCardData } from "@/data/tours";

const invalidLinkValues = new Set(["", "#", "MANUAL", "OPTIONAL", "UPLOAD TO WIX"]);

function normalizeText(value?: string) {
  return value?.trim() ?? "";
}

function isValidHref(href?: string) {
  const normalizedHref = normalizeText(href);

  if (invalidLinkValues.has(normalizedHref)) {
    return false;
  }

  return normalizedHref.startsWith("/") || normalizedHref.startsWith("http://") || normalizedHref.startsWith("https://");
}

function getValidSlug(slug?: string) {
  const normalizedSlug = normalizeText(slug);

  if (invalidLinkValues.has(normalizedSlug)) {
    return undefined;
  }

  return normalizedSlug.split("/").filter(Boolean).at(-1);
}

export function getEventCardHref(event: Pick<TourCardData, "href" | "slug">) {
  if (isValidHref(event.href)) {
    return normalizeText(event.href);
  }

  const slug = getValidSlug(event.slug);
  return slug ? `/tours/${slug}` : undefined;
}
