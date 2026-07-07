import { NextResponse, type NextRequest } from "next/server";
import {
  getWixFields,
  normalizeEventGalleryImages,
  normalizeEventVideo,
} from "@/lib/wix/normalizers";
import { getResolvedEventDetailBySlug } from "@/lib/wix/eventDetailContent";
import type {
  WixCollectionItem,
  WixCollectionName,
  WixQueryOptions,
  WixQueryResponse,
  WixRecordFields,
} from "@/lib/wix/types";

export const dynamic = "force-dynamic";

const WIX_DATA_API_BASE_URL =
  process.env.WIX_DATA_API_BASE_URL ?? "https://www.wixapis.com/wix-data/v2/items";
const WIX_DATA_COLLECTIONS_API_URL = WIX_DATA_API_BASE_URL.replace(/\/items\/?$/, "/collections");

const collectionEnvKeys: Record<WixCollectionName, string> = {
  SiteSettings: "WIX_COLLECTION_SITE_SETTINGS_ID",
  DesignSettings: "WIX_COLLECTION_DESIGN_SETTINGS_ID",
  Programs: "WIX_COLLECTION_PROGRAMS_ID",
  Events: "WIX_COLLECTION_EVENTS_ID",
  TourDates: "WIX_COLLECTION_TOUR_DATES_ID",
  EventVideos: "WIX_COLLECTION_EVENT_VIDEOS_ID",
  EventGallery: "WIX_COLLECTION_EVENT_GALLERY_ID",
  SocialLinks: "WIX_COLLECTION_SOCIAL_LINKS_ID",
  NavigationLinks: "WIX_COLLECTION_NAVIGATION_LINKS_ID",
  Partners: "WIX_COLLECTION_PARTNERS_ID",
  Venues: "WIX_COLLECTION_VENUES_ID",
  Testimonials: "WIX_COLLECTION_TESTIMONIALS_ID",
};

type WixDebugConfig = {
  apiKey: string;
  siteId: string;
};

