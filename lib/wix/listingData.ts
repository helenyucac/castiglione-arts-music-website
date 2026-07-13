import { getTourProgram, type TourCardData, type TourProgram } from "@/data/tours";
import {
  homepageWhatsOnEvents,
  liveMusicFestivalProgramEvents,
  tourHighlights,
  touringExhibitionProgramEvents,
  whatsOnConcertEvents,
} from "@/data/tours";
import { formatPublicDateDisplay } from "@/lib/dateDisplay";
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

export type ProgramLandingPageText = {
  eyebrow: string;
  heading: string;
  viewAllLabel: string;
  primaryFilterLabel: string;
  secondaryFilterLabel: string;
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

export function resolveCmsListingEventsForRuntime(cmsEvents: TourCardData[]) {
  return cmsEvents.map((event) => ({
    ...event,
    dateLabel: formatPublicDateDisplay(event.dateLabel || event.date) ?? event.dateLabel,
  }));
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
    return resolveCmsListingEventsForRuntime(cmsEvents);
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

export async function getProgramLandingPageText(
  cmsSlugs: string[],
  fallback: ProgramLandingPageText,
) {
  if (!isWixConfigured()) {
    return fallback;
  }

  try {
    const cmsPrograms = await getPrograms();
    const cmsProgram = cmsPrograms.find((program) => cmsSlugs.includes(program.slug));

    if (!cmsProgram) {
      return fallback;
    }

    return {
      eyebrow: cmsProgram.pageEyebrow ?? fallback.eyebrow,
      heading: cmsProgram.pageHeading ?? fallback.heading,
      viewAllLabel: cmsProgram.viewAllLabel ?? fallback.viewAllLabel,
      primaryFilterLabel: cmsProgram.primaryFilterLabel ?? fallback.primaryFilterLabel,
      secondaryFilterLabel: cmsProgram.secondaryFilterLabel ?? fallback.secondaryFilterLabel,
    };
  } catch {
    return fallback;
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
