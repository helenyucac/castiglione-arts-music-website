import { getTourProgram, type TourCardData, type TourProgram } from "@/data/tours";
import {
  homepageWhatsOnEvents,
  liveMusicFestivalProgramEvents,
  tourHighlights,
  touringExhibitionProgramEvents,
  whatsOnConcertEvents,
} from "@/data/tours";
import { isWixConfigured } from "@/lib/wix/client";
import { getEvents, getEventsByProgram, getFeaturedHomeEvents } from "@/lib/wix/events";
import { getPrograms } from "@/lib/wix/programs";
import type { NormalizedProgram } from "@/lib/wix/types";

export type ProgramCardData = {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  badgeColor: string;
  cmsSlugs: string[];
};

export const localProgramCards: ProgramCardData[] = [
  {
    number: "01",
    title: "Concert",
    description:
      "Classical recitals, contemporary dance, anime symphonies and gaming concerts — produced for the Asia-Pacific's most prestigious stages.",
    image:
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Dancer performing on a stage under warm lights",
    href: "/programs/concerts",
    badgeColor: "#d92525",
    cmsSlugs: ["concerts", "anime-gaming-concerts", "classical-concert-theatre"],
  },
  {
    number: "02",
    title: "Live Music & Festival",
    description:
      "Curating boutique festivals for Asian Pop and underground electronic scenes — including OddShapes and Sonica.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Outdoor music festival crowd at dusk",
    href: "/programs/music-festival",
    badgeColor: "#2563eb",
    cmsSlugs: ["music-festival", "live-music-festival"],
  },
  {
    number: "03",
    title: "Exhibition",
    description:
      "Large-scale immersive IP exhibitions and multimedia experiences brought to flagship cultural venues across the region.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Immersive exhibition with colorful light projections",
    href: "/programs/exhibitions",
    badgeColor: "#1f7a4d",
    cmsSlugs: ["exhibitions", "touring-exhibition"],
  },
];

function isUsableAsset(value?: string) {
  if (!value) {
    return false;
  }

  return !["MANUAL", "OPTIONAL", "UPLOAD TO WIX"].includes(value);
}

function slugFromHref(href?: string) {
  return href?.split("/").filter(Boolean).at(-1);
}

function buildLocalEventIndex(localEvents: TourCardData[]) {
  const byId = new Map<string, TourCardData>();
  const bySlug = new Map<string, TourCardData>();
  const byTitle = new Map<string, TourCardData>();

  localEvents.forEach((event) => {
    byId.set(event.id, event);
    byTitle.set(event.title.toLowerCase(), event);

    const slug = slugFromHref(event.href);
    if (slug) {
      bySlug.set(slug, event);
    }
  });

  return { byId, bySlug, byTitle };
}

function findLocalEvent(event: TourCardData, localEvents: TourCardData[]) {
  const index = buildLocalEventIndex(localEvents);
  const slug = slugFromHref(event.href);

  return (
    index.byId.get(event.id) ??
    (slug ? index.bySlug.get(slug) : undefined) ??
    index.byTitle.get(event.title.toLowerCase())
  );
}

function findDefaultLocalImage(event: TourCardData, localEvents: TourCardData[]) {
  const matchingCategory = localEvents.find((localEvent) => localEvent.category === event.category);
  const matchingProgram = localEvents.find(
    (localEvent) => getTourProgram(localEvent.category) === getTourProgram(event.category),
  );

  return matchingCategory?.image ?? matchingProgram?.image ?? localEvents[0]?.image ?? "";
}

