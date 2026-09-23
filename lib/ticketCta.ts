export type TicketCtaState = "ended" | "coming-soon" | "sold-out" | "on-sale" | "unknown";
export type TicketCtaMode = "buyTickets" | "registerInterest" | "comingSoon";

const invalidTicketTextValues = new Set(["", "#", "OPTIONAL", "MANUAL", "UPLOAD TO WIX"]);
const ticketCtaModeAliases: Record<string, TicketCtaMode> = {
  "buy-tickets": "buyTickets",
  buytickets: "buyTickets",
  "buy-ticket": "buyTickets",
  "book-now": "buyTickets",
  "tickets": "buyTickets",
  "ticket": "buyTickets",
  "on-sale": "buyTickets",
  "register-interest": "registerInterest",
  registerinterest: "registerInterest",
  "register-interests": "registerInterest",
  registerinterests: "registerInterest",
  "interest": "registerInterest",
  "waitlist": "registerInterest",
  "wait-list": "registerInterest",
  "coming-soon": "comingSoon",
  comingsoon: "comingSoon",
  hidden: "comingSoon",
};

export function normalizeTicketText(value?: string) {
  return value?.trim() ?? "";
}

export function normalizeTicketStatus(value?: string) {
  return normalizeTicketText(value)
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export function normalizeTicketCtaMode(value?: unknown): TicketCtaMode | undefined {
  if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    return undefined;
  }

  const normalizedValue = String(value)
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

  return ticketCtaModeAliases[normalizedValue];
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

  if (normalizedStateText === "coming-soon" || normalizedStateText === "hidden") {
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

export function getRegisterInterestHref(eventSlug?: string) {
  const slug = normalizeTicketText(eventSlug);
  const params = slug ? `?event=${encodeURIComponent(slug)}` : "";

  return `/register-interest${params}`;
}

export function getTicketLinkRedirectHref(
  eventSlug?: string,
  tourDate?: {
    city?: string;
    date?: string;
    displayDate?: string;
    showLabel?: string;
  },
) {
  const slug = normalizeTicketText(eventSlug);

  if (!slug) {
    return undefined;
  }

  const params = new URLSearchParams({ event: slug });
  const city = normalizeTicketText(tourDate?.city);
  const date = normalizeTicketText(tourDate?.displayDate ?? tourDate?.date);
  const show = normalizeTicketText(tourDate?.showLabel);

  if (city) {
    params.set("city", city);
  }

  if (date) {
    params.set("date", date);
  }

  if (show) {
    params.set("show", show);
  }

  return `/api/ticket-link?${params.toString()}`;
}

export function isRelatedEventStatusEligible(status: string) {
  const normalizedStatus = normalizeTicketStatus(status);

  return (
    normalizedStatus === "on-sale" ||
    normalizedStatus === "upcoming" ||
    normalizedStatus === "coming-soon"
  );
}
