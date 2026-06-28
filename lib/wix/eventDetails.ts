import { isWixConfigured, queryWixCollection, sortAsc } from "@/lib/wix/client";
import {
  getWixFields,
  normalizeEventGalleryImage,
  normalizeEventVideo,
  normalizeTourDate,
  sortByOrder,
} from "@/lib/wix/normalizers";
import { getVenues } from "@/lib/wix/venues";
import type { NormalizedTourDate, NormalizedVenue, WixRecordFields } from "@/lib/wix/types";

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
    record.name,
    record.venueName,
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

function sortByOrderThenUploadOrder<T extends { order: number }>(items: T[]) {
  return [...items]
    .map((item, uploadIndex) => ({ item, uploadIndex }))
    .sort((first, second) => {
      const orderDifference = first.item.order - second.item.order;

      if (orderDifference !== 0) {
        return orderDifference;
      }

      return first.uploadIndex - second.uploadIndex;
    })
    .map(({ item }) => item);
}

function normalizeLookupKey(value: string) {
  return value.trim().toLowerCase();
}

function getVenueLookupKeys(venue: NormalizedVenue) {
  return [venue.id, venue.venueName]
    .map((value) => value.trim())
    .filter(Boolean);
}

function buildVenueIndex(venues: NormalizedVenue[]) {
  const venueIndex = new Map<string, NormalizedVenue>();

  for (const venue of venues) {
    if (!venue.isVisible || !venue.venueName.trim()) {
      continue;
    }

    for (const key of getVenueLookupKeys(venue)) {
      venueIndex.set(normalizeLookupKey(key), venue);
    }
  }

  return venueIndex;
}

function findVenueMatch(
  fields: WixRecordFields,
  tourDate: NormalizedTourDate,
  venueIndex: Map<string, NormalizedVenue>,
) {
  const venueCandidates = [
    ...getReferenceCandidates(fields.venue),
    ...getReferenceCandidates(fields.venueId),
    ...getReferenceCandidates(fields.venueRef),
    ...getReferenceCandidates(fields.venueName),
    tourDate.venue,
  ];

  for (const candidate of venueCandidates) {
    const venue = venueIndex.get(normalizeLookupKey(candidate));

    if (venue?.venueName.trim()) {
      return venue;
    }
  }

  return null;
}

function resolveTourDateVenue(
  fields: WixRecordFields,
  tourDate: NormalizedTourDate,
  venueIndex: Map<string, NormalizedVenue>,
): NormalizedTourDate {
  const venue = findVenueMatch(fields, tourDate, venueIndex);

  if (!venue) {
    return tourDate;
  }

  return {
    ...tourDate,
    venue: venue.venueName,
    venueDetails: {
      venueName: venue.venueName,
      city: venue.city,
      country: venue.country,
      address: venue.address,
      website: venue.website,
      mapUrl: venue.mapUrl,
    },
  };
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
  const venueIndex = buildVenueIndex(await getVenues());

  const matchingTourDates = items
    .filter((item) => {
      const fields = getWixFields(item);
      return hasMatchingEventReference(fields, eventIds);
    })
    .map((item) => {
      const fields = getWixFields(item);
      return resolveTourDateVenue(fields, normalizeTourDate(item), venueIndex);
    })
    .filter((tourDate) => tourDate.isVisible);

  return sortTourDatesByOrderThenDate(matchingTourDates);
}

export async function getEventVideos(eventIdOrSlug: string, alternateEventIds: string[] = []) {
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

  const items = await queryWixCollection("EventVideos", {
    sort: sortAsc("order"),
    limit: 1000,
  });

  const matchingVideos = items
    .filter((item) => {
      const fields = getWixFields(item);
      return hasMatchingEventReference(fields, eventIds);
    })
    .map(normalizeEventVideo)
    .filter((video) => video.isVisible);

  return sortByOrder(matchingVideos);
}

export async function getEventGallery(eventIdOrSlug: string, alternateEventIds: string[] = []) {
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

  const items = await queryWixCollection("EventGallery", {
    limit: 1000,
  });

  const matchingImages = items
    .filter((item) => {
      const fields = getWixFields(item);
      return hasMatchingEventReference(fields, eventIds);
    })
    .map(normalizeEventGalleryImage)
    .filter((image) => image.isVisible);

  return sortByOrderThenUploadOrder(matchingImages);
}
