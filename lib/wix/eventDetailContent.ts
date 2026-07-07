import { cache } from "react";
import { eventDetailsBySlug, type EventDetailData, type EventTourDate } from "@/data/eventDetails";
import { isWixConfigured, queryWixCollection, visibleFilter } from "@/lib/wix/client";
import { getTourProgram, homepageWhatsOnEvents, tourProgramLabels } from "@/data/tours";
import { formatPublicDateRangeFromValues, formatPublicEventDate } from "@/lib/dateDisplay";
import { getWixFields } from "@/lib/wix/normalizers";
import { optionalMediaUrl, SAFE_EVENT_IMAGE_FALLBACK } from "@/lib/wix/media";
import { getEventGallery, getEventVideos, getTourDates } from "@/lib/wix/eventDetails";
import { getEvents } from "@/lib/wix/events";
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

const DEFAULT_EVENT_HERO_IMAGE = SAFE_EVENT_IMAGE_FALLBACK;
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

function isRecord(value: unknown): value is WixRecordFields {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stripHtml(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function splitParagraphs(value: string) {
  const text = stripHtml(value);

  if (!text) {
    return [];
  }

  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

function extractRichTextParagraphs(value: unknown, depth = 0): string[] {
  if (depth > 8) {
    return [];
  }

  if (typeof value === "string") {
    const parsedValue = parsePossiblyJsonValue(value);

    if (parsedValue !== value) {
      return extractRichTextParagraphs(parsedValue, depth + 1);
    }

    return splitParagraphs(value);
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => extractRichTextParagraphs(item, depth + 1));
  }

  if (!isRecord(value)) {
    return [];
  }

  const textDataText = optionalString((value.textData as WixRecordFields | undefined)?.text);
  if (textDataText) {
    return splitParagraphs(textDataText);
  }

  const directText = optionalString(value.text ?? value.html ?? value.value);
  if (directText) {
    return splitParagraphs(directText);
  }

  const nestedSources = [
    value.nodes,
    value.content,
    value.children,
    value.blocks,
    value.body,
    value.description,
    value.longDescription,
    value.aboutBody,
    value.richTextContent,
    value.overview,
    value.synopsis,
    value.richContent,
    value.data,
    value.fieldData,
  ];
  const nestedParagraphs = nestedSources.flatMap((source) =>
    extractRichTextParagraphs(source, depth + 1),
  );

  if (nestedParagraphs.length === 0) {
    return [];
  }

  const nodeType = optionalString(value.type)?.toLowerCase() ?? "";
  const shouldCollapseNode =
    nodeType.includes("paragraph") ||
    nodeType.includes("heading") ||
    nodeType.includes("list-item");

  if (!shouldCollapseNode) {
    return nestedParagraphs;
  }

  return [nestedParagraphs.join(" ").replace(/\s+/g, " ").trim()].filter(Boolean);
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
  return Boolean(
    (optionalString(tourDate.displayDate) || optionalString(tourDate.date)) &&
      optionalString(tourDate.city) &&
      optionalString(tourDate.venue),
  );
}

function numberValue(value: unknown, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function booleanValue(value: unknown, fallback = true) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    if (value.toLowerCase() === "true") {
      return true;
    }

    if (value.toLowerCase() === "false") {
      return false;
    }
  }

  return fallback;
}

function textField(
  value: unknown,
  keys: string[] = ["title", "name", "label", "text"],
): string | undefined {
  const directText = optionalString(value);

  if (directText) {
    return directText;
  }

  if (!isRecord(value)) {
    return undefined;
  }

  for (const key of keys) {
    const nestedText = optionalString(value[key]);

    if (nestedText) {
      return nestedText;
    }
  }

  return textField(value.data, keys) ?? textField(value.fieldData, keys);
}

function splitList(value: unknown): string[] {
  const text = textField(value);

  if (!text) {
    return [];
  }

  return text
    .split(/·|,|\|/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePossiblyJsonValue(value: unknown): unknown {
  const text = optionalString(value);

  if (!text || (!text.startsWith("[") && !text.startsWith("{"))) {
    return value;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return value;
  }
}

function arrayItems(value: unknown): unknown[] {
  const parsedValue = parsePossiblyJsonValue(value);

  if (Array.isArray(parsedValue)) {
    return parsedValue;
  }

  if (!isRecord(parsedValue)) {
    return [];
  }

  for (const key of ["items", "rows", "dates", "shows", "performances", "eventDates", "schedule"]) {
    const nestedItems = arrayItems(parsedValue[key]);

    if (nestedItems.length > 0) {
      return nestedItems;
    }
  }

  return [];
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
  return extractRichTextParagraphs(value);
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
    fields.aboutDescription,
    fields.aboutText,
    fields.eventDescription,
    fields.showDescription,
    fields.overview,
    fields.synopsis,
    fields.richTextContent,
    fields.richContent,
    fields.body,
    fields.content,
    fields.sections,
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

function normalizeInlineTourDate(
  value: unknown,
  parentFields: WixRecordFields,
  index: number,
): NormalizedTourDate | null {
  const fields = isRecord(value) ? value : {};
  const date =
    textField(fields.displayDate) ??
    textField(fields.date) ??
    textField(fields.startDate) ??
    textField(fields.eventDate) ??
    textField(fields.showDate) ??
    textField(fields.performanceDate) ??
    textField(value);
  const city =
    textField(fields.city) ??
    textField(fields.cityName) ??
    textField(fields.locationCity) ??
    textField(fields.location) ??
    textField(fields.eventCity);
  const venue =
    textField(fields.venue, ["venueName", "name", "title", "label", "text"]) ??
    textField(fields.venueName) ??
    textField(fields.locationName) ??
    textField(fields.eventVenue);
  const ticketHref =
    textField(fields.ticketUrl) ??
    textField(fields.ticketLink) ??
    textField(fields.ticketHref) ??
    textField(fields.ticketPrimaryUrl) ??
    textField(fields.bookingUrl) ??
    textField(fields.ctaUrl) ??
    textField(parentFields.ticketPrimaryUrl) ??
    textField(parentFields.ticketUrl) ??
    textField(parentFields.bookingUrl) ??
    textField(parentFields.ctaUrl) ??
    "#";
  const ticketLabel =
    textField(fields.ticketLabel) ??
    textField(fields.buttonLabel) ??
    textField(fields.ticketPrimaryLabel) ??
    textField(parentFields.ticketPrimaryLabel) ??
    "BUY TICKETS";
  const isVisible = booleanValue(fields.isVisible, true);

  if (!isVisible || !date || !city || !venue) {
    return null;
  }

  return {
    id: textField(fields._id) ?? textField(fields.id) ?? `${city}-${date}-${index}`,
    event: textField(fields.event) ?? textField(parentFields.slug) ?? "",
    showLabel: textField(fields.showLabel) ?? `SHOW ${index + 1}`,
    date,
    displayDate: date,
    time:
      textField(fields.time) ??
      textField(fields.eventTime) ??
      textField(fields.showTime) ??
      textField(fields.performanceTime),
    city,
    venue,
    country: textField(fields.country),
    ticketLabel,
    ticketHref,
    ticketStatus: textField(fields.ticketStatus),
    order: numberValue(fields.order, index),
    isVisible,
  };
}

function resolveInlineTourDates(fields: WixRecordFields, fallback: EventTourDate[]) {
  const inlineSources = [
    fields.tourDates,
    fields.tourDateRows,
    fields.shows,
    fields.performances,
    fields.showDates,
    fields.dates,
    fields.eventDates,
    fields.schedule,
  ];
  const explicitTourDates = inlineSources
    .flatMap(arrayItems)
    .map((item, index) => normalizeInlineTourDate(item, fields, index))
    .filter((tourDate): tourDate is NormalizedTourDate => Boolean(tourDate))
    .filter(hasRequiredTourDateFields);

  if (explicitTourDates.length > 0) {
    return explicitTourDates;
  }

  const cities = splitList(fields.eventCardCities ?? fields.citySummary ?? fields.city);
  const venues = splitList(fields.venues ?? fields.venueList ?? fields.venue ?? fields.venueName);
  const date =
    textField(fields.displayDate) ??
    textField(fields.eventCardDate) ??
    textField(fields.seasonLabel) ??
    textField(fields.startDate) ??
    textField(fields.eventDate);

  if (!date || cities.length === 0 || venues.length === 0) {
    return fallback;
  }

  const summaryTourDates = cities
    .map((city, index) =>
      normalizeInlineTourDate(
        {
          city,
          venue: venues[index] ?? venues[0],
          date,
          ticketUrl:
            fields.ticketPrimaryUrl ??
            fields.ticketUrl ??
            fields.ticketLink ??
            fields.bookingUrl,
          ticketLabel: fields.ticketPrimaryLabel ?? fields.ticketLabel ?? fields.buttonLabel,
          order: index,
        },
        fields,
        index,
      ),
    )
    .filter((tourDate): tourDate is NormalizedTourDate => Boolean(tourDate))
    .filter(hasRequiredTourDateFields);

  return summaryTourDates.length > 0 ? summaryTourDates : fallback;
}

function mergeCmsEventDetail(
  fields: WixRecordFields,
  fallback: EventDetailData,
): EventDetailData {
  const categoryLabel = resolveCategoryLabel(fields, fallback);
  const heroImage =
    optionalMediaUrl(fields.heroImageAsset) ??
    optionalMediaUrl(fields.cardImageAsset) ??
    optionalMediaUrl(fields.cardImage) ??
    optionalMediaUrl(fields.heroImage) ??
    optionalMediaUrl(fields.posterImage) ??
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
    optionalString(fields.ticketUrl) ??
    optionalString(fields.ticketLink) ??
    optionalString(fields.bookingUrl) ??
    optionalString(fields.ctaUrl) ??
    fallback.primaryCtaHref;
  const secondaryCtaLabel =
    optionalString(fields.partnerCtaLabel) ??
    optionalString(fields.partnerButtonLabel) ?? fallback.secondaryCtaLabel;
  const secondaryCtaHref =
    optionalString(fields.partnerCtaUrl) ??
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
    tourDates: resolveInlineTourDates(fields, fallback.tourDates),
    relatedTitle: "More Events",
  };
}

const activeRelatedStatuses = new Set(["on-sale", "upcoming"]);

function getLocalDateTimestamp(date: string) {
  const isoDate = date.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (isoDate) {
    const [, year, month, day] = isoDate;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }

  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getTodayTimestamp() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
}

function getTourSlugFromHref(href?: string) {
  return href?.split("/").filter(Boolean).at(-1);
}

function getUpcomingRelatedEvents(slug: string) {
  const todayTimestamp = getTodayTimestamp();

  return homepageWhatsOnEvents
    .filter((event) => event.id !== slug && getTourSlugFromHref(event.href) !== slug)
    .filter((event) => activeRelatedStatuses.has(event.status))
    .filter((event) => getLocalDateTimestamp(event.date) >= todayTimestamp)
    .sort(
      (firstEvent, secondEvent) =>
        getLocalDateTimestamp(firstEvent.date) - getLocalDateTimestamp(secondEvent.date),
    )
    .slice(0, 3);
}

async function getWixUpcomingRelatedEvents(slug: string) {
  const todayTimestamp = getTodayTimestamp();
  const events = await getEvents();
  const relatedEvents = events
    .filter((event) => event.id !== slug && event.slug !== slug && getTourSlugFromHref(event.href) !== slug)
    .filter((event) => activeRelatedStatuses.has(event.status))
    .filter((event) => getLocalDateTimestamp(event.date) >= todayTimestamp)
    .sort(
      (firstEvent, secondEvent) =>
        getLocalDateTimestamp(firstEvent.date) - getLocalDateTimestamp(secondEvent.date),
    )
    .slice(0, 3);

  return relatedEvents.length > 0 ? relatedEvents : null;
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
    relatedTitle: "More Events",
    relatedHref: "/#whats-on",
    relatedLinkLabel: "SEE FULL SEASON",
    relatedEvents: getUpcomingRelatedEvents(slug),
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

  const validTourDates = tourDates.filter(hasRequiredTourDateFields);

  if (validTourDates.length === 0) {
    return null;
  }

  return validTourDates;
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
  const validGalleryImages = galleryImages.filter(hasRequiredGalleryImageFields);

  if (validGalleryImages.length === 0) {
    return null;
  }

  return validGalleryImages;
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

  if (!isWixConfigured()) {
    return fallback ?? null;
  }

  try {
    const cmsEvent = await getWixEventBySlug(slug);

    if (!fallback && !cmsEvent) {
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
    const cmsRelatedEvents = await optionalCmsSection(() => getWixUpcomingRelatedEvents(slug));

    if (
      fallback &&
      !cmsEvent &&
      !cmsTourDates &&
      !cmsTrailerVideo &&
      !cmsGalleryImages &&
      !cmsPartners &&
      !cmsTestimonials &&
      !cmsRelatedEvents
    ) {
      return fallback;
    }

    const fields = cmsEvent?.fields ?? {};
    const baseEvent = fallback ?? createCmsOnlyFallback(fields, slug);

    if (!baseEvent) {
      return null;
    }

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
    const resolvedTourDates = cmsTourDates ?? mergedEvent.tourDates;
    const cmsOnlySeasonLabel =
      mergedEvent.seasonLabel === DEFAULT_SEASON_LABEL
        ? summarizeTourDateSeason(resolvedTourDates)
        : undefined;
    const cmsOnlyCitySummary =
      mergedEvent.citySummary === DEFAULT_CITY_SUMMARY
        ? summarizeTourDateCities(resolvedTourDates)
        : undefined;

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
      relatedEvents: cmsRelatedEvents ?? mergedEvent.relatedEvents,
    };
  } catch {
    return fallback ?? null;
  }
});
