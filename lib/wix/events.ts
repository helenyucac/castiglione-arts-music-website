import type { TourProgram } from "@/data/tours";
import { queryWixCollection, sortDesc, visibleFilter } from "@/lib/wix/client";
import { normalizeEvent, sortEventsByDateDesc } from "@/lib/wix/normalizers";

const programLabels: Record<TourProgram, string> = {
  "anime-gaming-concerts": "Anime & Gaming Concerts",
  "classical-concert-theatre": "Classical Concerts & Theatre",
  "live-music-festival": "Live Music & Festivals",
  "touring-exhibition": "Touring Exhibitions",
};

export async function getEvents() {
  const items = await queryWixCollection("Events", {
    filter: visibleFilter(),
    sort: sortDesc("sortDate"),
  });

  return sortEventsByDateDesc(items.map(normalizeEvent));
}

export async function getFeaturedHomeEvents() {
  const items = await queryWixCollection("Events", {
    filter: visibleFilter({ isFeaturedHome: true }),
    sort: sortDesc("sortDate"),
  });

  return sortEventsByDateDesc(items.map(normalizeEvent));
}

export async function getEventsByProgram(program: TourProgram | string) {
  const programLabel = programLabels[program as TourProgram] ?? program;
  const items = await queryWixCollection("Events", {
    filter: visibleFilter({
      program: programLabel,
      isFeaturedProgram: true,
    }),
    sort: sortDesc("sortDate"),
  });

  return sortEventsByDateDesc(items.map(normalizeEvent));
}

export async function getEventBySlug(slug: string) {
  const items = await queryWixCollection("Events", {
    filter: visibleFilter({ slug }),
    limit: 1,
  });

  return items[0] ? normalizeEvent(items[0]) : null;
}
