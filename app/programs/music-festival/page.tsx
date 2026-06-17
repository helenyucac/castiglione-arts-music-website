import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ProgramEventFilter } from "@/components/ProgramEventFilter";
import { liveMusicFestivalProgramEvents } from "@/data/tours";

const musicFestivalDescription =
  "Explore Castiglione music festival programs across live music, Asian pop, and contemporary cultural experiences.";

const liveMusicFilters = [
  { label: "Lucid Live", value: "lucid" },
  { label: "Music Festival", value: "music-festival" },
] as const;

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

export default function ProgramMusicFestivalPage() {
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
                PROGRAM / LIVE MUSIC & FESTIVAL
              </p>
              <p className="max-w-none text-lg font-black leading-8 tracking-normal sm:text-xl lg:max-w-7xl lg:text-xl lg:leading-8 xl:text-2xl xl:leading-9">
                Explore music festival programs across live music, Asian pop, and
                contemporary cultural experiences.
              </p>
            </div>

            <ProgramEventFilter
              events={liveMusicFestivalProgramEvents}
              filters={liveMusicFilters}
              defaultFilter="lucid"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
