"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { homeTourFilters, type TourCardData, type TourFilter } from "@/data/tours";
import { TourCard } from "@/components/TourCard";
import { WhatsOnEventCard } from "@/components/WhatsOnEventCard";

type EventShowcaseFilterValue = TourFilter | "all";

type EventShowcaseProps = {
  events: TourCardData[];
  filters?: { label: string; value: EventShowcaseFilterValue }[];
  limit?: number;
  showViewMore?: boolean;
  cardVariant?: "tour" | "whats-on";
};

function sortEventsByDateDesc(events: TourCardData[]) {
  return [...events].sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
}

function filterEvents(events: TourCardData[], filter: EventShowcaseFilterValue) {
  if (filter === "all") {
    return events;
  }

  if (filter === "whats-on") {
    return events.filter((event) => event.status === "on-sale" || event.status === "upcoming");
  }

  if (filter === "past") {
    return events.filter((event) => event.status === "past");
  }

  if (
    filter === "anime-concert" ||
    filter === "gaming-concert" ||
    filter === "classical-recital" ||
    filter === "exhibitions" ||
    filter === "music-festival" ||
    filter === "lucid"
  ) {
    return events.filter((event) => event.category === filter);
  }

  return events;
}

export function EventShowcase({
  events,
  filters = homeTourFilters,
  limit,
  showViewMore = false,
  cardVariant = "tour",
}: EventShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<EventShowcaseFilterValue | null>(
    filters[0]?.value === "all" ? "all" : null,
  );

  const visibleEvents = useMemo(() => {
    const filteredEvents = activeFilter ? filterEvents(events, activeFilter) : events;
    const sortedEvents = sortEventsByDateDesc(filteredEvents);

    return typeof limit === "number" ? sortedEvents.slice(0, limit) : sortedEvents;
  }, [activeFilter, events, limit]);

  return (
    <div>
      <div className="event-filter-list mb-10 flex flex-wrap">
        {filters.map((filter) => {
          const isActive = filter.value === activeFilter;

          return (
            <button
              key={filter.value}
              type="button"
              className={`p-0 text-left text-xs font-black uppercase tracking-normal underline-offset-8 transition duration-200 focus:outline-none focus-visible:underline sm:text-sm ${
                isActive
                  ? "text-black/50 underline decoration-2"
                  : "text-black hover:text-black/50 hover:underline"
              }`}
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {visibleEvents.length > 0 ? (
        <div
          className={
            cardVariant === "whats-on"
              ? "grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
              : "highlights-grid"
          }
        >
          {visibleEvents.map((tour) => (
            cardVariant === "whats-on" ? (
              <WhatsOnEventCard key={tour.id} event={tour} />
            ) : (
              <TourCard key={tour.id} tour={tour} />
            )
          ))}
        </div>
      ) : (
        <div className="border border-black bg-[#fdf9ee] p-8 text-lg font-bold">
          No events match this filter yet.
        </div>
      )}

      {showViewMore ? (
        <div className="mt-10">
          <Link
            href="/tours"
            className="group inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-black underline underline-offset-8 transition-colors hover:text-[#8a6d56]"
          >
            View more event
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
