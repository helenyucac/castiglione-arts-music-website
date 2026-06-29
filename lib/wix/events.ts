import type { TourProgram } from "@/data/tours";
import { queryWixCollection, sortDesc } from "@/lib/wix/client";
import { normalizeEvent, sortEventsByDateDesc } from "@/lib/wix/normalizers";

const programLabels: Record<TourProgram, string> = {
  "anime-gaming-concerts": "Anime & Gaming Concerts",
  "classical-concert-theatre": "Classical Concerts & Theatre",
  "live-music-festival": "Live Music & Festivals",
  "touring-exhibition": "Touring Exhibitions",
};

export async function getEvents() {
  const items = await queryWixCollection("Events", {
    sort: sortDesc("sortDate"),
    limit: 1000,
  });

  return sortEventsByDateDesc(items.map(normalizeEvent).filter((event) => event.isVisible));
}

export async function getFeaturedHomeEvents() {
  const items = await queryWixCollection("Events", {
    filter: { isFeaturedHome: true },
    sort: sortDesc("sortDate"),
    limit: 1000,
  });

  return sortEventsByDateDesc(
    items
      .map(normalizeEvent)
      .filter((event) => event.isVisible)
      .filter((event) => event.isFeaturedHome),
  );
}

export async function getEventsByProgram(program: TourProgram | string) {
  const programLabel = programLabels[program as TourProgram] ?? program;
  const items = await queryWixCollection("Events", {
    filter: { isFeaturedProgram: true },
    sort: sortDesc("sortDate"),
    limit: 1000,
  });

  return sortEventsByDateDesc(
    items
      .map(normalizeEvent)
      .filter((event) => event.isVisible)
      .filter((event) => event.isFeaturedProgram)
      .filter((event) => event.program === program || event.programLabel === programLabel),
  );
}

export async function getEventBySlug(slug: string) {
  const items = await queryWixCollection("Events", {
    filter: { slug },
    limit: 1,
  });

  const event = items[0] ? normalizeEvent(items[0]) : null;
  return event?.isVisible ? event : null;
}
