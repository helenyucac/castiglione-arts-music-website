import type { Metadata } from "next";
import { EventShowcase } from "@/components/EventShowcase";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { getLiveMusicFestivalProgramEvents, getProgramLandingPageText } from "@/lib/wix/listingData";

const musicFestivalDescription =
  "Explore Castiglione music festival programs across live music, Asian pop, and contemporary cultural experiences.";

export const metadata: Metadata = {
  title: "Program - Live Music & Festival | Castiglione",
  description: musicFestivalDescription,
  openGraph: {
    title: "Program - Live Music & Festival | Castiglione",
    description: musicFestivalDescription,
  },
  twitter: {
    title: "Program - Live Music & Festival | Castiglione",
    description: musicFestivalDescription,
  },
};

export default async function ProgramMusicFestivalPage() {
  const [events, pageText] = await Promise.all([
    getLiveMusicFestivalProgramEvents(),
    getProgramLandingPageText(["music-festival", "live-music-festival"], {
      eyebrow: "PROGRAM / LIVE MUSIC & FESTIVAL",
      heading:
        "Explore music festival programs across live music, Asian pop, and contemporary cultural experiences.",
      viewAllLabel: "VIEW ALL",
      primaryFilterLabel: "LUCID LIVE",
      secondaryFilterLabel: "MUSIC FESTIVALS",
    }),
  ]);
  const liveMusicFilters = [
    { label: pageText.viewAllLabel, value: "all" },
    { label: pageText.primaryFilterLabel, value: "lucid-live" },
    { label: pageText.secondaryFilterLabel, value: "music-festivals" },
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
              events={events}
              filters={liveMusicFilters}
              cardVariant="whats-on"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