function hydrateEventsWithLocalFallback(cmsEvents: TourCardData[], localEvents: TourCardData[]) {
  if (cmsEvents.length === 0) {
    return localEvents;
  }

  return cmsEvents.map((event) => {
    const localEvent = findLocalEvent(event, localEvents);

    return {
      ...event,
      id: event.id && event.id !== "manual-id" ? event.id : localEvent?.id ?? event.id,
      title: event.title || localEvent?.title || "",
      image: isUsableAsset(event.image)
        ? event.image
        : localEvent?.image ?? findDefaultLocalImage(event, localEvents),
      href: event.href ?? localEvent?.href,
      cities: event.cities.length > 0 ? event.cities : localEvent?.cities ?? [],
      dateLabel: event.dateLabel || localEvent?.dateLabel || event.date,
      date: event.date || localEvent?.date || "",
      ticketLinks: event.ticketLinks ?? localEvent?.ticketLinks,
      sourceUrl: event.sourceUrl ?? localEvent?.sourceUrl,
    };
  });
}

function hasRequiredListingEventFields(event: TourCardData) {
  return Boolean(
    event.id &&
      event.id !== "manual-id" &&
      event.title &&
      event.date &&
      event.dateLabel &&
      event.cities.length > 0 &&
      event.image &&
      getTourProgram(event.category),
  );
}

async function getCmsEventsWithFallback(
  request: () => Promise<TourCardData[]>,
  localEvents: TourCardData[],
) {
  if (!isWixConfigured()) {
    return localEvents;
  }

  try {
    const cmsEvents = await request();
    const hydratedEvents = hydrateEventsWithLocalFallback(cmsEvents, localEvents);

    if (hydratedEvents.length === 0 || !hydratedEvents.every(hasRequiredListingEventFields)) {
      return localEvents;
    }

    return hydratedEvents;
  } catch {
    return localEvents;
  }
}

function mergeProgramCardWithCms(localCard: ProgramCardData, cmsPrograms: NormalizedProgram[]) {
  const cmsProgram = cmsPrograms.find((program) => localCard.cmsSlugs.includes(program.slug));

  if (!cmsProgram) {
    return localCard;
  }

  return {
    ...localCard,
    description: cmsProgram.description ?? localCard.description,
    image:
      isUsableAsset(cmsProgram.heroImage) && cmsProgram.heroImage
        ? cmsProgram.heroImage
        : localCard.image,
    imageAlt: cmsProgram.title || localCard.imageAlt,
  };
}

export async function getHomepageProgramCards() {
  if (!isWixConfigured()) {
    return localProgramCards;
  }

  try {
    const cmsPrograms = await getPrograms();

    if (cmsPrograms.length === 0) {
      return localProgramCards;
    }

    return localProgramCards.map((program) => mergeProgramCardWithCms(program, cmsPrograms));
  } catch {
    return localProgramCards;
  }
}

export async function getHomepageWhatsOnEvents() {
  return getCmsEventsWithFallback(getFeaturedHomeEvents, homepageWhatsOnEvents);
}

export async function getToursArchiveEvents() {
  return getCmsEventsWithFallback(getEvents, tourHighlights);
}

export async function getConcertProgramEvents() {
  return getCmsEventsWithFallback(async () => {
    const [animeGamingEvents, classicalEvents] = await Promise.all([
      getEventsByProgram("anime-gaming-concerts"),
      getEventsByProgram("classical-concert-theatre"),
    ]);

    return [...animeGamingEvents, ...classicalEvents];
  }, whatsOnConcertEvents);
}

export async function getLiveMusicFestivalProgramEvents() {
  return getCmsEventsWithFallback(
    () => getEventsByProgram("live-music-festival"),
    liveMusicFestivalProgramEvents,
  );
}

export async function getTouringExhibitionProgramEvents() {
  return getCmsEventsWithFallback(
    () => getEventsByProgram("touring-exhibition"),
    touringExhibitionProgramEvents,
  );
}

export function filterConcertEvents(events: TourCardData[]) {
  return events.filter((event) => {
    const program = getTourProgram(event.category);
    return program === "anime-gaming-concerts" || program === "classical-concert-theatre";
  });
}

export function filterProgramEvents(events: TourCardData[], program: TourProgram) {
  return events.filter((event) => getTourProgram(event.category) === program);
}
