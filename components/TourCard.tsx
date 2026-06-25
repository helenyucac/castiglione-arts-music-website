import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BRAND_COLORS } from "@/data/siteSettings";
import {
  getTourProgram,
  tourCategoryColors,
  tourCategoryLabels,
  tourProgramLabels,
  type TourCardData,
} from "@/data/tours";

type TourCardProps = {
  tour: TourCardData;
};

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

const eventTitleHoverStyle = {
  "--event-title-hover-color": BRAND_COLORS.red,
} as CSSProperties & Record<"--event-title-hover-color", string>;

export function TourCard({ tour }: TourCardProps) {
  const accentColor = tourCategoryColors[tour.category];
  const program = getTourProgram(tour.category);
  const categoryLabel = program ? tourProgramLabels[program] : tourCategoryLabels[tour.category];
  const softenedAccentColor = hexToRgba(accentColor, 0.7);
  const details = `${tour.dateLabel} / ${tour.cities.join(", ")}`;

  return (
    <Link href={tour.href ?? "#"} className="block h-full" aria-label={tour.title}>
      <article
        className="tour-card group flex h-full flex-col overflow-hidden border border-black bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(17,17,17,0.12)]"
        style={eventTitleHoverStyle}
      >
        <div className="tour-card-media relative shrink-0 overflow-hidden bg-black">
          <Image
            src={tour.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div
          className="tour-card-info flex flex-1 flex-col justify-between"
          style={{
            backgroundColor: softenedAccentColor,
            color: "#111111",
          }}
        >
          <div>
            <p className="tour-card-category break-words font-black uppercase tracking-normal opacity-80">
              {categoryLabel}
            </p>
            <h3 className="tour-card-title mt-3 break-words font-black uppercase leading-none tracking-normal transition-colors duration-300 group-hover:text-[var(--event-title-hover-color)] sm:mt-5">
              {tour.title}
            </h3>
          </div>

          <div
            className="mt-4 flex items-end justify-between gap-2 border-t pt-3 sm:mt-8 sm:gap-4 sm:pt-4"
            style={{ borderTopColor: "rgba(0,0,0,0.3)" }}
          >
            <p className="tour-card-details break-words font-bold uppercase tracking-normal">
              {details}
            </p>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-6"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
