import { isWixConfigured, queryWixCollection, sortAsc, visibleFilter } from "@/lib/wix/client";
import { getWixFields, normalizeTestimonial, sortByOrder } from "@/lib/wix/normalizers";
import type { NormalizedTestimonial, WixRecordFields } from "@/lib/wix/types";

type TestimonialFilter = {
  relatedEvent?: string;
  relatedPartner?: string;
};

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
    record.event,
    record.events,
    record.relatedEvent,
    record.relatedEvents,
    record.data,
    record.fieldData,
  ];

  return nestedCandidates.flatMap(getReferenceCandidates);
}

function hasMatchingEventReference(fields: WixRecordFields, eventIds: Set<string>) {
  return [
    fields.event,
    fields.events,
    fields.relatedEvent,
    fields.relatedEvents,
    fields.eventSlug,
    fields.eventId,
  ].some((value) => getReferenceCandidates(value).some((candidate) => eventIds.has(candidate)));
}

function sortByOrderThenReturnOrder<T extends { order: number }>(items: T[]) {
  return [...items]
    .map((item, returnIndex) => ({ item, returnIndex }))
    .sort((first, second) => {
      const orderDifference = first.item.order - second.item.order;

      if (orderDifference !== 0) {
        return orderDifference;
      }

      return first.returnIndex - second.returnIndex;
    })
    .map(({ item }) => item);
}

export async function getTestimonials(filter: TestimonialFilter = {}) {
  if (!isWixConfigured()) {
    return [];
  }

  const items = await queryWixCollection("Testimonials", {
    filter: visibleFilter(filter),
    sort: sortAsc("order"),
  });

  return sortByOrder(items.map(normalizeTestimonial));
}

export async function getTestimonialsByEvent(
  eventIdOrSlug: string,
  alternateEventIds: string[] = [],
): Promise<NormalizedTestimonial[]> {
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

  const items = await queryWixCollection("Testimonials", {
    sort: sortAsc("order"),
    limit: 1000,
  });

  const matchingTestimonials = items
    .filter((item) => {
      const fields = getWixFields(item);
      return hasMatchingEventReference(fields, eventIds);
    })
    .map(normalizeTestimonial)
    .filter((testimonial) => testimonial.isVisible);

  return sortByOrderThenReturnOrder(matchingTestimonials);
}
