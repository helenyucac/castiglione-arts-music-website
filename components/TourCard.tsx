import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cardTitleHoverClassName, cardTitleHoverStyle } from "@/components/cardHoverStyles";
import { formatPublicDateDisplay } from "@/lib/dateDisplay";
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

export function TourCard({ tour }: TourCardProps) {
  const accentColor = tourCategoryColors[tour.category];
  const program = getTourProgram(tour.category);
  const categoryLabel = program ? tourProgramLabels[program] : tourCategoryLabels[tour.category];
  const softenedAccentColor = hexToRgba(accentColor, 0.7);
  const displayDate = formatPublicDateDisplay(tour.dateLabel) ?? tour.dateLabel;
  const details = `${displayDate} / ${tour.cities.join(", ")}`;
  const hasHref = Boolean(tour.href && tour.href !== "#");
  const articleClassName = `tour-card flex h-full flex-col overflow-hidden border border-black bg-white ${
    hasHref ? "group" : ""
  }`;

  const cardContent = (
      <article
        className={articleClassName}
        style={cardTitleHoverStyle}
      >
        <div className="tour-card-media relative shrink-0 overflow-hidden bg-black">
          <Image
            src={tour.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover"
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
            <h3 className={`tour-card-title mt-3 break-words font-black uppercase leading-none tracking-normal sm:mt-5 ${cardTitleHoverClassName}`}>
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
              className="size-4 shrink-0 sm:size-6"
            />
          </div>
        </div>
      </article>
  );

  if (!hasHref) {
    return <div className="block h-full">{cardContent}</div>;
  }

  return (
    <Link href={tour.href as string} className="group block h-full" aria-label={tour.title}>
      {cardContent}
    </Link>
  );
}
