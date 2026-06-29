import type { TourProgram } from "@/data/tours";
import { formatPublicDateRangeFromValues } from "@/lib/dateDisplay";
import { queryWixCollection, sortDesc } from "@/lib/wix/client";
import { getTourDates } from "@/lib/wix/eventDetails";
import { normalizeEvent, sortEventsByDateDesc } from "@/lib/wix/normalizers";
import type { NormalizedEvent } from "@/lib/wix/types";

const programLabels: Record<TourProgram, string> = {
  "anime-gaming-concerts": "Anime & Gaming Concerts",
  "classical-concert-theatre": "Classical Concerts & Theatre",
  "live-music-festival": "Live Music & Festivals",
  "touring-exhibition": "Touring Exhibitions",
};

async function withTourDateDisplayLabels(events: NormalizedEvent[]) {
  return Promise.all(
    events.map(async (event) => {
      try {
        const tourDates = await getTourDates(event.slug, event.id ? [event.id] : []);
        const tourDateLabel = formatPublicDateRangeFromValues(
          tourDates.map((tourDate) => tourDate.displayDate || tourDate.date),
        );

        return {
          ...event,
          dateLabel: tourDateLabel ?? event.dateLabel,
        };
      } catch {
        return event;
      }
    }),
  );
}

export async function getEvents() {
  const items = await queryWixCollection("Events", {
    sort: sortDesc("sortDate"),
    limit: 1000,
  });

  const events = items.map(normalizeEvent).filter((event) => event.isVisible);
  return sortEventsByDateDesc(await withTourDateDisplayLabels(events));
}

export async function getFeaturedHomeEvents() {
  const items = await queryWixCollection("Events", {
    filter: { isFeaturedHome: true },
    sort: sortDesc("sortDate"),
    limit: 1000,
  });

  const events = items
    .map(normalizeEvent)
    .filter((event) => event.isVisible)
    .filter((event) => event.isFeaturedHome);

  return sortEventsByDateDesc(await withTourDateDisplayLabels(events));
}

export async function getEventsByProgram(program: TourProgram | string) {
  const programLabel = programLabels[program as TourProgram] ?? program;
  const items = await queryWixCollection("Events", {
    filter: { isFeaturedProgram: true },
    sort: sortDesc("sortDate"),
    limit: 1000,
  });

  const events = items
    .map(normalizeEvent)
    .filter((event) => event.isVisible)
    .filter((event) => event.isFeaturedProgram)
    .filter((event) => event.program === program || event.programLabel === programLabel);

  return sortEventsByDateDesc(await withTourDateDisplayLabels(events));
}

export async function getEventBySlug(slug: string) {
  const items = await queryWixCollection("Events", {
    filter: { slug },
    limit: 1,
  });

  const event = items[0] ? normalizeEvent(items[0]) : null;
  return event?.isVisible ? event : null;
}
