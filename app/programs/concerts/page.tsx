import type { Metadata } from "next";
import { EventShowcase } from "@/components/EventShowcase";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { getConcertProgramEvents, getProgramLandingPageText } from "@/lib/wix/listingData";

const concertsDescription =
  "Explore Castiglione concert programs across anime concerts, gaming concerts, and classical concerts.";

export const metadata: Metadata = {
  title: "Program - Concert | Castiglione",
  description: concertsDescription,
  openGraph: {
    title: "Program - Concert | Castiglione",
    description: concertsDescription,
  },
  twitter: {
    title: "Program - Concert | Castiglione",
    description: concertsDescription,
  },
};

export default async function ProgramConcertsPage() {
  const [concertEvents, pageText] = await Promise.all([
    getConcertProgramEvents(),
    getProgramLandingPageText(["concerts", "anime-gaming-concerts", "classical-concert-theatre"], {
      eyebrow: "PROGRAM / CONCERT",
      heading:
        "Explore concert programs across anime concerts, gaming concerts, and classical concerts.",
      viewAllLabel: "VIEW ALL",
      primaryFilterLabel: "ANIME & GAMING CONCERTS",
      secondaryFilterLabel: "CLASSICAL CONCERTS & THEATRE",
    }),
  ]);
  const concertProgramFilters = [
    { label: pageText.viewAllLabel, value: "all" },
    { label: pageText.primaryFilterLabel, value: "anime-gaming-concerts" },
    { label: pageText.secondaryFilterLabel, value: "classical-concerts-theatre" },
  ] as const;

  return (
    <>
      <Navigation />
      <main>
        <section className="bg-[#f5f1ea] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="mb-10 border-b border-black pb-8">
              <p
                className="mb-5 text-[11px] font-black uppercase leading-none tracking-[2.2px] text-[rgba(17,17,17,0.55)] antialiased"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {pageText.eyebrow}
              </p>
              <p className="max-w-none text-lg font-black leading-8 tracking-normal sm:text-xl lg:max-w-7xl lg:text-xl lg:leading-8 xl:text-2xl xl:leading-9">
                {pageText.heading}
              </p>
            </div>

            <EventShowcase
              events={concertEvents}
              filters={concertProgramFilters}
              cardVariant="whats-on"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
