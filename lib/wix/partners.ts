import { isWixConfigured, queryWixCollection, sortAsc, visibleFilter } from "@/lib/wix/client";
import { getWixFields, normalizePartner, sortByOrder } from "@/lib/wix/normalizers";
import type { WixRecordFields } from "@/lib/wix/types";

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
    record.events,
    record.relatedEvent,
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

export async function getPartners() {
  const items = await queryWixCollection("Partners", {
    filter: visibleFilter(),
    sort: sortAsc("order"),
  });

  return sortByOrder(items.map(normalizePartner));
}

export async function getPartnersByEvent(
  eventIdOrSlug: string,
  alternateEventIds: string[] = [],
) {
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

  const items = await queryWixCollection("Partners", {
    sort: sortAsc("order"),
    limit: 1000,
  });

  const matchingPartners = items
    .filter((item) => {
      const fields = getWixFields(item);
      return hasMatchingEventReference(fields, eventIds);
    })
    .map(normalizePartner)
    .filter((partner) => partner.isVisible);

  return sortByOrderThenReturnOrder(matchingPartners);
}