function isRecord(value: unknown): value is WixRecordFields {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeCollectionLookupKey(value: unknown) {
  return typeof value === "string" ? value.toLowerCase().replace(/[^a-z0-9]/g, "") : "";
}

function getCollectionArray(value: unknown): unknown[] {
  if (!isRecord(value)) {
    return [];
  }

  for (const key of ["dataCollections", "collections", "items"]) {
    const collectionItems = value[key];

    if (Array.isArray(collectionItems)) {
      return collectionItems;
    }
  }

  return [];
}

function getCollectionFields(value: unknown) {
  if (!isRecord(value)) {
    return {};
  }

  return {
    ...value,
    ...(isRecord(value.data) ? value.data : {}),
    ...(isRecord(value.fieldData) ? value.fieldData : {}),
  };
}

function getDiscoveredCollectionId(value: unknown) {
  const fields = getCollectionFields(value);

  return (
    optionalString(fields._id) ??
    optionalString(fields.id) ??
    optionalString(fields.collectionId) ??
    optionalString(fields.dataCollectionId)
  );
}

async function getCollectionIdLookup(config: WixDebugConfig) {
  const response = await fetch(WIX_DATA_COLLECTIONS_API_URL, {
    method: "GET",
    headers: {
      Authorization: config.apiKey,
      "Content-Type": "application/json",
      "wix-site-id": config.siteId,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return new Map<string, string>();
  }

  const responseText = await response.text();
  const payload = responseText ? (JSON.parse(responseText) as unknown) : {};
  const lookup = new Map<string, string>();

  for (const collection of getCollectionArray(payload)) {
    const fields = getCollectionFields(collection);
    const collectionId = getDiscoveredCollectionId(collection);

    if (!collectionId) {
      continue;
    }

    for (const key of [
      fields._id,
      fields.id,
      fields.collectionId,
      fields.dataCollectionId,
      fields.displayName,
      fields.name,
      fields.title,
      fields.key,
    ]) {
      const lookupKey = normalizeCollectionLookupKey(key);

      if (lookupKey) {
        lookup.set(lookupKey, collectionId);
      }
    }
  }

  return lookup;
}

async function resolveCollectionId(
  collectionName: WixCollectionName,
  config: WixDebugConfig,
  lookup: Map<string, string>,
) {
  const configuredCollectionId = process.env[collectionEnvKeys[collectionName]];

  if (configuredCollectionId) {
    return configuredCollectionId;
  }

  return lookup.get(normalizeCollectionLookupKey(collectionName)) ?? collectionName;
}

async function queryRawCollection(
  collectionName: WixCollectionName,
  collectionId: string,
  config: WixDebugConfig,
  options: WixQueryOptions = {},
) {
  const requestBody = {
    dataCollectionId: collectionId,
    query: {
      filter: options.filter ?? {},
      sort: options.sort ?? [],
      paging: {
        limit: options.limit ?? 100,
        offset: options.skip ?? 0,
      },
    },
  };

  const response = await fetch(`${WIX_DATA_API_BASE_URL}/query`, {
    method: "POST",
    headers: {
      Authorization: config.apiKey,
      "Content-Type": "application/json",
      "wix-site-id": config.siteId,
    },
    body: JSON.stringify(requestBody),
    cache: "no-store",
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Wix query failed for ${collectionName}: ${response.status} ${response.statusText} ${responseText}`,
    );
  }

  const payload = (responseText ? JSON.parse(responseText) : {}) as WixQueryResponse;
  return (payload.items ?? payload.dataItems ?? []) as WixCollectionItem[];
}

function getWixItemId(item: WixCollectionItem) {
  const fields = getWixFields(item);

  return (
    optionalString(item._id) ??
    optionalString(item.id) ??
    optionalString(fields._id) ??
    optionalString(fields.id)
  );
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

  if (!isRecord(value)) {
    return [];
  }

  return [
    value._id,
    value.id,
    value.slug,
    value.title,
    value.name,
    value.event,
    value.data,
    value.fieldData,
  ].flatMap(getReferenceCandidates);
}

function hasMatchingEventReference(fields: WixRecordFields, eventIds: Set<string>) {
  return getReferenceCandidates(fields.event).some((candidate) => eventIds.has(candidate));
}

function rawShape(value: unknown, depth = 0): unknown {
  if (value === null || value === undefined) {
    return { type: value === null ? "null" : "undefined" };
  }

  if (typeof value === "string") {
    return {
      type: "string",
      length: value.length,
      value: value.length > 180 ? `${value.slice(0, 180)}...` : value,
    };
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return { type: typeof value, value };
  }

  if (Array.isArray(value)) {
    return {
      type: "array",
      length: value.length,
      sample: depth < 2 ? value.slice(0, 3).map((item) => rawShape(item, depth + 1)) : undefined,
    };
  }

  if (isRecord(value)) {
    return {
      type: "object",
      keys: Object.keys(value),
      id: optionalString(value._id) ?? optionalString(value.id),
      slug: optionalString(value.slug),
      url:
        optionalString(value.url) ??
        optionalString(value.src) ??
        optionalString(value.fileUrl) ??
        optionalString(value.videoUrl),
      nested:
        depth < 2
          ? {
              data: value.data ? rawShape(value.data, depth + 1) : undefined,
              fieldData: value.fieldData ? rawShape(value.fieldData, depth + 1) : undefined,
            }
          : undefined,
    };
  }

  return { type: typeof value };
}

function summarizeVideoRow(item: WixCollectionItem) {
  const fields = getWixFields(item);
  const normalizedVideo = normalizeEventVideo(item);

  return {
    itemId: getWixItemId(item),
    eventRawValue: rawShape(fields.event),
    videoAssetRawShapeType: rawShape(fields.videoAsset),
    videoFile: fields.videoFile ?? null,
    videoUrl: fields.videoUrl ?? null,
    normalizedVideoSrc: normalizedVideo.src ?? normalizedVideo.videoUrl ?? null,
    posterAssetRawShapeType: rawShape(fields.posterAsset),
    posterImage: fields.posterImage ?? null,
    normalizedPosterSrc: normalizedVideo.posterImage ?? null,
    isVisible: normalizedVideo.isVisible,
  };
}

function summarizeGalleryRow(item: WixCollectionItem) {
  const fields = getWixFields(item);
  const normalizedImages = normalizeEventGalleryImages(item);

  return {
    itemId: getWixItemId(item),
    eventRawValue: rawShape(fields.event),
    galleryAssetRawShapeType: rawShape(fields.galleryAsset),
    image: fields.image ?? null,
    imageUrl: fields.imageUrl ?? null,
    normalizedImageSrcArray: normalizedImages.map((image) => image.src),
    isVisible:
      normalizedImages.length > 0
        ? normalizedImages.some((image) => image.isVisible)
        : fields.isVisible,
  };
}

function summarizeFinalEventDetail(event: Awaited<ReturnType<typeof getResolvedEventDetailBySlug>>) {
  if (!event) {
    return null;
  }

  const galleryImages = event.galleryImages ?? [];

  return {
    slug: event.slug,
    title: event.title,
    trailerEyebrow: event.trailerEyebrow ?? null,
    trailerVideoSrc: event.trailerVideoSrc ?? null,
    trailerPosterSrc: event.trailerPosterSrc ?? null,
    galleryImages,
    galleryImagesLength: galleryImages.length,
    wouldRenderTrailer: Boolean(event.trailerVideoSrc),
    wouldRenderGallery: galleryImages.length > 0,
    hasTourDates: event.tourDates.length > 0,
    tourDatesLength: event.tourDates.length,
  };
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim();
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID ?? process.env.WIX_ACCOUNT_SITE_ID;

  if (!slug) {
    return NextResponse.json({ error: "Missing required ?slug=..." }, { status: 400 });
  }

  if (!apiKey || !siteId) {
    return NextResponse.json(
      {
        error: "Wix CMS is not configured.",
        hasWixApiKey: Boolean(apiKey),
        hasWixSiteId: Boolean(siteId),
      },
      { status: 500 },
    );
  }

  const config = { apiKey, siteId };
  const lookup = await getCollectionIdLookup(config);
  const collectionIds = {
    Events: await resolveCollectionId("Events", config, lookup),
    TourDates: await resolveCollectionId("TourDates", config, lookup),
    EventVideos: await resolveCollectionId("EventVideos", config, lookup),
    EventGallery: await resolveCollectionId("EventGallery", config, lookup),
  };

  const events = await queryRawCollection("Events", collectionIds.Events, config, {
    filter: { slug, isVisible: true },
    limit: 1,
  });
  const event = events[0] ?? null;
  const eventFields = event ? getWixFields(event) : {};
  const eventId = event ? getWixItemId(event) : undefined;
  const eventIds = new Set([slug, eventId].filter((value): value is string => Boolean(value)));

  const rawVideos = await queryRawCollection("EventVideos", collectionIds.EventVideos, config, {
    limit: 1000,
  });
  const rawGallery = await queryRawCollection("EventGallery", collectionIds.EventGallery, config, {
    limit: 1000,
  });
  const matchedVideos = rawVideos.filter((item) =>
    hasMatchingEventReference(getWixFields(item), eventIds),
  );
  const matchedGallery = rawGallery.filter((item) =>
    hasMatchingEventReference(getWixFields(item), eventIds),
  );
  const finalEventDetailData = await getResolvedEventDetailBySlug(slug);

  return NextResponse.json({
    eventResolved: event
      ? {
          slug: optionalString(eventFields.slug) ?? slug,
          wixEventId: eventId ?? null,
          title: optionalString(eventFields.title) ?? null,
        }
      : null,
    collectionIdsActuallyUsed: collectionIds,
    rawQueryCounts: {
      EventVideos: rawVideos.length,
      EventGallery: rawGallery.length,
    },
    matchedRows: {
      EventVideos: matchedVideos.map(summarizeVideoRow),
      EventGallery: matchedGallery.map(summarizeGalleryRow),
    },
    finalEventDetailData: summarizeFinalEventDetail(finalEventDetailData),
  });
}
