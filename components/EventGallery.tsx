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

    const distance = scroller.clientWidth;

    scroller.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  }

  return (
    <div className="w-full max-w-[1040px]">
      <div className="mb-5 flex items-center justify-end gap-3">
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center border border-[rgba(17,17,17,0.38)] text-[#111111] transition-colors hover:border-[#111111]"
          aria-label="Previous gallery images"
          onClick={() => scrollGallery("left")}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center border border-[rgba(17,17,17,0.38)] text-[#111111] transition-colors hover:border-[#111111]"
          aria-label="Next gallery images"
          onClick={() => scrollGallery("right")}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-4 lg:gap-6"
      >
        {images.map((image) => (
          <figure
            key={image.src}
            className="w-full shrink-0 snap-start lg:w-[calc((100%_-_24px)_/_2)]"
          >
            <div className="relative aspect-video overflow-hidden bg-[#e7e0d6]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 508px, 100vw"
                className="object-cover"
              />
            </div>
            {image.caption ? (
              <figcaption className="mt-3 text-[12px] font-normal leading-[18px] text-[rgba(17,17,17,0.62)] antialiased">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}
