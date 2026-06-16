import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { TourCard } from "@/components/TourCard";
import type { TourCardData } from "@/data/tours";

const musicFestivalDescription =
  "Explore Castiglione music festival programs across live music, Asian pop, and contemporary cultural experiences.";

const musicFestivalEvents: TourCardData[] = [
  {
    id: "sonica-music-festival-2023",
    category: "music-festival",
    title: "Sonica Music Festival",
    date: "2023-03-01",
    dateLabel: "MAR 2023",
    cities: ["Melbourne"],
    status: "past",
    image: "/media/naruto-hero.jpg",
  },
  {
    id: "oddshapes-music-festival-2024",
    category: "music-festival",
    title: "Oddshapes Music Festival",
    date: "2024-10-01",
    dateLabel: "OCT 2024",
    cities: ["Melbourne"],
    status: "past",
    image: "/media/naruto-hero.jpg",
  },
  {
    id: "oddshapes-music-festival-2026",
    category: "music-festival",
    title: "Oddshapes Music Festival",
    date: "2026-03-01",
    dateLabel: "MAR 2026",
    cities: ["Melbourne"],
    status: "upcoming",
    image: "/media/naruto-hero.jpg",
  },
];

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
        <section className="bg-white py-14 sm:py-20 lg:py-24">
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
              {musicFestivalEvents.map((event) => (
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
