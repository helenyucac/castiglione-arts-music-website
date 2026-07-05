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

function normalizeMediaString(value: string) {
  return wixImageUriToStaticUrl(value) ?? value;
}

export function optionalMediaUrl(value: unknown, depth = 0): string | undefined {
  if (depth > 6) {
    return undefined;
  }

  const text = optionalString(value);

  if (text) {
    return normalizeMediaString(text);
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const mediaUrl = optionalMediaUrl(item, depth + 1);

      if (mediaUrl) {
        return mediaUrl;
      }
    }

    return undefined;
  }

  if (!value || typeof value !== "object") {
    return undefined;
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
    record.value,
    record.originalUrl,
    record.thumbnail,
    record.thumbnailUrl,
    record.posterImage,
    record.data,
    record.fieldData,
  ];

  for (const source of mediaSources) {
    const mediaUrl = optionalMediaUrl(source, depth + 1);

    if (mediaUrl) {
      return mediaUrl;
    }
  }

  return undefined;
}
