import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { TourCard } from "@/components/TourCard";
import { liveMusicFestivalProgramEvents } from "@/data/tours";

const musicFestivalDescription =
  "Explore Castiglione music festival programs across live music, Asian pop, and contemporary cultural experiences.";

export const metadata: Metadata = {
  title: "Program - Music Festival | Castiglione",
  description: musicFestivalDescription,
  openGraph: {
    title: "Program - Music Festival | Castiglione",
    description: musicFestivalDescription,
  },
  twitter: {
    title: "Program - Music Festival | Castiglione",
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
                PROGRAM / MUSIC FESTIVAL
              </p>
              <p className="max-w-none text-lg font-black leading-8 tracking-normal sm:text-xl lg:max-w-7xl lg:text-xl lg:leading-8 xl:text-2xl xl:leading-9">
                Explore music festival programs across live music, Asian pop, and
                contemporary cultural experiences.
              </p>
            </div>

            <div className="highlights-grid">
              {liveMusicFestivalProgramEvents.map((event) => (
                <TourCard key={event.id} tour={event} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
