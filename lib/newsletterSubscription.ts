import {
  getResolvedCollectionId,
  getWixClientConfig,
  insertWixCollectionItem,
  queryWixCollection,
} from "@/lib/wix/client";
import type { WixRecordFields } from "@/lib/wix/types";

export type SubscribeResult =
  | { success: true; alreadySubscribed: boolean }
  | { success: false; reason: "invalid-email" | "bot" | "wix-error" };

export const SUBSCRIBE_COLLECTION_NAME = "Subscribe";
export const DEFAULT_SUBSCRIBE_EMAIL_FIELD = "email";
export const DEFAULT_SUBSCRIBE_DATE_FIELD = "subscribedAt";
export const SUBSCRIBE_SOURCE = "website-footer";
const MAX_EMAIL_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const optionalSubscribeFieldKeys = ["status", "source", "isActive", "consent"];

function isRecord(value: unknown): value is WixRecordFields {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeSubscriberEmail(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return String(value).trim().toLowerCase();
}

export function validateSubscriberEmail(email: string) {
  return Boolean(email && email.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(email));
}

export function getSubscribeEmailFieldKey() {
  return process.env.WIX_SUBSCRIBE_EMAIL_FIELD_KEY ?? DEFAULT_SUBSCRIBE_EMAIL_FIELD;
}

export function getSubscribeDateFieldKey() {
  return process.env.WIX_SUBSCRIBE_DATE_FIELD_KEY ?? DEFAULT_SUBSCRIBE_DATE_FIELD;
}

function flattenCollectionFields(value: unknown): WixRecordFields {
  if (!isRecord(value)) {
    return {};
  }

  return {
    ...value,
    ...(isRecord(value.data) ? value.data : {}),
    ...(isRecord(value.fieldData) ? value.fieldData : {}),
  };
}

function getCollectionItems(value: unknown): unknown[] {
  if (!isRecord(value)) {
    return [];
  }

  for (const key of ["dataCollections", "collections", "items"]) {
    const items = value[key];

    if (Array.isArray(items)) {
      return items;
    }
  }

  return [];
}

function getFieldKeysFromCollection(collection: unknown) {
  const fields = flattenCollectionFields(collection);
  const keys = new Set<string>();
  const candidateFieldLists = [
    fields.fields,
    fields.displayFields,
    fields.collectionFields,
    fields.schema,
  ];

  for (const candidate of candidateFieldLists) {
    if (Array.isArray(candidate)) {
      for (const field of candidate) {
        const fieldRecord = flattenCollectionFields(field);

        for (const key of [fieldRecord.key, fieldRecord.fieldKey, fieldRecord.id, fieldRecord.name]) {
          if (typeof key === "string" && key) {
            keys.add(key);
          }
        }
      }
    } else if (isRecord(candidate)) {
      for (const [key, field] of Object.entries(candidate)) {
        if (key) {
          keys.add(key);
        }

        const fieldRecord = flattenCollectionFields(field);

        for (const fieldKey of [
          fieldRecord.key,
          fieldRecord.fieldKey,
          fieldRecord.id,
          fieldRecord.name,
        ]) {
          if (typeof fieldKey === "string" && fieldKey) {
            keys.add(fieldKey);
          }
        }
      }
    }
  }

  return keys;
}

async function getSubscribeCollectionFieldKeys() {
  try {
    const config = getWixClientConfig();
    const collectionId = await getResolvedCollectionId(SUBSCRIBE_COLLECTION_NAME);
    const collectionsUrl = config.baseUrl.replace(/\/items\/?$/, "/collections");
    const response = await fetch(collectionsUrl, {
      method: "GET",
      headers: {
        Authorization: config.apiKey,
        "Content-Type": "application/json",
        "wix-site-id": config.siteId,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return new Set<string>();
    }

    const responseText = await response.text();
    const payload = responseText ? (JSON.parse(responseText) as unknown) : {};

    for (const collection of getCollectionItems(payload)) {
      const fields = flattenCollectionFields(collection);
      const identifiers = [
        fields._id,
        fields.id,
        fields.collectionId,
        fields.dataCollectionId,
        fields.displayName,
        fields.name,
        fields.title,
        fields.key,
      ];

      if (identifiers.some((identifier) => identifier === collectionId || identifier === "Subscribe")) {
        return getFieldKeysFromCollection(collection);
      }
    }
  } catch {
    return new Set<string>();
  }

  return new Set<string>();
}

function buildSubscribeRecord(
  email: string,
  emailFieldKey: string,
  dateFieldKey: string,
  supportedFieldKeys: Set<string>,
  subscribedAt = new Date(),
): WixRecordFields {
  const data: WixRecordFields = {
    [emailFieldKey]: email,
    [dateFieldKey]: subscribedAt.toISOString(),
  };

  if (supportedFieldKeys.size === 0) {
    return data;
  }

  const optionalValues: WixRecordFields = {
    status: "subscribed",
    source: SUBSCRIBE_SOURCE,
    isActive: true,
    consent: true,
  };

  for (const key of optionalSubscribeFieldKeys) {
    if (supportedFieldKeys.has(key)) {
      data[key] = optionalValues[key];
    }
  }

  return data;
}

export async function subscribeEmailToWix(emailValue: unknown, honeypotValue?: unknown) {
  const honeypot = typeof honeypotValue === "string" ? honeypotValue.trim() : "";

  if (honeypot) {
    return { success: false, reason: "bot" } satisfies SubscribeResult;
  }

  const email = normalizeSubscriberEmail(emailValue);

  if (!validateSubscriberEmail(email)) {
    return { success: false, reason: "invalid-email" } satisfies SubscribeResult;
  }

  const emailFieldKey = getSubscribeEmailFieldKey();
  const dateFieldKey = getSubscribeDateFieldKey();

  try {
    const supportedFieldKeys = await getSubscribeCollectionFieldKeys();
    const existingItems = await queryWixCollection(SUBSCRIBE_COLLECTION_NAME, {
      filter: {
        [emailFieldKey]: email,
      },
      limit: 1,
    });

    if (existingItems.length > 0) {
      return { success: true, alreadySubscribed: true } satisfies SubscribeResult;
    }

    const data = buildSubscribeRecord(email, emailFieldKey, dateFieldKey, supportedFieldKeys);

    await insertWixCollectionItem(SUBSCRIBE_COLLECTION_NAME, data);

    return { success: true, alreadySubscribed: false } satisfies SubscribeResult;
  } catch (error) {
    let collectionId = "unavailable";

    try {
      collectionId = await getResolvedCollectionId(SUBSCRIBE_COLLECTION_NAME);
    } catch {
      collectionId = "unavailable";
    }

    console.error("Footer newsletter subscription failed", {
      collectionId,
      emailFieldKey,
      dateFieldKey,
      message: error instanceof Error ? error.message : "Unknown Wix error",
    });

    return { success: false, reason: "wix-error" } satisfies SubscribeResult;
  }
}
