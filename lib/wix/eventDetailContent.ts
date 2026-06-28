import { cache } from "react";
import { eventDetailsBySlug, type EventDetailData } from "@/data/eventDetails";
import { isWixConfigured, queryWixCollection, visibleFilter } from "@/lib/wix/client";
import { getTourProgram, tourProgramLabels } from "@/data/tours";
import { getWixFields } from "@/lib/wix/normalizers";
import { getEventVideos, getTourDates } from "@/lib/wix/eventDetails";
import type { TourProgram, TourStatus } from "@/data/tours";
import type {
  NormalizedEventVideo,
  NormalizedTourDate,
  WixCollectionItem,
  WixRecordFields,
} from "@/lib/wix/types";

function stringValue(value: unknown, fallback = "") {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function optionalString(value: unknown) {
  const text = stringValue(value).trim();

  if (!text || text === "OPTIONAL" || text === "MANUAL" || text === "UPLOAD TO WIX") {
    return undefined;
  }

  return text;
}

function hasRequiredTourDateFields(tourDate: NormalizedTourDate) {
  const ticketHref = optionalString(tourDate.ticketHref);

  return Boolean(
    optionalString(tourDate.date) &&
      optionalString(tourDate.city) &&
      optionalString(tourDate.venue) &&
      ticketHref &&
      ticketHref !== "#",
  );
}

function getEventVideoSource(video: NormalizedEventVideo) {
  return optionalString(video.src) ?? optionalString(video.videoUrl);
}

function hasRequiredEventVideoFields(video: NormalizedEventVideo) {
  return Boolean(getEventVideoSource(video));
}

function splitRichText(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => optionalString(item))
      .filter((item): item is string => Boolean(item));
  }

  const text = optionalString(value);

  if (!text) {
    return [];
  }

  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function normalizeProgram(value: unknown): TourProgram | undefined {
  const label = stringValue(value).toLowerCase();

  if (label.includes("anime") || label.includes("gaming")) {
    return "anime-gaming-concerts";
  }

  if (label.includes("classical") || label.includes("theatre")) {
    return "classical-concert-theatre";
  }

  if (label.includes("live") || label.includes("festival") || label.includes("lucid")) {
    return "live-music-festival";
  }

  if (label.includes("exhibition")) {
    return "touring-exhibition";
  }

  return undefined;
}

function normalizeStatus(value: unknown): TourStatus | undefined {
  const status = stringValue(value).toLowerCase();

  if (status === "on-sale" || status === "upcoming" || status === "past") {
    return status;
  }

  return undefined;
}

function resolveCategoryLabel(fields: WixRecordFields, fallback: EventDetailData) {
  return (
    optionalString(fields.eyebrow) ??
    optionalString(fields.categoryLabel) ??
    optionalString(fields.category) ??
    optionalString(fields.program) ??
    fallback.categoryLabel
  );
}

function resolveDescription(fields: WixRecordFields, fallback: EventDetailData) {
  const richTextSources = [
    fields.longDescription,
    fields.aboutBody,
    fields.overview,
    fields.synopsis,
    fields.description,
  ];

  for (const source of richTextSources) {
    const paragraphs = splitRichText(source);

    if (paragraphs.length > 0) {
      return paragraphs;
    }
  }

  return fallback.description;
}

function resolveRelatedTitle(fields: WixRecordFields, fallback: EventDetailData) {
  const program = normalizeProgram(fields.program);

  if (!program) {
    return fallback.relatedTitle;
  }

  return `More from ${tourProgramLabels[program]}.`;
}

