import type { TourCardData } from "@/data/tours";

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

function getValidSlug(slug?: string) {
  const normalizedSlug = normalizeText(slug);

  if (invalidLinkValues.has(normalizedSlug)) {
    return undefined;
  }

  return normalizedSlug.split("/").filter(Boolean).at(-1);
}

export function getEventCardHref(event: Pick<TourCardData, "externalEventUrl" | "href" | "slug">) {
  if (isValidExternalHref(event.externalEventUrl)) {
    return normalizeText(event.externalEventUrl);
  }

  const slug = getValidSlug(event.slug) ?? (isValidLocalHref(event.href) ? getValidSlug(event.href) : undefined);
  return slug ? `/tours/${slug}` : undefined;
}
