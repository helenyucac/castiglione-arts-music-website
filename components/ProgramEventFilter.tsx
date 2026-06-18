"use client";

import { useMemo, useState } from "react";
import type { TourCardData, TourCategory } from "@/data/tours";
import { WhatsOnEventCard } from "@/components/WhatsOnEventCard";

type ProgramEventFilterProps = {
  events: TourCardData[];
  filters: readonly { label: string; value: TourCategory }[];
  defaultFilter: TourCategory;
};

function sortEventsByDateDesc(events: TourCardData[]) {
  return [...events].sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
}

export function ProgramEventFilter({ events, filters, defaultFilter }: ProgramEventFilterProps) {
  const [activeFilter, setActiveFilter] = useState<TourCategory>(defaultFilter);

  const visibleEvents = useMemo(() => {
    return sortEventsByDateDesc(events.filter((event) => event.category === activeFilter));
  }, [activeFilter, events]);

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
          {filters.map((filter) => {
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
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibleEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {visibleEvents.map((event) => (
            <WhatsOnEventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="border-t border-[#d8d2c8] py-10 text-sm font-semibold uppercase tracking-[2.2px] text-[rgba(17,17,17,0.55)]">
          No programs are currently listed for this view.
        </div>
      )}
    </div>
  );
}
