import { NextResponse } from "next/server";
import { getCollectionId, isWixConfigured } from "@/lib/wix/client";
import type { WixQueryResponse, WixRecordFields } from "@/lib/wix/types";

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

function getResponseItems(body: unknown) {
  if (!isRecord(body)) {
    return [];
  }

  const payload = body as WixQueryResponse;
  return payload.items ?? payload.dataItems ?? [];
}

function getMissingRequiredFields(fields: WixRecordFields) {
  return ["title", "slug"].filter((field) => !fields[field]);
}

function getCollectionArray(body: unknown) {
  if (!isRecord(body)) {
    return [];
  }

  const possibleKeys = ["dataCollections", "collections", "items"];

  for (const key of possibleKeys) {
    const value = body[key];

    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
}

function summarizeCollection(collection: unknown) {
  const fields = getFields(collection);
  const id = fields._id ?? fields.id ?? fields.collectionId ?? fields.dataCollectionId;
  const displayName = fields.displayName ?? fields.name ?? fields.title;
  const collectionType = fields.collectionType ?? fields.type;

  return {
    id,
    displayName,
    collectionType,
  };
}

function getStringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function getEventCollectionCandidates(collections: unknown[]) {
  return collections
    .map(summarizeCollection)
    .filter((collection) => {
      const id = getStringValue(collection.id).toLowerCase();
      const displayName = getStringValue(collection.displayName).toLowerCase();

      return id.includes("event") || displayName.includes("event");
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
    const collections = getCollectionArray(responseBody);
    const collectionSummaries = collections.map(summarizeCollection);
    const eventCollectionCandidates = getEventCollectionCandidates(collections);
    const exactEventsCollection = eventCollectionCandidates.find(
      (collection) => getStringValue(collection.displayName).toLowerCase() === "events",
    );

    return {
      collectionListRequest: {
        url: WIX_DATA_COLLECTIONS_API_URL,
        method: "GET",
      },
      collectionListHttpStatus: response.status,
      collectionListHttpStatusText: response.statusText,
      collectionListResponseBody: responseBody,
      collectionListCount: collections.length,
      collectionSummaries,
      eventCollectionCandidates,
      recommendedWixCollectionEventsId: exactEventsCollection?.id ?? eventCollectionCandidates[0]?.id ?? null,
      collectionListReason: response.ok
        ? "Wix returned accessible data collections. Use the id from the matching Events collection as WIX_COLLECTION_EVENTS_ID."
        : `Wix collection listing returned HTTP ${response.status}. The API key may not have Manage Data Collections permission.`,
    };
  } catch (error) {
    return {
      collectionListRequest: {
        url: WIX_DATA_COLLECTIONS_API_URL,
        method: "GET",
      },
      collectionListHttpStatus: null,
      collectionListHttpStatusText: null,
      collectionListResponseBody: null,
      collectionListCount: 0,
      collectionSummaries: [],
      eventCollectionCandidates: [],
      recommendedWixCollectionEventsId: null,
      collectionListReason: "The Wix collection listing request threw before a response was returned.",
      collectionListError: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function GET(_request: Request, { params }: DebugWixEventRouteContext) {
  const { slug } = await params;
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID ?? process.env.WIX_ACCOUNT_SITE_ID;
  const collectionId = getCollectionId("Events");
  const requestBody = {
    dataCollectionId: collectionId,
    query: {
      filter: {
        slug,
        isVisible: true,
      },
      sort: [],
      paging: {
        limit: 1,
        offset: 0,
      },
    },
  };

  const baseDebugPayload = {
    slug,
    isWixConfigured: isWixConfigured(),
    env: {
      hasWixApiKey: Boolean(apiKey),
      hasWixSiteId: Boolean(process.env.WIX_SITE_ID),
      hasWixAccountSiteId: Boolean(process.env.WIX_ACCOUNT_SITE_ID),
    },
    collectionId,
    wixRequest: {
      url: `${WIX_DATA_API_BASE_URL}/query`,
      body: requestBody,
    },
  };

  if (!apiKey || !siteId) {
    return NextResponse.json({
      ...baseDebugPayload,
      collectionListRequest: {
        url: WIX_DATA_COLLECTIONS_API_URL,
        method: "GET",
      },
      collectionListHttpStatus: null,
      collectionListResponseBody: null,
      collectionListCount: 0,
      collectionSummaries: [],
      eventCollectionCandidates: [],
      recommendedWixCollectionEventsId: null,
      wixHttpStatus: null,
      wixResponseBody: null,
      normalizedItemCount: 0,
      getWixEventBySlugReturnsEvent: false,
      reason: "Wix CMS request was not sent because WIX_API_KEY and site id are required.",
      routeOutcome: "app/tours/[slug]/page.tsx would call notFound() unless local fallback exists.",
    });
  }

  try {
    const collectionsDebug = await fetchCollectionsDebug(apiKey, siteId);
    const response = await fetch(`${WIX_DATA_API_BASE_URL}/query`, {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
        "wix-site-id": siteId,
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });
    const responseText = await response.text();
    const responseBody = parseResponseBody(responseText);
    const items = getResponseItems(responseBody);
    const firstItem = items[0];
    const fields = getFields(firstItem);
    const missingRequiredFields = firstItem ? getMissingRequiredFields(fields) : [];
    const getWixEventBySlugReturnsEvent = items.length > 0;
    const routeWouldConstructEventDetail = getWixEventBySlugReturnsEvent && missingRequiredFields.length === 0;

    return NextResponse.json({
      ...baseDebugPayload,
      ...collectionsDebug,
      wixHttpStatus: response.status,
      wixHttpStatusText: response.statusText,
      wixResponseBody: responseBody,
      normalizedItemCount: items.length,
      getWixEventBySlugReturnsEvent,
      firstItemSummary: firstItem
        ? {
            id: fields._id ?? fields.id,
            title: fields.title,
            slug: fields.slug,
            isVisible: fields.isVisible,
            missingRequiredFields,
          }
        : null,
      reason: getWixEventBySlugReturnsEvent
        ? routeWouldConstructEventDetail
          ? "Wix returned an Events item and it has the required title/slug fields."
          : "Wix returned an Events item, but EventDetailData cannot be constructed because required fields are missing."
        : response.ok
          ? "Wix API returned successfully, but the Events query returned no items for this slug/isVisible filter."
          : `Wix API returned HTTP ${response.status}.`,
      routeOutcome: routeWouldConstructEventDetail
        ? "app/tours/[slug]/page.tsx should render the EventDetailPage."
        : "app/tours/[slug]/page.tsx would call notFound() unless local fallback exists.",
    });
  } catch (error) {
    const collectionsDebug = await fetchCollectionsDebug(apiKey, siteId);

    return NextResponse.json(
      {
        ...baseDebugPayload,
        ...collectionsDebug,
        wixHttpStatus: null,
        wixResponseBody: null,
        normalizedItemCount: 0,
        getWixEventBySlugReturnsEvent: false,
        reason: "The Wix request threw before a response was returned.",
        error: error instanceof Error ? error.message : String(error),
        routeOutcome: "app/tours/[slug]/page.tsx would call notFound() unless local fallback exists.",
      },
      { status: 500 },
    );
  }
}
