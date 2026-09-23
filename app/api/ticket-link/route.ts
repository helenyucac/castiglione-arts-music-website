import { NextResponse, type NextRequest } from "next/server";
import { getValidTicketHref } from "@/lib/ticketCta";
import { normalizeTourSlug } from "@/lib/tourSlug";
import { isWixConfigured, queryWixCollection, sortAsc, visibleFilter } from "@/lib/wix/client";
import { getWixFields, normalizeEvent, normalizeTourDate } from "@/lib/wix/normalizers";
import type { NormalizedEvent, NormalizedTourDate, WixRecordFields } from "@/lib/wix/types";

export const dynamic = "force-dynamic";

function htmlError(message: string, status: number) {
  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta name="robots" content="noindex" /><title>Ticket link unavailable</title></head><body><main style="font-family: sans-serif; max-width: 640px; margin: 12vh auto; padding: 24px;"><h1>Ticket link unavailable</h1><p>${message}</p><p>Please return to the Castiglione website and try again.</p></main></body></html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}

function stringValue(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).trim();
  }

  return "";
}

function normalizeLookupValue(value?: string | null) {
  return stringValue(value)
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getReferenceCandidates(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(getReferenceCandidates);
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    const candidate = String(value).trim();

    if (!candidate) {
      return [];
    }

    const referenceId = candidate.split("/").filter(Boolean).at(-1);
    return referenceId && referenceId !== candidate ? [candidate, referenceId] : [candidate];
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const record = value as WixRecordFields;
  return [
    record._id,
    record.id,
    record.slug,
    record.title,
    record.name,
    record.event,
    record.data,
    record.fieldData,
  ].flatMap(getReferenceCandidates);
}

function getReferenceKeys(value: string) {
  return [value, value.toLowerCase(), normalizeTourSlug(value)]
    .map((candidate) => candidate?.trim())
    .filter((candidate): candidate is string => Boolean(candidate));
}

function buildEventKeySet(event: NormalizedEvent, fields: WixRecordFields) {
  return new Set(
    [
      event.id,
      event.slug,
      event.title,
      fields._id,
      fields.id,
      fields.slug,
      fields.title,
      fields.name,
    ]
      .flatMap(getReferenceCandidates)
      .flatMap(getReferenceKeys),
  );
}

function tourDateMatchesEvent(fields: WixRecordFields, eventKeys: Set<string>) {
  return [fields.event, fields.eventSlug, fields.eventId].some((value) =>
    getReferenceCandidates(value)
      .flatMap(getReferenceKeys)
      .some((candidate) => eventKeys.has(candidate)),
  );
}

function eventMatchesSlug(item: unknown, eventSlug: string) {
  const event = normalizeEvent(item as Parameters<typeof normalizeEvent>[0]);
  const fields = getWixFields(item as Parameters<typeof getWixFields>[0]);
  const slugCandidates = [
    event.slug,
    event.href,
    event.externalEventUrl,
    stringValue(fields.slug),
    stringValue(fields.title),
    stringValue(fields._id),
    stringValue(fields.id),
  ];

  return slugCandidates.some((candidate) => normalizeTourSlug(candidate) === eventSlug);
}

function getEventTicketHref(fields: WixRecordFields) {
  return getValidTicketHref(
    stringValue(fields.ctaUrl) ||
      stringValue(fields.ticketPrimaryUrl) ||
      stringValue(fields.primaryCtaHref) ||
      stringValue(fields.ticketUrl) ||
      stringValue(fields.ticketLink) ||
      stringValue(fields.ticketHref) ||
      stringValue(fields.bookingUrl) ||
      stringValue(fields.externalEventUrl),
  );
}

function scoreTourDateMatch(tourDate: NormalizedTourDate, request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const requestedShow = normalizeLookupValue(searchParams.get("show"));
  const requestedCity = normalizeLookupValue(searchParams.get("city"));
  const requestedDate = normalizeLookupValue(searchParams.get("date"));
  let score = 0;

  if (requestedShow) {
    if (normalizeLookupValue(tourDate.showLabel) !== requestedShow) {
      return -1;
    }

    score += 8;
  }

  if (requestedCity) {
    if (normalizeLookupValue(tourDate.city) !== requestedCity) {
      return -1;
    }

    score += 4;
  }

  if (requestedDate) {
    const dateCandidates = [
      normalizeLookupValue(tourDate.date),
      normalizeLookupValue(tourDate.displayDate),
    ];

    if (!dateCandidates.includes(requestedDate)) {
      return -1;
    }

    score += 4;
  }

  return score;
}

async function findFreshTicketHref(eventSlug: string, request: NextRequest) {
  const eventItems = await queryWixCollection("Events", {
    filter: visibleFilter(),
    limit: 1000,
    cache: "no-store",
  });
  const eventItem = eventItems.find((item) => eventMatchesSlug(item, eventSlug));

  if (!eventItem) {
    return undefined;
  }

  const event = normalizeEvent(eventItem);
  const eventFields = getWixFields(eventItem);
  const eventKeys = buildEventKeySet(event, eventFields);
  const tourDateItems = await queryWixCollection("TourDates", {
    sort: sortAsc("order"),
    limit: 1000,
    cache: "no-store",
  });
  const matchingTourDates = tourDateItems
    .filter((item) => tourDateMatchesEvent(getWixFields(item), eventKeys))
    .map((item) => normalizeTourDate(item))
    .filter((tourDate) => tourDate.isVisible && getValidTicketHref(tourDate.ticketHref))
    .map((tourDate) => ({
      tourDate,
      score: scoreTourDateMatch(tourDate, request),
    }))
    .filter((match) => match.score >= 0)
    .sort((first, second) => second.score - first.score);

  const [bestTourDateMatch] = matchingTourDates;
  const tourDateHref = getValidTicketHref(bestTourDateMatch?.tourDate.ticketHref);

  return tourDateHref ?? getEventTicketHref(eventFields);
}

export async function GET(request: NextRequest) {
  if (!isWixConfigured()) {
    return htmlError("Ticketing is temporarily unavailable.", 503);
  }

  const eventSlug = normalizeTourSlug(request.nextUrl.searchParams.get("event") ?? undefined);

  if (!eventSlug) {
    return htmlError("Missing event information.", 400);
  }

  let ticketHref: string | undefined;

  try {
    ticketHref = await findFreshTicketHref(eventSlug, request);
  } catch {
    return htmlError("Ticketing is temporarily unavailable.", 502);
  }

  if (!ticketHref) {
    return htmlError("Tickets are not available for this event yet.", 404);
  }

  return NextResponse.redirect(ticketHref, {
    status: 302,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
