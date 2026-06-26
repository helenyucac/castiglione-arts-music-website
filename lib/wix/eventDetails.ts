import { isWixConfigured, queryWixCollection, sortAsc, visibleFilter } from "@/lib/wix/client";
import {
  getWixFields,
  normalizeEventGalleryImage,
  normalizeEventVideo,
  normalizeTourDate,
  sortByOrder,
} from "@/lib/wix/normalizers";
import type { NormalizedTourDate, WixRecordFields } from "@/lib/wix/types";

const tourDateMonthIndexes: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

function getTourDateTimestamp(date: string) {
  const match = date.match(
    /^(\d{1,2})\s+([A-Z]{3})\s+(\d{4})(?:,\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?)?/i,
  );

  if (!match) {
    const timestamp = Date.parse(date);
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  const [, day, month, year, hourRaw, minuteRaw, meridiemRaw] = match;
  const monthIndex = tourDateMonthIndexes[month.toUpperCase()] ?? 0;
  let hour = hourRaw ? Number(hourRaw) : 0;
  const minute = minuteRaw ? Number(minuteRaw) : 0;
  const meridiem = meridiemRaw?.toUpperCase();

  if (meridiem === "PM" && hour < 12) {
    hour += 12;
  }

  if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }

  return new Date(Number(year), monthIndex, Number(day), hour, minute).getTime();
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

    const referenceId = candidate.split("/").pop();
    return referenceId && referenceId !== candidate ? [candidate, referenceId] : [candidate];
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const record = value as WixRecordFields;
  const nestedCandidates = [
    record._id,
    record.id,
    record.slug,
    record.title,
    record.event,
    record.data,
    record.fieldData,
  ];

  return nestedCandidates.flatMap(getReferenceCandidates);
}

function hasMatchingEventReference(fields: WixRecordFields, eventIds: Set<string>) {
  return getReferenceCandidates(fields.event).some((candidate) => eventIds.has(candidate));
}

function sortTourDatesByOrderThenDate(tourDates: NormalizedTourDate[]) {
  return [...tourDates].sort((first, second) => {
    const orderDifference = first.order - second.order;

    if (orderDifference !== 0) {
      return orderDifference;
    }

    return getTourDateTimestamp(first.date) - getTourDateTimestamp(second.date);
  });
}

export async function getTourDates(eventIdOrSlug: string, alternateEventIds: string[] = []) {
  if (!isWixConfigured()) {
    return [];
  }

  const eventIds = new Set(
    [eventIdOrSlug, ...alternateEventIds]
      .map((candidate) => candidate.trim())
      .filter(Boolean),
  );

  if (eventIds.size === 0) {
    return [];
  }

  const items = await queryWixCollection("TourDates", {
    sort: sortAsc("order"),
    limit: 1000,
  });

  const matchingTourDates = items
    .filter((item) => {
      const fields = getWixFields(item);
      return hasMatchingEventReference(fields, eventIds);
    })
    .map(normalizeTourDate)
    .filter((tourDate) => tourDate.isVisible);

  return sortTourDatesByOrderThenDate(matchingTourDates);
}

export async function getEventVideos(eventIdOrSlug: string) {
  const items = await queryWixCollection("EventVideos", {
    filter: visibleFilter({ event: eventIdOrSlug }),
    sort: sortAsc("order"),
  });

  return sortByOrder(items.map(normalizeEventVideo));
}

export async function getEventGallery(eventIdOrSlug: string) {
  const items = await queryWixCollection("EventGallery", {
    filter: visibleFilter({ event: eventIdOrSlug }),
    sort: sortAsc("order"),
  });

  return sortByOrder(items.map(normalizeEventGalleryImage));
}