function mergeCmsEventDetail(
  fields: WixRecordFields,
  fallback: EventDetailData,
): EventDetailData {
  const categoryLabel = resolveCategoryLabel(fields, fallback);
  const heroImage =
    optionalString(fields.heroImage) ??
    optionalString(fields.posterImage) ??
    optionalString(fields.cardImage) ??
    fallback.heroImage;
  const intro =
    optionalString(fields.shortDescription) ??
    optionalString(fields.subtitle) ??
    optionalString(fields.intro) ??
    fallback.intro;
  const primaryCtaLabel =
    optionalString(fields.ctaButton) ??
    optionalString(fields.ticketPrimaryLabel) ??
    fallback.primaryCtaLabel;
  const primaryCtaHref =
    optionalString(fields.ticketPrimaryUrl) ??
    optionalString(fields.ctaUrl) ??
    fallback.primaryCtaHref;
  const secondaryCtaLabel =
    optionalString(fields.partnerButtonLabel) ?? fallback.secondaryCtaLabel;
  const secondaryCtaHref =
    optionalString(fields.partnerButtonUrl) ?? fallback.secondaryCtaHref;

  return {
    ...fallback,
    slug: optionalString(fields.slug) ?? fallback.slug,
    seoTitle: optionalString(fields.seoTitle) ?? fallback.seoTitle,
    seoDescription: optionalString(fields.seoDescription) ?? fallback.seoDescription,
    categoryLabel,
    title: optionalString(fields.title) ?? fallback.title,
    intro,
    heroImage,
    heroAlt:
      optionalString(fields.heroAlt) ??
      optionalString(fields.posterAlt) ??
      fallback.heroAlt,
    seasonLabel:
      optionalString(fields.seasonLabel) ??
      optionalString(fields.eventCardDate) ??
      fallback.seasonLabel,
    citySummary:
      optionalString(fields.citySummary) ??
      optionalString(fields.eventCardCities) ??
      fallback.citySummary,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    aboutEyebrow: optionalString(fields.aboutTitle) ?? fallback.aboutEyebrow,
    description: resolveDescription(fields, fallback),
    relatedTitle: resolveRelatedTitle(fields, fallback),
  };
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

async function getWixEventBySlug(slug: string) {
  const items = await queryWixCollection("Events", {
    filter: visibleFilter({ slug }),
    limit: 1,
  });

  if (!items[0]) {
    return null;
  }

  return {
    id: getWixItemId(items[0]),
    fields: getWixFields(items[0]),
  };
}

async function getWixTourDatesForEvent(slug: string, eventId?: string) {
  const tourDates = await getTourDates(slug, eventId ? [eventId] : []);

  if (tourDates.length === 0 || !tourDates.every(hasRequiredTourDateFields)) {
    return null;
  }

  return tourDates;
}

async function getWixTrailerVideoForEvent(slug: string, eventId?: string) {
  const videos = await getEventVideos(slug, eventId ? [eventId] : []);
  const trailerVideo = videos.find(hasRequiredEventVideoFields);

  if (!trailerVideo) {
    return null;
  }

  return trailerVideo;
}

export const getResolvedEventDetailBySlug = cache(async (slug: string) => {
  const fallback = eventDetailsBySlug[slug];

  if (!fallback || !isWixConfigured()) {
    return fallback ?? null;
  }

  try {
    const cmsEvent = await getWixEventBySlug(slug);
    const cmsTourDates = await getWixTourDatesForEvent(slug, cmsEvent?.id);
    const cmsTrailerVideo = await getWixTrailerVideoForEvent(slug, cmsEvent?.id);

    if (!cmsEvent && !cmsTourDates && !cmsTrailerVideo) {
      return fallback;
    }

    const fields = cmsEvent?.fields ?? {};

    const status = normalizeStatus(fields.status);
    const mergedEvent = mergeCmsEventDetail(
      {
        ...fields,
        status: status ?? fields.status,
        program: fields.program ?? getTourProgram(fallback.relatedEvents[0]?.category),
      },
      fallback,
    );

    return {
      ...mergedEvent,
      tourDates: cmsTourDates ?? fallback.tourDates,
      trailerEyebrow:
        cmsTrailerVideo ? optionalString(cmsTrailerVideo.title) ?? fallback.trailerEyebrow : fallback.trailerEyebrow,
      trailerVideoSrc: cmsTrailerVideo
        ? getEventVideoSource(cmsTrailerVideo)
        : fallback.trailerVideoSrc,
    };
  } catch {
    return fallback;
  }
});
