import type { WixRecordFields } from "@/lib/wix/types";

export const SAFE_EVENT_IMAGE_FALLBACK = "/media/our-touring-footprints.jpg";

const placeholderValues = new Set(["OPTIONAL", "MANUAL", "UPLOAD TO WIX"]);

function stringValue(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "";
}

function optionalString(value: unknown) {
  const text = stringValue(value).trim();

  if (!text || placeholderValues.has(text)) {
    return undefined;
  }

  return text;
}

function wixImageUriToStaticUrl(value: string) {
  if (!value.startsWith("wix:image://v1/")) {
    return undefined;
  }

  const mediaPath = value.replace("wix:image://v1/", "");
  const mediaId = mediaPath.split(/[/?#]/)[0];

  if (!mediaId) {
    return undefined;
  }

  return `https://static.wixstatic.com/media/${mediaId}`;
}

function wixVideoUriToStaticUrl(value: string) {
  if (!value.startsWith("wix:video://v1/")) {
    return undefined;
  }

  const mediaPath = value.replace("wix:video://v1/", "");
  const mediaSource = mediaPath.split(/[?#]/)[0];
  const mediaSegments = mediaSource.split("/").filter(Boolean);
  const mediaId = mediaSegments[0];

  if (!mediaId) {
    return undefined;
  }

  if (mediaSegments.length > 1) {
    return `https://video.wixstatic.com/video/${mediaSegments.join("/")}`;
  }

  return `https://video.wixstatic.com/video/${mediaId}`;
}

function normalizeMediaString(value: string) {
  return wixImageUriToStaticUrl(value) ?? wixVideoUriToStaticUrl(value) ?? value;
}

function uniqueUrls(urls: string[]) {
  return Array.from(new Set(urls));
}

export function mediaUrlsFromValue(value: unknown, depth = 0): string[] {
  if (depth > 6) {
    return [];
  }

  const text = optionalString(value);

  if (text) {
    return [normalizeMediaString(text)];
  }

  if (Array.isArray(value)) {
    return uniqueUrls(value.flatMap((item) => mediaUrlsFromValue(item, depth + 1)));
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const record = value as WixRecordFields;
  const mediaSources = [
    record.url,
    record.src,
    record.fileUrl,
    record.videoUrl,
    record.mediaUrl,
    record.downloadUrl,
    record.uri,
    record.image,
    record.media,
    record.file,
    record.asset,
    record.items,
    record.images,
    record.gallery,
    record.galleryItems,
    record.value,
    record.originalUrl,
    record.thumbnail,
    record.thumbnailUrl,
    record.posterImage,
    record.data,
    record.fieldData,
  ];

  return uniqueUrls(mediaSources.flatMap((source) => mediaUrlsFromValue(source, depth + 1)));
}

export function optionalMediaUrl(value: unknown, depth = 0): string | undefined {
  return mediaUrlsFromValue(value, depth)[0];
}
