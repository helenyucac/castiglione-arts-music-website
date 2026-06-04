import { tourHighlights } from "@/data/tours";
import { EventShowcase } from "@/components/EventShowcase";

export function HighlightsSection() {
  return (
    <section id="tours" className="border-y border-black bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
        <div className="mb-8 border-b border-black pb-8 lg:mb-10">
          <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-normal">
            Highlights
          </h2>
        </div>

        <EventShowcase events={tourHighlights} limit={12} showViewMore />
      </div>
    </section>
  );
}
