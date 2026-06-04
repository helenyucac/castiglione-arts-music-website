import { EventShowcase } from "@/components/EventShowcase";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { tourHighlights, tourTypeFilters } from "@/data/tours";

export default function ToursPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="mb-10 border-b border-black pb-8">
              <p className="max-w-5xl text-[clamp(2rem,4.5vw,5rem)] font-black leading-[0.96] tracking-normal">
                Explore our touring archive and current listings across anime
                concerts, gaming concerts, orchestral programs, and classical
                recital productions.
              </p>
            </div>

            <EventShowcase events={tourHighlights} filters={tourTypeFilters} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
