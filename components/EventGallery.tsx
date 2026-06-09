"use client";

import Image from "next/image";
import { useRef } from "react";
import type { EventGalleryImage } from "@/data/eventDetails";

type EventGalleryProps = {
  images: EventGalleryImage[];
};

export function EventGallery({ images }: EventGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollGallery(direction: "left" | "right") {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const distance = scroller.clientWidth * 0.8;

    scroller.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-end gap-3">
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-black text-black transition-colors hover:bg-black hover:text-white"
          aria-label="Previous gallery images"
          onClick={() => scrollGallery("left")}
        >
          <span aria-hidden="true">&lt;</span>
        </button>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-black text-black transition-colors hover:bg-black hover:text-white"
          aria-label="Next gallery images"
          onClick={() => scrollGallery("right")}
        >
          <span aria-hidden="true">&gt;</span>
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-4 sm:gap-6"
      >
        {images.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[4/5] w-[72vw] shrink-0 snap-start overflow-hidden bg-[#f8f8f3] sm:w-[42vw] lg:w-[25vw] xl:w-[21vw]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1280px) 21vw, (min-width: 1024px) 25vw, (min-width: 640px) 42vw, 72vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
