import { NextResponse } from "next/server";
import type { WixRecordFields } from "@/lib/wix/types";

type DebugWixEventRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

const WIX_DATA_API_BASE_URL =
  process.env.WIX_DATA_API_BASE_URL ?? "https://www.wixapis.com/wix-data/v2/items";
const WIX_DATA_COLLECTIONS_API_URL = WIX_DATA_API_BASE_URL.replace(/\/items\/?$/, "/collections");

function isRecord(value: unknown): value is WixRecordFields {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getFields(item: unknown): WixRecordFields {
  if (!isRecord(item)) {
    return {};
  }

  return {
    ...item,
    ...(isRecord(item.data) ? item.data : {}),
    ...(isRecord(item.fieldData) ? item.fieldData : {}),
  };
}

function parseResponseBody(text: string) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function getStringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function getFirstStringField(fields: WixRecordFields, fieldNames: string[]) {
  for (const fieldName of fieldNames) {
    const value = fields[fieldName];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return undefined;
}

function looksLikeCollection(collection: unknown) {
  const fields = getFields(collection);
  const hasCollectionIdentifier = Boolean(
    getFirstStringField(fields, ["_id", "id", "collectionId", "dataCollectionId"]) ||
      (getFirstStringField(fields, ["key"]) &&
        (fields.fields || fields.permissions || getFirstStringField(fields, ["collectionType"]))),
  );
  const hasCollectionMetadata = Boolean(
    getFirstStringField(fields, ["displayName", "name", "title", "key", "collectionType"]),
  );

  return hasCollectionIdentifier && hasCollectionMetadata;
}

function collectCollections(value: unknown, collections: unknown[] = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectCollections(item, collections));
    return collections;
  }

  if (!isRecord(value)) {
    return collections;
  }

  if (looksLikeCollection(value)) {
    collections.push(value);
  }

  Object.values(value).forEach((item) => collectCollections(item, collections));
  return collections;
}

function summarizeCollection(collection: unknown) {
  const fields = getFields(collection);
  const id = getFirstStringField(fields, ["id", "_id", "collectionId", "dataCollectionId", "key"]);
  const key = getFirstStringField(fields, ["key"]);
  const displayName = getFirstStringField(fields, ["displayName", "name", "title"]);
  const collectionType = getFirstStringField(fields, ["collectionType", "type"]);

  return {
    id,
    key,
    displayName,
    collectionType,
  };
}

function getCollectionIdentity(collection: ReturnType<typeof summarizeCollection>) {
  return [collection.id, collection.key, collection.displayName, collection.collectionType]
    .map((value) => getStringValue(value))
    .join("|");
}

function uniqueCollectionSummaries(collections: unknown[]) {
  const summaries = collections.map(summarizeCollection);
  const seen = new Set<string>();

  return summaries.filter((summary) => {
    const identity = getCollectionIdentity(summary);

    if (seen.has(identity)) {
      return false;
    }

    seen.add(identity);
    return true;
  });
}

function getEventCollectionCandidates(collections: ReturnType<typeof summarizeCollection>[]) {
  return collections.filter((collection) => {
    const id = getStringValue(collection.id).toLowerCase();
    const key = getStringValue(collection.key).toLowerCase();
    const displayName = getStringValue(collection.displayName).toLowerCase();

    return id.includes("event") || key.includes("event") || displayName.includes("event");
  });
}

async function fetchCollectionsDebug(apiKey: string, siteId: string) {
  try {
    const response = await fetch(WIX_DATA_COLLECTIONS_API_URL, {
      method: "GET",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
        "wix-site-id": siteId,
      },
      cache: "no-store",
    });
    const responseText = await response.text();
    const responseBody = parseResponseBody(responseText);
    const collectionSummaries = uniqueCollectionSummaries(collectCollections(responseBody));
    const eventCollectionCandidates = getEventCollectionCandidates(collectionSummaries);
    const exactEventsCollection = eventCollectionCandidates.find(
      (collection) =>
        getStringValue(collection.displayName).toLowerCase() === "events" ||
        getStringValue(collection.key).toLowerCase() === "events" ||
        getStringValue(collection.id).toLowerCase() === "events",
    );

    return {
      collectionSummaries,
      eventCollectionCandidates,
      recommendedWixCollectionEventsId: exactEventsCollection?.id ?? eventCollectionCandidates[0]?.id ?? null,
    };
  } catch {
    return {
      collectionSummaries: [],
      eventCollectionCandidates: [],
      recommendedWixCollectionEventsId: null,
    };
  }
}

export async function GET(_request: Request, { params }: DebugWixEventRouteContext) {
  await params;
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID ?? process.env.WIX_ACCOUNT_SITE_ID;

  if (!apiKey || !siteId) {
    return NextResponse.json({
      collectionSummaries: [],
      eventCollectionCandidates: [],
      recommendedWixCollectionEventsId: null,
    });
  }

  return NextResponse.json(await fetchCollectionsDebug(apiKey, siteId));
}
