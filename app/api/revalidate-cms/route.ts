import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { normalizeTourSlug } from "@/lib/tourSlug";
import { getResolvedCollectionId, queryWixCollection } from "@/lib/wix/client";
import { getWixFields } from "@/lib/wix/normalizers";
import type { WixCollectionItem, WixCollectionName } from "@/lib/wix/types";

export const dynamic = "force-dynamic";

const MAX_REVALIDATE_PAYLOAD_LENGTH = 4096;
const DEFAULT_CMS_TAGS = ["wix-cms"];
const EVENT_CMS_TAGS = ["wix-events", "wix-tourdates"];
const DEFAULT_CMS_PATHS = [
  "/",
  "/about",
  "/tours",
  "/partnerships",
  "/contact",
  "/programs/concerts",
  "/programs/exhibitions",
  "/programs/music-festival",
  "/register-interest",
  "/what-show-next",
  "/whatshownext",
];

type RevalidatePayload = {
  data?: unknown;
  dataCollectionId?: unknown;
  id?: unknown;
  itemId?: unknown;
  secret?: unknown;
  path?: unknown;
  paths?: unknown;
  event?: unknown;
  eventSlug?: unknown;
  slug?: unknown;
  tags?: unknown;
};

type WixAutomationItemReference = {
  collectionId?: string;
  itemId?: string;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValues(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(stringValues);
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function candidateStringValues(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(candidateStringValues);
  }

  if (typeof value === "string") {
    return stringValues(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return [String(value)];
  }

  if (!isRecord(value)) {
    return [];
  }

  return [
    value.slug,
    value.eventSlug,
    value.event,
    value.title,
    value.name,
    value.label,
    value._id,
    value.id,
    value.data,
    value.fieldData,
  ].flatMap(candidateStringValues);
}

function firstCandidateString(value: unknown) {
  return candidateStringValues(value)[0];
}

function normalizeLookupKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizePath(value: unknown) {
  const [rawValue] = stringValues(value);

  if (!rawValue) {
    return undefined;
  }

  let pathname = rawValue;

  try {
    pathname = new URL(rawValue, "https://www.castiglione.com.au").pathname;
  } catch {
    return undefined;
  }

  if (!pathname.startsWith("/") || pathname.includes("..") || pathname.startsWith("//")) {
    return undefined;
  }

  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}

function normalizeTag(value: string) {
  const tag = value.trim();
  return /^[a-z0-9:_-]{1,128}$/i.test(tag) ? tag : undefined;
}

function collectRequestTags(
  payload: RevalidatePayload,
  searchParams: URLSearchParams,
  eventSlug?: string,
) {
  return Array.from(
    new Set([
      ...(eventSlug ? EVENT_CMS_TAGS : DEFAULT_CMS_TAGS),
      ...stringValues(payload.tags).flatMap((tag) => normalizeTag(tag) ?? []),
      ...searchParams.getAll("tag").flatMap((tag) => stringValues(tag)),
      ...searchParams.getAll("tags").flatMap((tag) => stringValues(tag)),
    ]),
  ).flatMap((tag) => normalizeTag(tag) ?? []);
}

function collectExplicitEventSlug(payload: RevalidatePayload, searchParams: URLSearchParams) {
  return normalizeTourSlug(
    stringValues(payload.eventSlug)[0] ??
      stringValues(payload.event)[0] ??
      stringValues(payload.slug)[0] ??
      searchParams.get("eventSlug") ??
      searchParams.get("event") ??
      searchParams.get("slug") ??
      undefined,
  );
}

function getWixAutomationItemReference(payload: RevalidatePayload): WixAutomationItemReference {
  const wixPayload = (isRecord(payload.data) ? payload.data : payload) as Record<string, unknown>;

  return {
    collectionId:
      firstCandidateString(wixPayload["dataCollectionId"]) ??
      firstCandidateString(wixPayload["collectionId"]) ??
      firstCandidateString(wixPayload["collectionName"]) ??
      firstCandidateString(payload.dataCollectionId),
    itemId:
      firstCandidateString(wixPayload["id"]) ??
      firstCandidateString(wixPayload["_id"]) ??
      firstCandidateString(wixPayload["itemId"]) ??
      firstCandidateString(wixPayload["dataItemId"]) ??
      firstCandidateString(payload.id) ??
      firstCandidateString(payload.itemId),
  };
}

async function matchesWixCollection(
  collectionId: string | undefined,
  collectionName: WixCollectionName,
) {
  if (!collectionId) {
    return true;
  }

  const normalizedCollectionId = normalizeLookupKey(collectionId);

  if (normalizedCollectionId === normalizeLookupKey(collectionName)) {
    return true;
  }

  try {
    const resolvedCollectionId = await getResolvedCollectionId(collectionName);
    return normalizedCollectionId === normalizeLookupKey(resolvedCollectionId);
  } catch {
    return false;
  }
}

function isWixItemMatch(item: WixCollectionItem, itemId: string) {
  const fields = getWixFields(item);
  return [item._id, item.id, fields._id, fields.id].some((value) => firstCandidateString(value) === itemId);
}

async function findWixItemById(collectionName: WixCollectionName, itemId: string) {
  const items = await queryWixCollection(collectionName, {
    cache: "no-store",
    limit: 1000,
  });

  return items.find((item) => isWixItemMatch(item, itemId));
}

function getWixCmsEventSlug(collectionName: WixCollectionName, item: WixCollectionItem) {
  const fields = getWixFields(item);

  if (collectionName === "Events") {
    return normalizeTourSlug(firstCandidateString(fields.slug));
  }

  if (collectionName === "TourDates") {
    return normalizeTourSlug(
      firstCandidateString(fields.event) ??
        firstCandidateString(fields.eventSlug) ??
        firstCandidateString(fields.eventId),
    );
  }

  return undefined;
}

async function collectWixAutomationEventSlug(payload: RevalidatePayload) {
  const { collectionId, itemId } = getWixAutomationItemReference(payload);

  if (!itemId) {
    return undefined;
  }

  const candidateCollections: WixCollectionName[] = [];

  for (const collectionName of ["Events", "TourDates"] as const) {
    if (await matchesWixCollection(collectionId, collectionName)) {
      candidateCollections.push(collectionName);
    }
  }

  const collectionsToCheck =
    candidateCollections.length > 0 ? candidateCollections : (["Events", "TourDates"] as const);

  for (const collectionName of collectionsToCheck) {
    try {
      const item = await findWixItemById(collectionName, itemId);
      const eventSlug = item ? getWixCmsEventSlug(collectionName, item) : undefined;

      if (eventSlug) {
        return eventSlug;
      }
    } catch {
      continue;
    }
  }

  return undefined;
}

async function collectEventSlug(payload: RevalidatePayload, searchParams: URLSearchParams) {
  return collectExplicitEventSlug(payload, searchParams) ?? (await collectWixAutomationEventSlug(payload));
}

function collectRequestPaths(
  payload: RevalidatePayload,
  searchParams: URLSearchParams,
  eventSlug?: string,
) {
  const explicitPaths = [
    ...stringValues(payload.path),
    ...stringValues(payload.paths),
    ...searchParams.getAll("path").flatMap((path) => stringValues(path)),
    ...searchParams.getAll("paths").flatMap((path) => stringValues(path)),
  ].flatMap((path) => normalizePath(path) ?? []);

  const paths = new Set<string>();

  if (eventSlug) {
    paths.add("/");
    paths.add("/tours");
    paths.add(`/tours/${eventSlug}`);
    paths.add("/register-interest");
  }

  for (const path of explicitPaths) {
    paths.add(path);
  }

  if (paths.size === 0) {
    for (const path of DEFAULT_CMS_PATHS) {
      paths.add(path);
    }
  }

  return Array.from(paths);
}

async function getJsonPayload(request: NextRequest): Promise<RevalidatePayload> {
  if (request.method !== "POST") {
    return {};
  }

  const bodyText = await request.text();

  if (!bodyText) {
    return {};
  }

  if (bodyText.length > MAX_REVALIDATE_PAYLOAD_LENGTH) {
    throw new Error("Payload is too large.");
  }

  const parsedPayload = JSON.parse(bodyText) as unknown;
  return isRecord(parsedPayload) ? parsedPayload : {};
}

async function handleRevalidate(request: NextRequest) {
  const expectedSecret = process.env.CMS_REVALIDATE_SECRET;

  if (!expectedSecret) {
    return jsonError("CMS revalidation is not configured.", 503);
  }

  let payload: RevalidatePayload;

  try {
    payload = await getJsonPayload(request);
  } catch {
    return jsonError("Malformed request body.", 400);
  }

  const searchParams = request.nextUrl.searchParams;
  const providedSecret =
    stringValues(payload.secret)[0] ??
    searchParams.get("secret") ??
    request.headers.get("x-cms-revalidate-secret");

  if (providedSecret !== expectedSecret) {
    return jsonError("Unauthorized.", 401);
  }

  const eventSlug = await collectEventSlug(payload, searchParams);
  const tags = collectRequestTags(payload, searchParams, eventSlug);
  const paths = collectRequestPaths(payload, searchParams, eventSlug);

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    success: true,
    revalidated: {
      tags,
      paths,
    },
  });
}

export function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export function POST(request: NextRequest) {
  return handleRevalidate(request);
}
