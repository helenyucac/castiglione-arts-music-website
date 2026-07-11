const invalidSlugValues = new Set(["", "#", "MANUAL", "OPTIONAL", "UPLOAD TO WIX"]);

function normalizeText(value?: string) {
  return value?.trim() ?? "";
}

function decodeSlugSegment(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getLastPathSegment(value: string) {
  const pathOnly = value.split(/[?#]/)[0] ?? value;
  return pathOnly.split("/").filter(Boolean).at(-1) ?? pathOnly;
}

export function normalizeTourSlug(value?: string) {
  const rawValue = normalizeText(value);

  if (invalidSlugValues.has(rawValue) || invalidSlugValues.has(rawValue.toUpperCase())) {
    return undefined;
  }

  const slugSource = decodeSlugSegment(getLastPathSegment(rawValue));
  const normalizedSlug = slugSource
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalizedSlug || undefined;
}

export function getTourSlugFromHref(href?: string) {
  return normalizeTourSlug(href);
}

export function getTourHrefFromSlug(slug?: string) {
  const normalizedSlug = normalizeTourSlug(slug);
  return normalizedSlug ? `/tours/${normalizedSlug}` : undefined;
}
