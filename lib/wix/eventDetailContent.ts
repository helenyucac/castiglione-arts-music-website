import { cache } from "react";
import { eventDetailsBySlug, type EventDetailData, type EventTourDate } from "@/data/eventDetails";
import { isWixConfigured, queryWixCollection, visibleFilter } from "@/lib/wix/client";
import { getTourProgram, homepageWhatsOnEvents, tourProgramLabels } from "@/data/tours";
import { formatPublicDateRangeFromValues, formatPublicEventDate } from "@/lib/dateDisplay";
import { getWixFields } from "@/lib/wix/normalizers";
import { getEventGallery, getEventVideos, getTourDates } from "@/lib/wix/eventDetails";
import { getPartnersByEvent } from "@/lib/wix/partners";
import { getTestimonialsByEvent } from "@/lib/wix/testimonials";
import type { TourProgram, TourStatus } from "@/data/tours";
import type {
  NormalizedEventGalleryImage,
  NormalizedEventVideo,
  NormalizedPartner,
  NormalizedTestimonial,
  NormalizedTourDate,
  WixCollectionItem,
  WixRecordFields,
} from "@/lib/wix/types";

const DEFAULT_EVENT_HERO_IMAGE = "/media/naruto-hero.jpg";
const DEFAULT_SEASON_LABEL = "DATES TO BE ANNOUNCED";
const DEFAULT_CITY_SUMMARY = "TO BE ANNOUNCED";

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

function optionalMediaUrl(value: unknown): string | undefined {
  const text = optionalString(value);

  if (text) {
    return text;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const mediaUrl = optionalMediaUrl(item);

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
  ];

  for (const source of mediaSources) {
    const mediaUrl = optionalMediaUrl(source);

    if (mediaUrl) {
      return mediaUrl;
    }
  }

  return undefined;
}

