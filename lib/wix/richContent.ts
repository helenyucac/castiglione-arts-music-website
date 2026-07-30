import type { EventRichContentBlock, EventRichTextSpan } from "@/data/eventDetails";
import { optionalMediaUrl } from "@/lib/wix/media";
import type { WixRecordFields } from "@/lib/wix/types";

const maxDepth = 12;

function isRecord(value: unknown): value is WixRecordFields {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

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
  const normalizedText = text.toUpperCase();

  if (
    !text ||
    text === "#" ||
    normalizedText === "OPTIONAL" ||
    normalizedText === "MANUAL" ||
    normalizedText === "UPLOAD TO WIX"
  ) {
    return undefined;
  }

  return text;
}

function optionalNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
  }

  return undefined;
}

function parsePossiblyJsonValue(value: string): unknown {
  const text = value.trim();

  if (!text || (!text.startsWith("{") && !text.startsWith("["))) {
    return value;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return value;
  }
}

function normalizeNodeType(value: unknown) {
  return optionalString(value)
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") ?? "";
}

function childSources(value: WixRecordFields) {
  return [
    value.nodes,
    value.content,
    value.children,
    value.blocks,
    value.items,
    value.data,
    value.fieldData,
  ];
}

function flattenSpans(spans: EventRichTextSpan[]) {
  return spans.filter((span) => span.text.length > 0);
}

function textFromSpans(spans: EventRichTextSpan[]) {
  return spans.map((span) => span.text).join("").replace(/\s+/g, " ").trim();
}

function getDecorationHref(decoration: WixRecordFields) {
  const linkData = decoration.linkData as WixRecordFields | undefined;
  const nestedLink = linkData?.link as WixRecordFields | undefined;
  const url =
    optionalString(decoration.url) ??
    optionalString(decoration.href) ??
    optionalString((decoration.data as WixRecordFields | undefined)?.url) ??
    optionalString(linkData?.url) ??
    optionalString(linkData?.href) ??
    optionalString(nestedLink?.url) ??
    optionalString(nestedLink?.href);

  if (!url) {
    return undefined;
  }

  return /^(https?:\/\/|mailto:|tel:|\/)/i.test(url) ? url : undefined;
}

function getMarkHref(mark: WixRecordFields) {
  const attrs = mark.attrs as WixRecordFields | undefined;
  const url = optionalString(attrs?.href) ?? optionalString(attrs?.url) ?? optionalString(mark.href);

  if (!url) {
    return undefined;
  }

  return /^(https?:\/\/|mailto:|tel:|\/)/i.test(url) ? url : undefined;
}

function getTextDecorations(value: WixRecordFields) {
  const textData = value.textData as WixRecordFields | undefined;
  const decorations = [
    ...(Array.isArray(textData?.decorations) ? textData.decorations : []),
    ...(Array.isArray(value.decorations) ? value.decorations : []),
  ].filter(isRecord);
  const marks = (Array.isArray(value.marks) ? value.marks : []).filter(isRecord);
  const normalized = {
    bold: false,
    italic: false,
    underline: false,
    href: undefined as string | undefined,
  };

  for (const decoration of decorations) {
    const type = normalizeNodeType(decoration.type);
    normalized.bold ||= type.includes("bold");
    normalized.italic ||= type.includes("italic");
    normalized.underline ||= type.includes("underline");
    normalized.href ??= getDecorationHref(decoration);
  }

  for (const mark of marks) {
    const type = normalizeNodeType(mark.type);
    normalized.bold ||= type.includes("bold") || type.includes("strong");
    normalized.italic ||= type.includes("italic") || type.includes("em");
    normalized.underline ||= type.includes("underline");
    normalized.href ??= type.includes("link") ? getMarkHref(mark) : undefined;
  }

  return normalized;
}

function getTextNodeSpan(value: WixRecordFields): EventRichTextSpan | null {
  const textData = value.textData as WixRecordFields | undefined;
  const text = stringValue(textData?.text ?? value.text ?? value.value);

  if (!text) {
    return null;
  }

  return {
    text,
    ...getTextDecorations(value),
  };
}

