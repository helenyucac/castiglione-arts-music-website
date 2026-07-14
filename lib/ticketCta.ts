export type TicketCtaState = "ended" | "coming-soon" | "sold-out" | "on-sale" | "unknown";

const invalidTicketTextValues = new Set(["", "#", "OPTIONAL", "MANUAL", "UPLOAD TO WIX"]);

export function normalizeTicketText(value?: string) {
  return value?.trim() ?? "";
}

export function normalizeTicketStatus(value?: string) {
  return normalizeTicketText(value)
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export function isPlaceholderTicketValue(value?: string) {
  const text = normalizeTicketText(value);
  return invalidTicketTextValues.has(text) || invalidTicketTextValues.has(text.toUpperCase());
}

export function getValidTicketHref(href?: string) {
  const normalizedHref = normalizeTicketText(href);

  if (isPlaceholderTicketValue(normalizedHref)) {
    return undefined;
  }

  return /^https?:\/\//i.test(normalizedHref) ? normalizedHref : undefined;
}

export function getValidPrimaryCtaHref(href?: string) {
  const normalizedHref = normalizeTicketText(href);

  if (isPlaceholderTicketValue(normalizedHref)) {
    return undefined;
  }

  return /^(https?:\/\/|\/|#)/i.test(normalizedHref) ? normalizedHref : undefined;
}

export function resolveTicketCtaState(status?: string, href?: string, label?: string): TicketCtaState {
  const normalizedStatus = normalizeTicketStatus(status);
  const normalizedLabel = normalizeTicketStatus(label);
  const normalizedStateText = normalizedStatus || normalizedLabel;

  if (
    normalizedStateText === "event-ended" ||
    normalizedStateText === "ended" ||
    normalizedStateText === "past"
  ) {
    return "ended";
  }

  if (normalizedStateText === "coming-soon") {
    return "coming-soon";
  }

  if (normalizedStateText === "sold-out" || normalizedStateText === "soldout") {
    return "sold-out";
  }

  if (getValidTicketHref(href) || normalizedStatus === "on-sale" || normalizedStatus === "book-now") {
    return "on-sale";
  }

  return "unknown";
}

export function getTicketCtaLabel(status?: string, customLabel?: string, href?: string) {
  const ctaState = resolveTicketCtaState(status, href, customLabel);

  if (ctaState === "ended") {
    return "EVENT ENDED";
  }

  if (ctaState === "coming-soon") {
    return "COMING SOON";
  }

  if (ctaState === "sold-out") {
    return "SOLD OUT";
  }

  const ticketLabel = normalizeTicketText(customLabel);

  return isPlaceholderTicketValue(ticketLabel) ? "BUY TICKETS" : ticketLabel;
}

export function isDisabledTicketCtaState(status?: string, href?: string, label?: string) {
  const ctaState = resolveTicketCtaState(status, href, label);
  return ctaState === "ended" || ctaState === "coming-soon" || ctaState === "sold-out";
}

export function isRelatedEventStatusEligible(status: string) {
  const normalizedStatus = normalizeTicketStatus(status);

  return (
    normalizedStatus === "on-sale" ||
    normalizedStatus === "upcoming" ||
    normalizedStatus === "coming-soon"
  );
}
