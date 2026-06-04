import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { tourCategoryLabels, type TourCardData } from "@/data/tours";

type TourCardProps = {
  index: number;
  tour: TourCardData;
};

const CARD_PALETTE = ["#f9f9f9", "#fdf9ee"];

export function TourCard({ index, tour }: TourCardProps) {
  const accentColor = CARD_PALETTE[index % CARD_PALETTE.length];
  const details = `${tour.dateLabel} / ${tour.cities.join(", ")}`;

  return (
    <Link href={tour.href ?? "#"} className="block h-full" aria-label={tour.title}>
      <article className="tour-card group flex h-full flex-col overflow-hidden border border-black bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(17,17,17,0.12)]">
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
          className="tour-card-info flex flex-1 flex-col justify-between text-[#111111]"
          style={{
            backgroundColor: accentColor,
          }}
        >
          <div>
            <p className="tour-card-category break-words font-black uppercase tracking-normal opacity-80">
              {tourCategoryLabels[tour.category]}
            </p>
            <h3 className="tour-card-title mt-3 break-words font-black uppercase leading-none tracking-normal sm:mt-5">
              {tour.title}
            </h3>
          </div>

          <div className="mt-4 flex items-end justify-between gap-2 border-t border-black/30 pt-3 sm:mt-8 sm:gap-4 sm:pt-4">
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