function getInlineSpans(value: unknown, depth = 0): EventRichTextSpan[] {
  if (depth > maxDepth) {
    return [];
  }

  if (typeof value === "string") {
    const parsedValue = parsePossiblyJsonValue(value);

    if (parsedValue !== value) {
      return getInlineSpans(parsedValue, depth + 1);
    }

    return value.trim() ? [{ text: value }] : [];
  }

  if (Array.isArray(value)) {
    return flattenSpans(value.flatMap((item) => getInlineSpans(item, depth + 1)));
  }

  if (!isRecord(value)) {
    return [];
  }

  const nodeType = normalizeNodeType(value.type ?? value.nodeType);
  const textSpan = getTextNodeSpan(value);

  if (textSpan && (nodeType.includes("text") || !childSources(value).some(Boolean))) {
    return [textSpan];
  }

  if (nodeType.includes("line_break") || nodeType === "hard_break" || nodeType === "break") {
    return [{ text: "\n" }];
  }

  return flattenSpans(childSources(value).flatMap((source) => getInlineSpans(source, depth + 1)));
}

function getCaptionText(value: unknown) {
  const spans = getInlineSpans(value);
  return textFromSpans(spans) || undefined;
}

function mediaValueSources(value: WixRecordFields) {
  const imageData = value.imageData as WixRecordFields | undefined;
  const videoData = value.videoData as WixRecordFields | undefined;
  return [
    imageData?.image,
    imageData?.src,
    imageData?.url,
    videoData?.video,
    videoData?.src,
    videoData?.url,
    value.image,
    value.media,
    value.file,
    value.asset,
    value.src,
    value.url,
    value.mediaData,
    value.data,
    value.fieldData,
  ];
}

function wixImageMediaIdToStaticUrl(value: unknown) {
  const mediaId = optionalString(value);

  if (!mediaId || !/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(mediaId)) {
    return undefined;
  }

  return `https://static.wixstatic.com/media/${mediaId}`;
}

function getRicosMediaUrl(value: unknown): string | undefined {
  const resolvedUrl = optionalMediaUrl(value);

  if (resolvedUrl) {
    return resolvedUrl;
  }

  if (!isRecord(value)) {
    return undefined;
  }

  const src = value.src as WixRecordFields | undefined;

  return wixImageMediaIdToStaticUrl(src?.id ?? value.id);
}

function getImageBlock(value: WixRecordFields): EventRichContentBlock | null {
  const imageData = value.imageData as WixRecordFields | undefined;
  const image = imageData?.image as WixRecordFields | undefined;
  const imageSrc = image?.src as WixRecordFields | undefined;
  const src =
    getRicosMediaUrl(image) ??
    getRicosMediaUrl(imageSrc) ??
    mediaValueSources(value).map(optionalMediaUrl).find(Boolean);

  if (!src) {
    return null;
  }

  const caption =
    getCaptionText(imageData?.caption) ??
    getCaptionText(value.caption) ??
    optionalString(imageData?.caption) ??
    optionalString(value.caption);

  return {
    type: "image",
    src,
    width: optionalNumber(image?.width ?? imageSrc?.width),
    height: optionalNumber(image?.height ?? imageSrc?.height),
    alt:
      optionalString(imageData?.altText) ??
      optionalString(value.altText) ??
      optionalString(value.alt) ??
      caption,
    caption,
  };
}

function getVideoBlock(value: WixRecordFields): EventRichContentBlock | null {
  const videoData = value.videoData as WixRecordFields | undefined;
  const src = mediaValueSources(value).map(optionalMediaUrl).find(Boolean);

  if (!src) {
    return null;
  }

  return {
    type: "video",
    src,
    poster: optionalMediaUrl(videoData?.thumbnail ?? videoData?.posterImage ?? value.posterImage),
    caption: getCaptionText(videoData?.caption) ?? getCaptionText(value.caption) ?? optionalString(value.caption),
  };
}

