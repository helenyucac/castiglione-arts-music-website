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
      wixHttpStatus: null,
      wixResponseBody: null,
      normalizedItemCount: 0,
      getWixEventBySlugReturnsEvent: false,
      reason: "Wix CMS request was not sent because WIX_API_KEY and site id are required.",
      routeOutcome: "app/tours/[slug]/page.tsx would call notFound() unless local fallback exists.",
    });
  }

  try {
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
    return NextResponse.json(
      {
        ...baseDebugPayload,
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
