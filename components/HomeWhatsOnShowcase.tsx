"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { TourCardData, TourCategory } from "@/data/tours";

type HomeFilter = "all" | "concert-theatre" | "music-festival" | "touring-exhibition";

type HomeCategory = Exclude<HomeFilter, "all">;

type HomeWhatsOnShowcaseProps = {
  events: TourCardData[];
};

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_COUNT = 8;

const homeFilters: { label: string; value: HomeFilter }[] = [
  { label: "All Programs", value: "all" },
  { label: "Concert & Theatre", value: "concert-theatre" },
  { label: "Music Festival", value: "music-festival" },
  { label: "Touring Exhibition", value: "touring-exhibition" },
];

const homeCategoryLabels: Record<HomeCategory, string> = {
  "concert-theatre": "Concert & Theatre",
  "music-festival": "Music Festival",
  "touring-exhibition": "Touring Exhibition",
};

const homeCategoryColors: Record<HomeCategory, string> = {
  "concert-theatre": "#c74736",
  "music-festival": "#3567e8",
  "touring-exhibition": "#3f835c",
};

function getHomeCategory(category: TourCategory): HomeCategory | null {
  if (
    category === "anime-concert" ||
    category === "gaming-concert" ||
    category === "classical-recital"
  ) {
    return "concert-theatre";
  }

  if (category === "music-festival") {
    return "music-festival";
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
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleEvents.map((event) => {
            const homeCategory = getHomeCategory(event.category);

            if (!homeCategory) {
              return null;
            }

            return (
              <Link key={event.id} href={event.href ?? "#"} className="group block">
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#e7e0d6]">
                    <Image
                      src={event.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                    />
                  </div>

                  <div className="pt-6">
                    <div className="mb-4 flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0"
                        style={{ backgroundColor: homeCategoryColors[homeCategory] }}
                      />
                      <p
                        className="text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[rgba(17,17,17,0.55)] antialiased"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {homeCategoryLabels[homeCategory]}
                      </p>
                    </div>

                    <h3
                      className="text-[20px] font-medium leading-[27.5px] tracking-[-0.1px] text-[#111111] antialiased transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-[rgba(17,17,17,0.65)]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {event.title}
                    </h3>

                    <div className="mt-7">
                      <p
                        className="mb-2 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[#111111] antialiased"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {event.dateLabel}
                      </p>
                      <p
                        className="text-[11px] font-semibold uppercase leading-[18px] tracking-[2.2px] text-[rgba(17,17,17,0.52)] antialiased"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {event.cities.join(" · ")}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            );
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
