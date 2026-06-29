import type { TourCategory, TourProgram, TourStatus } from "@/data/tours";
import { formatPublicEventDate } from "@/lib/dateDisplay";
import type {
  NavigationLocation,
  NormalizedDesignSettings,
  NormalizedEvent,
  NormalizedEventGalleryImage,
  NormalizedEventVideo,
  NormalizedHeroStat,
  NormalizedNavigationLink,
  NormalizedPartner,
  NormalizedProgram,
  NormalizedSiteSettings,
  NormalizedSocialLink,
  NormalizedTestimonial,
  NormalizedTourDate,
  NormalizedVenue,
  SocialLocation,
  WixCollectionItem,
  WixRecordFields,
} from "@/lib/wix/types";

const programLabelToProgram: Record<string, TourProgram> = {
  "anime & gaming concerts": "anime-gaming-concerts",
  "classical concerts & theatre": "classical-concert-theatre",
  "live music & festivals": "live-music-festival",
  "touring exhibitions": "touring-exhibition",
};

const programSlugToProgram: Record<string, TourProgram> = {
  "anime-gaming-concerts": "anime-gaming-concerts",
  "classical-concert-theatre": "classical-concert-theatre",
  "live-music-festival": "live-music-festival",
  "touring-exhibition": "touring-exhibition",
};

const programToLabel: Record<TourProgram, string> = {
  "anime-gaming-concerts": "Anime & Gaming Concerts",
  "classical-concert-theatre": "Classical Concerts & Theatre",
  "live-music-festival": "Live Music & Festivals",
  "touring-exhibition": "Touring Exhibitions",
};

const programToCategory: Record<TourProgram, TourCategory> = {
  "anime-gaming-concerts": "anime-concert",
  "classical-concert-theatre": "classical-recital",
  "live-music-festival": "music-festival",
  "touring-exhibition": "exhibitions",
};

function isRecord(value: unknown): value is WixRecordFields {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getWixFields(item: WixCollectionItem): WixRecordFields {
  const fields: WixRecordFields = {};

  for (const [key, value] of Object.entries(item)) {
    if (key !== "data" && key !== "fieldData") {
      fields[key] = value;
    }
  }

  if (isRecord(item.data)) {
    Object.assign(fields, item.data);
  }

  if (isRecord(item.fieldData)) {
    Object.assign(fields, item.fieldData);
  }

  return fields;
}

function idOf(fields: WixRecordFields) {
  return stringValue(fields._id ?? fields.id, "manual-id");
}

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

  if (!value || typeof value !== "object" || Array.isArray(value)) {
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
    const sourceUrl = optionalMediaUrl(source);

    if (sourceUrl) {
      return sourceUrl;
    }
  }

  return undefined;
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

function booleanValue(value: unknown, fallback = false) {
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

function splitList(value: unknown) {
  const text = stringValue(value);

  if (!text) {
    return [];
  }

  return text
    .split(/·|,|\|/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringCandidates(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(stringCandidates);
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    const candidate = String(value).trim();
    return candidate ? [candidate] : [];
  }

  if (!isRecord(value)) {
    return [];
  }

  return [
    value.slug,
    value.title,
    value.name,
    value.label,
    value._id,
    value.id,
    value.data,
    value.fieldData,
  ].flatMap(stringCandidates);
}

function parseHeroStats(value: unknown): NormalizedHeroStat[] {
  if (Array.isArray(value)) {
    return value
      .filter(isRecord)
      .map((stat) => ({
        value: stringValue(stat.value),
        label: stringValue(stat.label),
      }))
      .filter((stat) => stat.value && stat.label);
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed: unknown = JSON.parse(value);
      return parseHeroStats(parsed);
    } catch {
      return value
        .split("·")
        .map((label) => ({ value: "", label: label.trim() }))
        .filter((stat) => stat.label);
    }
  }

  return [];
}

function normalizeProgram(value: unknown): TourProgram | null {
  for (const candidate of stringCandidates(value)) {
    const key = candidate.toLowerCase();
    const program = programLabelToProgram[key] ?? programSlugToProgram[key];

    if (program) {
      return program;
    }
  }

  return null;
}

function normalizeCategory(program: TourProgram | null, categoryLabel: string): TourCategory {
  const label = categoryLabel.toLowerCase();

  if (label.includes("gaming") || label.includes("game")) {
    return "gaming-concert";
  }

  if (label.includes("lucid")) {
    return "lucid";
  }

  if (label.includes("festival")) {
    return "music-festival";
  }

  if (label.includes("exhibition")) {
    return "exhibitions";
  }

  if (label.includes("classical") || label.includes("theatre")) {
    return "classical-recital";
  }

  if (label.includes("anime") || label.includes("concert")) {
    return "anime-concert";
  }

  return program ? programToCategory[program] : "classical-recital";
}

function normalizeStatus(value: unknown): TourStatus {
  const status = stringValue(value).toLowerCase();

  if (status === "on-sale" || status === "upcoming" || status === "past") {
    return status;
  }

  return "upcoming";
}

export function normalizeSiteSettings(item: WixCollectionItem): NormalizedSiteSettings {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    siteName: stringValue(fields.siteName, "Castiglione Arts & Culture"),
    headerLogo: optionalString(fields.headerLogo),
    footerLogo: optionalString(fields.footerLogo),
    homepageHeroVideo: optionalString(fields.homepageHeroVideo),
    homepageHeroFallbackImage: optionalString(fields.homepageHeroFallbackImage),
    homepageHeroEyebrow: optionalString(fields.homepageHeroEyebrow),
    homepageHeroHeadline: optionalString(fields.homepageHeroHeadline),
    heroStats: parseHeroStats(fields.heroStatsJson ?? fields.heroStats),
    enquireButtonText: optionalString(fields.enquireButtonText),
    enquireButtonLink: optionalString(fields.enquireButtonLink),
    footerHeadline: optionalString(fields.footerHeadline),
    footerSubtext: optionalString(fields.footerSubtext),
    footerEmailPlaceholder: optionalString(fields.footerEmailPlaceholder),
    footerCopyright: optionalString(fields.footerCopyright),
    contactEmail: optionalString(fields.contactEmail),
    contactPhone: optionalString(fields.contactPhone),
    defaultSeoTitle: optionalString(fields.defaultSeoTitle),
    defaultSeoDescription: optionalString(fields.defaultSeoDescription),
  };
}

export function normalizeDesignSettings(item: WixCollectionItem): NormalizedDesignSettings {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    title: stringValue(fields.title, "Main Design Settings"),
    textScale: numberValue(fields.textScale, 1),
    headingScale: numberValue(fields.headingScale, 1),
    spacingScale: numberValue(fields.spacingScale, 1),
    themeMode: stringValue(fields.themeMode, "Default"),
    brandRed: stringValue(fields.brandRed, "#D94A28"),
    carbon: stringValue(fields.carbon, "#111111"),
    paper: stringValue(fields.paper, "#FFFFFF"),
    cream: stringValue(fields.cream, "#F5F1EA"),
    mutedText: stringValue(fields.mutedText, "rgba(17,17,17,0.58)"),
    customCssVariablesJson: stringValue(fields.customCssVariablesJson, "{}"),
    enableCustomTypographyOverrides: booleanValue(
      fields.enableCustomTypographyOverrides,
      false,
    ),
  };
}

