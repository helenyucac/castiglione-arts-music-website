import type { Metadata } from "next";
import { EventShowcase } from "@/components/EventShowcase";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { tourHighlights, type TourCardData, type TourCategory } from "@/data/tours";

const concertsDescription =
  "Explore Castiglione concert programs across anime concerts, gaming concerts, classical concerts, and Lucid Live projects.";

const concertCategories: TourCategory[] = [
  "anime-concert",
  "gaming-concert",
  "classical-recital",
  "lucid",
];

const concertEvents: TourCardData[] = tourHighlights.filter((event) =>
  concertCategories.includes(event.category),
);

const concertFilters: { label: string; value: "all" | TourCategory }[] = [
  { label: "All", value: "all" },
  { label: "Anime Concerts", value: "anime-concert" },
  { label: "Gaming Concerts", value: "gaming-concert" },
  { label: "Classical Concerts", value: "classical-recital" },
  { label: "Lucid Live", value: "lucid" },
];

export const metadata: Metadata = {
  title: "Program - Concerts | Castiglione",
  description: concertsDescription,
  openGraph: {
    title: "Program - Concerts | Castiglione",
    description: concertsDescription,
  },
  twitter: {
    title: "Program - Concerts | Castiglione",
    description: concertsDescription,
  },
};

export default function ProgramConcertsPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="mb-10 border-b border-black pb-8">
              <p
                className="mb-5 text-[11px] font-black uppercase leading-none tracking-[2.2px] text-[rgba(17,17,17,0.55)] antialiased"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                PROGRAM / CONCERTS
              </p>
              <p className="max-w-none text-lg font-black leading-8 tracking-normal sm:text-xl lg:max-w-7xl lg:text-xl lg:leading-8 xl:text-2xl xl:leading-9">
                Explore concert programs across anime concerts, gaming concerts,
                classical concerts, and Lucid Live projects.
              </p>
            </div>

            <EventShowcase events={concertEvents} filters={concertFilters} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
