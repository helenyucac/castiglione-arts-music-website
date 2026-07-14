import type {
  WixCollectionItem,
  WixCollectionName,
  WixQueryOptions,
  WixQueryResponse,
  WixRecordFields,
} from "@/lib/wix/types";

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
  PartnershipPage: "WIX_COLLECTION_PARTNERSHIP_PAGE_ID",
  Partners: "WIX_COLLECTION_PARTNERS_ID",
  Venues: "WIX_COLLECTION_VENUES_ID",
  Testimonials: "WIX_COLLECTION_TESTIMONIALS_ID",
  Subscribe: "WIX_COLLECTION_SUBSCRIBE_ID",
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
  if (collectionName === "Subscribe") {
    return (
      process.env.WIX_SUBSCRIBE_COLLECTION_ID ??
      process.env.WIX_COLLECTION_SUBSCRIBE_ID ??
      collectionName
    );
  }

  return process.env[collectionEnvKeys[collectionName]] ?? collectionName;
}

function isRecord(value: unknown): value is WixRecordFields {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
    (typeof fields._id === "string" && fields._id) ||
    (typeof fields.id === "string" && fields.id) ||
    (typeof fields.collectionId === "string" && fields.collectionId) ||
    (typeof fields.dataCollectionId === "string" && fields.dataCollectionId) ||
    undefined
  );
}

let collectionIdLookupPromise: Promise<Map<string, string>> | null = null;

async function getCollectionIdLookup(config: WixClientConfig) {
  if (!collectionIdLookupPromise) {
    collectionIdLookupPromise = fetch(WIX_DATA_COLLECTIONS_API_URL, {
      method: "GET",
      headers: {
        Authorization: config.apiKey,
        "Content-Type": "application/json",
        "wix-site-id": config.siteId,
      },
      cache: "no-store",
    })
      .then(async (response) => {
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
      })
      .catch(() => new Map<string, string>());
  }

  return collectionIdLookupPromise;
}

async function resolveCollectionId(collectionName: WixCollectionName, config: WixClientConfig) {
  if (collectionName === "Subscribe") {
    const configuredSubscribeCollectionId =
      process.env.WIX_SUBSCRIBE_COLLECTION_ID ?? process.env.WIX_COLLECTION_SUBSCRIBE_ID;

    if (configuredSubscribeCollectionId) {
      return configuredSubscribeCollectionId;
    }

    const lookup = await getCollectionIdLookup(config);
    const discoveredSubscribeCollectionId = [
      "Subscribe",
      "Subscribers",
      "NewsletterSubscribers",
      "Newsletter",
      "MailingList",
    ]
      .map((candidate) => lookup.get(normalizeCollectionLookupKey(candidate)))
      .find(Boolean);

    if (discoveredSubscribeCollectionId) {
      return discoveredSubscribeCollectionId;
    }

    throw new Error(
      "Wix Subscribe collection ID is not configured and could not be discovered.",
    );
  }

  const configuredCollectionId = process.env[collectionEnvKeys[collectionName]];

  if (configuredCollectionId) {
    return configuredCollectionId;
  }

  const lookup = await getCollectionIdLookup(config);
  return lookup.get(normalizeCollectionLookupKey(collectionName)) ?? collectionName;
}

export async function getResolvedCollectionId(collectionName: WixCollectionName) {
  const config = getWixClientConfig();
  return resolveCollectionId(collectionName, config);
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
  const collectionId = await resolveCollectionId(collectionName, config);
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

  const response = await fetch(`${config.baseUrl}/query`, {
    method: "POST",
    headers: {
      Authorization: config.apiKey,
      "Content-Type": "application/json",
      "wix-site-id": config.siteId,
    },
    body: JSON.stringify(requestBody),
    cache: "no-store",
  });
  const responseBody = await response.text();

  if (!response.ok) {
    throw new Error(
      `Wix query failed for ${collectionName}: ${response.status} ${response.statusText}`,
    );
  }

  const payload = (responseBody ? JSON.parse(responseBody) : {}) as WixQueryResponse<TFields>;
  return (payload.items ?? payload.dataItems ?? []) as WixCollectionItem<TFields>[];
}

export async function insertWixCollectionItem<TFields extends WixRecordFields = WixRecordFields>(
  collectionName: WixCollectionName,
  data: TFields,
) {
  const config = getWixClientConfig();
  const collectionId = await resolveCollectionId(collectionName, config);
  const requestBody = {
    dataCollectionId: collectionId,
    dataItem: {
      data,
    },
  };

  const response = await fetch(config.baseUrl, {
    method: "POST",
    headers: {
      Authorization: config.apiKey,
      "Content-Type": "application/json",
      "wix-site-id": config.siteId,
    },
    body: JSON.stringify(requestBody),
    cache: "no-store",
  });
  const responseBody = await response.text();

  if (!response.ok) {
    throw new Error(
      `Wix insert failed for ${collectionName}: ${response.status} ${response.statusText}${
        responseBody ? ` ${responseBody.slice(0, 1000)}` : ""
      }`,
    );
  }

  const payload = (responseBody ? JSON.parse(responseBody) : {}) as {
    item?: WixCollectionItem<TFields>;
    dataItem?: WixCollectionItem<TFields>;
  };

  return (payload.item ?? payload.dataItem ?? null) as WixCollectionItem<TFields> | null;
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