export function normalizeProgramItem(item: WixCollectionItem): NormalizedProgram {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    title: stringValue(fields.title),
    slug: stringValue(fields.slug),
    description: optionalString(fields.description),
    heroImage: optionalString(fields.heroImage),
    order: numberValue(fields.order),
    isVisible: booleanValue(fields.isVisible, true),
  };
}

export function normalizeNavigationLink(item: WixCollectionItem): NormalizedNavigationLink {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    label: stringValue(fields.label),
    url: stringValue(fields.url, "#"),
    order: numberValue(fields.order),
    location: stringValue(fields.location, "Header"),
    isVisible: booleanValue(fields.isVisible, true),
    openNewTab: booleanValue(fields.openNewTab, false),
  };
}

export function normalizeSocialLink(item: WixCollectionItem): NormalizedSocialLink {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    platform: stringValue(fields.platform),
    icon: optionalString(fields.icon),
    url: stringValue(fields.url, "#"),
    order: numberValue(fields.order),
    location: stringValue(fields.location, "Footer"),
    isVisible: booleanValue(fields.isVisible, true),
    openNewTab: booleanValue(fields.openNewTab, true),
  };
}

export function normalizeEvent(item: WixCollectionItem): NormalizedEvent {
  const fields = getWixFields(item);
  const program = normalizeProgram(fields.program);
  const categoryLabel = stringValue(
    fields.categoryLabel ?? fields.programLabel ?? fields.program,
    program ? programToLabel[program] : "",
  );
  const category = normalizeCategory(program, categoryLabel);
  const slug = stringValue(fields.slug, "MANUAL");
  const ticketPrimaryUrl = optionalString(fields.ticketPrimaryUrl);
  const image = optionalString(fields.cardImage) ?? optionalString(fields.heroImage) ?? "";
  const dateLabel =
    formatPublicEventDate({
      startDate: optionalString(fields.startDate),
      endDate: optionalString(fields.endDate),
      fallback: optionalString(fields.eventCardDate ?? fields.displayDate),
    }) ?? stringValue(fields.eventCardDate ?? fields.displayDate);

  return {
    id: idOf(fields),
    category,
    title: stringValue(fields.title),
    date: stringValue(fields.sortDate ?? fields.startDate),
    dateLabel,
    cities: splitList(fields.eventCardCities),
    status: normalizeStatus(fields.status),
    image,
    href: slug && slug !== "MANUAL" ? `/tours/${slug}` : undefined,
    ticketLinks: ticketPrimaryUrl
      ? [
          {
            label: stringValue(fields.ticketPrimaryLabel, "BUY TICKETS"),
            href: ticketPrimaryUrl,
            status: "book-now",
          },
        ]
      : undefined,
    sourceUrl: optionalString(fields.sourceUrl),
    slug,
    program,
    programLabel: stringValue(fields.programLabel ?? fields.program, program ? programToLabel[program] : ""),
    categoryLabel,
    sortDate: stringValue(fields.sortDate),
    isFeaturedHome: booleanValue(fields.isFeaturedHome, false),
    isFeaturedProgram: booleanValue(fields.isFeaturedProgram, false),
    isVisible: booleanValue(fields.isVisible, true),
    seoTitle: optionalString(fields.seoTitle),
    seoDescription: optionalString(fields.seoDescription),
  };
}

