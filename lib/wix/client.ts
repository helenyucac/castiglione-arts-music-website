import type {
  WixCollectionItem,
  WixCollectionName,
  WixQueryOptions,
  WixQueryResponse,
  WixRecordFields,
} from "@/lib/wix/types";

const WIX_DATA_API_BASE_URL =
  process.env.WIX_DATA_API_BASE_URL ?? "https://www.wixapis.com/wix-data/v2/items";

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

export type WixClientConfig = {
  apiKey: string;
  siteId: string;
  baseUrl: string;
};

export function getWixClientConfig(): WixClientConfig {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID ?? process.env.WIX_ACCOUNT_SITE_ID;

  if (!apiKey || !siteId) {
    throw new Error(
      "Wix CMS is not configured. Set WIX_API_KEY and WIX_SITE_ID or WIX_ACCOUNT_SITE_ID.",
    );
  }

  return {
    apiKey,
    siteId,
    baseUrl: WIX_DATA_API_BASE_URL,
  };
}

export function isWixConfigured() {
  return Boolean(process.env.WIX_API_KEY && (process.env.WIX_SITE_ID ?? process.env.WIX_ACCOUNT_SITE_ID));
}

export function getCollectionId(collectionName: WixCollectionName) {
  return process.env[collectionEnvKeys[collectionName]] ?? collectionName;
}

export function visibleFilter(extraFilter: WixRecordFields = {}) {
  return {
    ...extraFilter,
    isVisible: true,
  };
}

export function sortAsc(fieldName: string) {
  return [{ fieldName, order: "ASC" as const }];
}

export function sortDesc(fieldName: string) {
  return [{ fieldName, order: "DESC" as const }];
}

export async function queryWixCollection<TFields extends WixRecordFields = WixRecordFields>(
  collectionName: WixCollectionName,
  options: WixQueryOptions = {},
) {
  const config = getWixClientConfig();
  const collectionId = getCollectionId(collectionName);
  const response = await fetch(`${config.baseUrl}/query`, {
    method: "POST",
    headers: {
      Authorization: config.apiKey,
      "Content-Type": "application/json",
      "wix-site-id": config.siteId,
    },
    body: JSON.stringify({
      dataCollectionId: collectionId,
      query: {
        filter: options.filter ?? {},
        sort: options.sort ?? [],
        paging: {
          limit: options.limit ?? 100,
          offset: options.skip ?? 0,
        },
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Wix query failed for ${collectionName}: ${response.status} ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as WixQueryResponse<TFields>;
  return (payload.items ?? payload.dataItems ?? []) as WixCollectionItem<TFields>[];
}

export async function getFirstWixItem<TFields extends WixRecordFields = WixRecordFields>(
  collectionName: WixCollectionName,
  options: WixQueryOptions = {},
) {
  const [item] = await queryWixCollection<TFields>(collectionName, {
    ...options,
    limit: 1,
  });

  return item ?? null;
}
