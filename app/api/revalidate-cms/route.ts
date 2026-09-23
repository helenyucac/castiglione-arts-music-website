import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { normalizeTourSlug } from "@/lib/tourSlug";

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
  secret?: unknown;
  path?: unknown;
  paths?: unknown;
  event?: unknown;
  eventSlug?: unknown;
  slug?: unknown;
  tags?: unknown;
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

function collectEventSlug(payload: RevalidatePayload, searchParams: URLSearchParams) {
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

  const eventSlug = collectEventSlug(payload, searchParams);
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
