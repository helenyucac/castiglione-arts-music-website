import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BRAND_COLORS } from "@/data/siteSettings";
import type { TourCardData, TourCategory } from "@/data/tours";

export type WhatsOnDisplayCategory =
  | "concert-theatre"
  | "live-music-festival"
  | "touring-exhibition";

type WhatsOnEventCardProps = {
  event: TourCardData;
  displayCategory?: WhatsOnDisplayCategory;
};

const categoryLabels: Record<WhatsOnDisplayCategory, string> = {
  "concert-theatre": "Concert & Theatre",
  "live-music-festival": "Live Music & Festival",
  "touring-exhibition": "Touring Exhibition",
};

const categoryColors: Record<WhatsOnDisplayCategory, string> = {
  "concert-theatre": "#c74736",
  "live-music-festival": "#3567e8",
  "touring-exhibition": "#3f835c",
};

const eventTitleStyle = {
  fontFamily: "Inter, sans-serif",
  "--event-title-hover-color": BRAND_COLORS.red,
} as CSSProperties & Record<"--event-title-hover-color", string>;

function getDisplayCategory(category: TourCategory): WhatsOnDisplayCategory | null {
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

function getEventLabel(category: TourCategory, displayCategory: WhatsOnDisplayCategory) {
  if (category === "music-festival") {
    return "Music Festival";
  }

  if (category === "lucid") {
    return "Lucid Live";
  }

  return categoryLabels[displayCategory];
}

export function getWhatsOnDisplayCategory(category: TourCategory) {
  return getDisplayCategory(category);
}

export function WhatsOnEventCard({ event, displayCategory }: WhatsOnEventCardProps) {
  const resolvedCategory = displayCategory ?? getDisplayCategory(event.category);

  if (!resolvedCategory) {
    return null;
  }

  return (
    <Link href={event.href ?? "#"} className="group block">
      <article>
        <div className="relative overflow-hidden bg-[#e7e0d6]" style={{ aspectRatio: "4 / 5" }}>
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
              style={{ backgroundColor: categoryColors[resolvedCategory] }}
            />
            <p
              className="text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[rgba(17,17,17,0.55)] antialiased"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {getEventLabel(event.category, resolvedCategory)}
            </p>
          </div>

          <h3
            className="text-[20px] font-medium leading-[27.5px] tracking-[-0.1px] text-[#111111] antialiased transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-[var(--event-title-hover-color)]"
            style={eventTitleStyle}
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
}