function getListItems(value: WixRecordFields, depth: number): EventRichTextSpan[][] {
  return childSources(value)
    .flatMap((source) => (Array.isArray(source) ? source : source ? [source] : []))
    .flatMap((item): EventRichTextSpan[][] => {
      if (!isRecord(item)) {
        return [];
      }

      const itemType = normalizeNodeType(item.type ?? item.nodeType);
      if (!itemType.includes("list_item")) {
        return getRichContentBlocks(item, depth + 1).flatMap((block) => {
          if ("children" in block) {
            return block.children.length > 0 ? [block.children] : [];
          }

          if (block.type === "list") {
            return block.items;
          }

          return [];
        });
      }

      const spans = getInlineSpans(item, depth + 1);
      return spans.length > 0 ? [spans] : [];
    })
    .filter((spans) => textFromSpans(spans).length > 0);
}

export function getRichContentField(fields: WixRecordFields) {
  const directValue =
    fields.EventDescription ??
    fields.eventDescription ??
    fields.richEventDescription ??
    fields.eventRichDescription;

  if (directValue !== undefined) {
    return directValue;
  }

  for (const [key, value] of Object.entries(fields)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");

    if (
      normalizedKey === "eventdescription" ||
      normalizedKey === "eventrichdescription" ||
      normalizedKey === "richeventdescription"
    ) {
      return value;
    }
  }

  return undefined;
}

export function getRichContentBlocks(value: unknown, depth = 0): EventRichContentBlock[] {
  if (depth > maxDepth) {
    return [];
  }

  if (typeof value === "string") {
    const parsedValue = parsePossiblyJsonValue(value);

    if (parsedValue !== value) {
      return getRichContentBlocks(parsedValue, depth + 1);
    }

    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => getRichContentBlocks(item, depth + 1));
  }

  if (!isRecord(value)) {
    return [];
  }

  const nodeType = normalizeNodeType(value.type ?? value.nodeType);

  if (nodeType.includes("video") || optionalMediaUrl(value.video)) {
    const videoBlock = getVideoBlock(value);
    return videoBlock ? [videoBlock] : [];
  }

  if (
    nodeType.includes("image") ||
    nodeType === "wix_image" ||
    (optionalMediaUrl(value.image) && !nodeType.includes("video"))
  ) {
    const imageBlock = getImageBlock(value);
    return imageBlock ? [imageBlock] : [];
  }

  if (nodeType.includes("horizontal_rule") || nodeType.includes("divider")) {
    return [{ type: "divider" }];
  }

  if (nodeType.includes("heading")) {
    const headingData = value.headingData as WixRecordFields | undefined;
    const level = Number(headingData?.level ?? value.level ?? value.attrs);
    const children = getInlineSpans(value, depth + 1);

    return textFromSpans(children)
      ? [{ type: "heading", level: Number.isFinite(level) ? level : 2, children }]
      : [];
  }

  if (nodeType.includes("paragraph")) {
    const children = getInlineSpans(value, depth + 1);
    return textFromSpans(children) ? [{ type: "paragraph", children }] : [];
  }

  if (nodeType.includes("blockquote") || nodeType.includes("quote")) {
    const children = getInlineSpans(value, depth + 1);
    return textFromSpans(children) ? [{ type: "quote", children }] : [];
  }

  if (nodeType.includes("ordered_list") || nodeType.includes("bullet") || nodeType.includes("unordered_list")) {
    const items = getListItems(value, depth + 1);
    return items.length > 0
      ? [{ type: "list", ordered: nodeType.includes("ordered"), items }]
      : [];
  }

  return childSources(value).flatMap((source) => getRichContentBlocks(source, depth + 1));
}

export function hasVisibleRichContent(blocks: EventRichContentBlock[] | undefined) {
  return Boolean(
    blocks?.some((block) => {
      if (block.type === "image" || block.type === "video" || block.type === "divider") {
        return true;
      }

      if (block.type === "list") {
        return block.items.some((item) => textFromSpans(item).length > 0);
      }

      return textFromSpans(block.children).length > 0;
    }),
  );
}

export function normalizeRichEventDescription(fields: WixRecordFields) {
  const blocks = getRichContentBlocks(getRichContentField(fields));
  return hasVisibleRichContent(blocks) ? blocks : undefined;
}