function stringCandidates(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(stringCandidates);
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    const candidate = String(value).trim();
    return candidate ? [candidate] : [];
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const record = value as WixRecordFields;

  return [
    record.slug,
    record.title,
    record.name,
    record.label,
    record.categoryLabel,
    record.programLabel,
    record._id,
    record.id,
    record.data,
    record.fieldData,
  ].flatMap(stringCandidates);
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

function hasRequiredGalleryImageFields(image: NormalizedEventGalleryImage) {
  return Boolean(optionalString(image.src) && optionalString(image.alt));
}

function hasRequiredPartnerFields(partner: NormalizedPartner) {
  return Boolean(optionalString(partner.name));
}

function hasRequiredTestimonialFields(testimonial: NormalizedTestimonial) {
  return Boolean(optionalString(testimonial.quote) && optionalString(testimonial.name));
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
  const candidates = stringCandidates(value);

  for (const candidate of candidates) {
    const label = candidate.toLowerCase();

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
  }

  return undefined;
}

function resolveProgram(fields: WixRecordFields) {
  return normalizeProgram(
    fields.program ??
      fields.programLabel ??
      fields.categoryLabel ??
      fields.category ??
      fields.eyebrow,
  );
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
    optionalString(fields.programLabel) ??
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
  const program = resolveProgram(fields);

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
    optionalMediaUrl(fields.heroImage) ??
    optionalMediaUrl(fields.posterImage) ??
    optionalMediaUrl(fields.cardImage) ??
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
  const seasonLabel =
    formatPublicEventDate({
      startDate: optionalString(fields.startDate),
      endDate: optionalString(fields.endDate),
      fallback:
        optionalString(fields.seasonLabel) ??
        optionalString(fields.eventCardDate) ??
        fallback.seasonLabel,
    }) ?? fallback.seasonLabel;

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
    seasonLabel,
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

function resolveProgramHref(program: TourProgram | undefined) {
  if (program === "anime-gaming-concerts" || program === "classical-concert-theatre") {
    return "/programs/concerts";
  }

  if (program === "live-music-festival") {
    return "/programs/music-festival";
  }

  if (program === "touring-exhibition") {
    return "/programs/exhibitions";
  }

  return "/#whats-on";
}

function getRelatedEventsForProgram(program: TourProgram | undefined, slug: string) {
  if (!program) {
    return [];
  }

  return homepageWhatsOnEvents
    .filter((event) => getTourProgram(event.category) === program)
    .filter((event) => event.href !== `/tours/${slug}`)
    .slice(0, 3);
}

function createCmsOnlyFallback(fields: WixRecordFields, requestedSlug: string) {
  const title = optionalString(fields.title);
  const slug = optionalString(fields.slug) ?? requestedSlug;

  if (!title || !slug) {
    return null;
  }

  const program = resolveProgram(fields);
  const programLabel = program ? tourProgramLabels[program] : "What's On";
  const shortDescription =
    optionalString(fields.shortDescription) ??
    optionalString(fields.subtitle) ??
    optionalString(fields.intro);

  const fallback: EventDetailData = {
    slug,
    seoTitle: optionalString(fields.seoTitle) ?? `${title} | Castiglione`,
    seoDescription: optionalString(fields.seoDescription) ?? shortDescription,
    breadcrumb: ["Home", "What's On", programLabel],
    categoryLabel: programLabel,
    title,
    intro: "",
    heroImage: DEFAULT_EVENT_HERO_IMAGE,
    heroAlt: `${title} event image`,
    seasonLabel: DEFAULT_SEASON_LABEL,
    citySummary: DEFAULT_CITY_SUMMARY,
    primaryCtaLabel: "BUY TICKETS",
    primaryCtaHref: "#tour-dates",
    secondaryCtaLabel: "PARTNER ON THIS TOUR",
    secondaryCtaHref: "/partnerships",
    aboutEyebrow: "ABOUT THE SHOW",
    description: [],
    trailerEyebrow: "TRAILER VIDEO",
    tourDates: [],
    relatedEyebrow: "ALSO PROGRAMMED",
    relatedTitle: program ? `More from ${programLabel}.` : "More from What's On.",
    relatedHref: resolveProgramHref(program),
    relatedLinkLabel: "SEE FULL SEASON",
    relatedEvents: getRelatedEventsForProgram(program, slug),
  };

  return mergeCmsEventDetail(fields, fallback);
}

function summarizeTourDateCities(tourDates: EventTourDate[]) {
  const cities = Array.from(
    new Set(
      tourDates
        .map((tourDate) => optionalString(tourDate.city))
        .filter((city): city is string => Boolean(city)),
    ),
  );

  return cities.length > 0 ? cities.map((city) => city.toUpperCase()).join(" · ") : undefined;
}

function summarizeTourDateSeason(tourDates: EventTourDate[]) {
  return formatPublicDateRangeFromValues(tourDates.map((tourDate) => tourDate.date));
}

async function optionalCmsSection<T>(loadSection: () => Promise<T | null>) {
  try {
    return await loadSection();
  } catch {
    return null;
  }
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

async function getWixGalleryImagesForEvent(slug: string, eventId?: string) {
  const galleryImages = await getEventGallery(slug, eventId ? [eventId] : []);

  if (galleryImages.length === 0 || !galleryImages.every(hasRequiredGalleryImageFields)) {
    return null;
  }

  return galleryImages;
}

async function getWixPartnersForEvent(slug: string, eventId?: string) {
  const partners = await getPartnersByEvent(slug, eventId ? [eventId] : []);

  if (partners.length === 0 || !partners.every(hasRequiredPartnerFields)) {
    return null;
  }

  return partners;
}

async function getWixTestimonialsForEvent(slug: string, eventId?: string) {
  const testimonials = await getTestimonialsByEvent(slug, eventId ? [eventId] : []);

  if (testimonials.length === 0 || !testimonials.every(hasRequiredTestimonialFields)) {
    return null;
  }

  return testimonials;
}

export const getResolvedEventDetailBySlug = cache(async (slug: string) => {
  const fallback = eventDetailsBySlug[slug];
  const shouldDebugMischa = slug === "mischa-maisky-recital";

  if (shouldDebugMischa) {
    console.info("[Wix CMS debug] resolver start", {
      slug,
      hasLocalFallback: Boolean(fallback),
      isWixConfigured: isWixConfigured(),
    });
  }

  if (!isWixConfigured()) {
    if (shouldDebugMischa) {
      console.info("[Wix CMS debug] resolver returning before Wix query", {
        reason: "Wix CMS is not configured",
        result: fallback ? "local fallback" : "null",
      });
    }

    return fallback ?? null;
  }

  try {
    const cmsEvent = await getWixEventBySlug(slug);

    if (shouldDebugMischa) {
      console.info("[Wix CMS debug] resolver Wix event result", {
        slug,
        hasCmsEvent: Boolean(cmsEvent),
        cmsEventId: cmsEvent?.id,
      });
    }

    if (!fallback && !cmsEvent) {
      if (shouldDebugMischa) {
        console.info("[Wix CMS debug] resolver returning null", {
          reason: "No local fallback and no CMS event",
          nextRouteBehavior: "app/tours/[slug]/page.tsx will call notFound()",
        });
      }

      return null;
    }

    const cmsTourDates = await optionalCmsSection(() =>
      getWixTourDatesForEvent(slug, cmsEvent?.id),
    );
    const cmsTrailerVideo = await optionalCmsSection(() =>
      getWixTrailerVideoForEvent(slug, cmsEvent?.id),
    );
    const cmsGalleryImages = await optionalCmsSection(() =>
      getWixGalleryImagesForEvent(slug, cmsEvent?.id),
    );
    const cmsPartners = await optionalCmsSection(() =>
      getWixPartnersForEvent(slug, cmsEvent?.id),
    );
    const cmsTestimonials = await optionalCmsSection(() =>
      getWixTestimonialsForEvent(slug, cmsEvent?.id),
    );

    if (
      fallback &&
      !cmsEvent &&
      !cmsTourDates &&
      !cmsTrailerVideo &&
      !cmsGalleryImages &&
      !cmsPartners &&
      !cmsTestimonials
    ) {
      return fallback;
    }

    const fields = cmsEvent?.fields ?? {};
    const baseEvent = fallback ?? createCmsOnlyFallback(fields, slug);

    if (!baseEvent) {
      if (shouldDebugMischa) {
        console.info("[Wix CMS debug] resolver returning null", {
          reason: "CMS event exists but could not construct EventDetailData",
          likelyMissingFields: ["title", "slug"],
          nextRouteBehavior: "app/tours/[slug]/page.tsx will call notFound()",
        });
      }

      return null;
    }

    const resolvedTourDates = cmsTourDates ?? baseEvent.tourDates;
    const cmsOnlySeasonLabel =
      baseEvent.seasonLabel === DEFAULT_SEASON_LABEL
        ? summarizeTourDateSeason(resolvedTourDates)
        : undefined;
    const cmsOnlyCitySummary =
      baseEvent.citySummary === DEFAULT_CITY_SUMMARY
        ? summarizeTourDateCities(resolvedTourDates)
        : undefined;
    const status = normalizeStatus(fields.status);
    const mergedEvent = cmsEvent
      ? mergeCmsEventDetail(
          {
            ...fields,
            status: status ?? fields.status,
            program:
              fields.program ??
              fields.programLabel ??
              fields.categoryLabel ??
              getTourProgram(baseEvent.relatedEvents[0]?.category),
          },
          baseEvent,
        )
      : baseEvent;

    return {
      ...mergedEvent,
      seasonLabel: cmsOnlySeasonLabel ?? mergedEvent.seasonLabel,
      citySummary: cmsOnlyCitySummary ?? mergedEvent.citySummary,
      tourDates: resolvedTourDates,
      trailerEyebrow:
        cmsTrailerVideo
          ? optionalString(cmsTrailerVideo.title) ?? mergedEvent.trailerEyebrow
          : mergedEvent.trailerEyebrow,
      trailerVideoSrc: cmsTrailerVideo
        ? getEventVideoSource(cmsTrailerVideo)
        : mergedEvent.trailerVideoSrc,
      galleryImages: cmsGalleryImages ?? mergedEvent.galleryImages,
      partners: cmsPartners ?? mergedEvent.partners,
      testimonials: cmsTestimonials ?? mergedEvent.testimonials,
    };
  } catch (error) {
    if (shouldDebugMischa) {
      console.info("[Wix CMS debug] resolver caught Wix error", {
        error: error instanceof Error ? error.message : String(error),
        result: fallback ? "local fallback" : "null",
        nextRouteBehavior: fallback ? "render local fallback" : "app/tours/[slug]/page.tsx will call notFound()",
      });
    }

    return fallback ?? null;
  }
});
