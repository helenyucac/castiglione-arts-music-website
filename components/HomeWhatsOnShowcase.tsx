"use client";

import { useMemo, useState } from "react";
import type { TourCardData, TourCategory } from "@/data/tours";
import { getWhatsOnDisplayCategory, WhatsOnEventCard } from "@/components/WhatsOnEventCard";

type HomeFilter = "all" | "concert-theatre" | "live-music-festival" | "touring-exhibition";

type HomeCategory = Exclude<HomeFilter, "all">;

type HomeWhatsOnShowcaseProps = {
  events: TourCardData[];
};

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_COUNT = 8;

const homeFilters: { label: string; value: HomeFilter }[] = [
  { label: "All Programs", value: "all" },
  { label: "Concert & Theatre", value: "concert-theatre" },
  { label: "Live Music & Festival", value: "live-music-festival" },
  { label: "Touring Exhibition", value: "touring-exhibition" },
];

function getHomeCategory(category: TourCategory): HomeCategory | null {
  if (
    category === "anime-concert" ||
    category === "gaming-concert" ||
    category === "classical-recital"
  ) {
    return "concert-theatre";
  }

  if (category === "music-festival" || category === "lucid") {
    return "live-music-festival";
  }

  if (category === "exhibitions") {
    return "touring-exhibition";
  }

  return null;
}

function sortEventsByDateDesc(events: TourCardData[]) {
  return [...events].sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
}

function filterEvents(events: TourCardData[], activeFilter: HomeFilter) {
  if (activeFilter === "all") {
    return events;
  }

  return events.filter((event) => getHomeCategory(event.category) === activeFilter);
}

export function HomeWhatsOnShowcase({ events }: HomeWhatsOnShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<HomeFilter>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const filteredEvents = useMemo(() => {
    return sortEventsByDateDesc(filterEvents(events, activeFilter));
  }, [activeFilter, events]);

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const hasMoreEvents = visibleCount < filteredEvents.length;

  return (
    <div>
      <div className="mb-12 border-b border-[#d8d2c8]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <p
            className="pb-6 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[rgba(17,17,17,0.48)] antialiased"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            VIEW:
          </p>
          {homeFilters.map((filter) => {
            const isActive = filter.value === activeFilter;

            return (
              <button
                key={filter.value}
                type="button"
                className={`border-b pb-6 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] antialiased transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isActive
                    ? "border-[#d24a37] text-[#111111]"
                    : "border-transparent text-[rgba(17,17,17,0.45)] hover:text-[#111111]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveFilter(filter.value);
                  setVisibleCount(INITIAL_VISIBLE_COUNT);
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibleEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {visibleEvents.map((event) => {
            const homeCategory = getWhatsOnDisplayCategory(event.category);

            if (!homeCategory) {
              return null;
            }

            return <WhatsOnEventCard key={event.id} event={event} displayCategory={homeCategory} />;
          })}
        </div>
      ) : (
        <div className="border-t border-[#d8d2c8] py-10 text-sm font-semibold uppercase tracking-[2.2px] text-[rgba(17,17,17,0.55)]">
          No programs are currently listed for this view.
        </div>
      )}

      {hasMoreEvents ? (
        <div className="mt-14">
          <button
            type="button"
            className="text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[#111111] underline underline-offset-8 antialiased transition-opacity duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-70"
            style={{ fontFamily: "Inter, sans-serif" }}
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
          >
            View More Event
          </button>
        </div>
      ) : null}
    </div>
  );
}