export function normalizeTourDate(item: WixCollectionItem): NormalizedTourDate {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    event: stringValue(fields.event),
    showLabel: stringValue(fields.showLabel),
    date: stringValue(fields.displayDate ?? fields.date),
    displayDate: stringValue(fields.displayDate ?? fields.date),
    time: optionalString(fields.time),
    city: stringValue(fields.city),
    venue: stringValue(fields.venue),
    country: optionalString(fields.country),
    ticketLabel: stringValue(fields.ticketLabel, "BUY TICKETS"),
    ticketHref: stringValue(fields.ticketUrl, "#"),
    ticketStatus: optionalString(fields.ticketStatus),
    order: numberValue(fields.order, Number.MAX_SAFE_INTEGER),
    isVisible: booleanValue(fields.isVisible, true),
  };
}

export function normalizeEventVideo(item: WixCollectionItem): NormalizedEventVideo {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    event: stringValue(fields.event),
    title: stringValue(fields.title, "TRAILER VIDEO"),
    src: optionalMediaUrl(fields.videoFile),
    videoUrl: optionalMediaUrl(fields.videoUrl),
    posterImage: optionalMediaUrl(fields.posterImage),
    videoType: optionalString(fields.videoType),
    caption: optionalString(fields.caption),
    order: numberValue(fields.order),
    isVisible: booleanValue(fields.isVisible, true),
  };
}

export function normalizeEventGalleryImage(
  item: WixCollectionItem,
): NormalizedEventGalleryImage {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    event: stringValue(fields.event),
    src: optionalMediaUrl(fields.image) ?? "",
    alt: stringValue(fields.altText),
    caption: optionalString(fields.caption),
    credit: optionalString(fields.credit),
    order: numberValue(fields.order, Number.MAX_SAFE_INTEGER),
    isVisible: booleanValue(fields.isVisible, true),
  };
}

export function normalizePartner(item: WixCollectionItem): NormalizedPartner {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    name: stringValue(fields.name),
    logo: optionalMediaUrl(fields.logo),
    website: optionalString(fields.website),
    type: optionalString(fields.type),
    order: numberValue(fields.order, Number.MAX_SAFE_INTEGER),
    isVisible: booleanValue(fields.isVisible, true),
  };
}

export function normalizeVenue(item: WixCollectionItem): NormalizedVenue {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    venueName: stringValue(fields.venueName),
    city: optionalString(fields.city),
    country: optionalString(fields.country),
    address: optionalString(fields.address),
    website: optionalString(fields.website),
    mapUrl: optionalString(fields.mapUrl),
    isVisible: booleanValue(fields.isVisible, true),
  };
}

export function normalizeTestimonial(item: WixCollectionItem): NormalizedTestimonial {
  const fields = getWixFields(item);

  return {
    id: idOf(fields),
    quote: stringValue(fields.quote),
    name: stringValue(fields.name),
    title: optionalString(fields.title),
    company: optionalString(fields.company),
    logo: optionalMediaUrl(fields.logo),
    portraitImage: optionalMediaUrl(fields.portraitImage),
    relatedEvent: optionalString(fields.relatedEvent),
    relatedPartner: optionalString(fields.relatedPartner),
    order: numberValue(fields.order, Number.MAX_SAFE_INTEGER),
    isVisible: booleanValue(fields.isVisible, true),
  };
}

export function filterByLocation<T extends { location: string; isVisible: boolean; order: number }>(
  items: T[],
  location?: NavigationLocation | SocialLocation | string,
) {
  return items
    .filter((item) => item.isVisible)
    .filter((item) => (location ? item.location === location : true))
    .sort((first, second) => first.order - second.order);
}

export function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((first, second) => first.order - second.order);
}

export function sortEventsByDateDesc(events: NormalizedEvent[]) {
  return [...events].sort(
    (first, second) =>
      new Date(second.sortDate || second.date).getTime() -
      new Date(first.sortDate || first.date).getTime(),
  );
}
