import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { TourCard } from "@/components/TourCard";
import type { TourCardData } from "@/data/tours";

const exhibitionsDescription =
  "Explore Castiglione exhibition programs across touring cultural exhibitions and immersive experiences.";

const exhibitionEvents: TourCardData[] = [
  {
    id: "leonardo-da-vinci-taipei",
    category: "exhibitions",
    title: "The Man Behind the Myth - Leonardo Da Vinci TAIPEI",
    date: "2022-12-01",
    dateLabel: "DEC 2022",
    cities: ["TAIPEI"],
    status: "past",
    image: "/media/our-touring-footprints.jpg",
  },
  {
    id: "marilyn-the-woman-behind-the-icon",
    category: "exhibitions",
    title: "Marilyn - The Woman Behind the Icon",
    date: "2023-07-01",
    dateLabel: "JUL 2023",
    cities: ["Sydney"],
    status: "past",
    image: "/media/our-touring-footprints.jpg",
  },
];

export const metadata: Metadata = {
  title: "Program - Exhibitions | Castiglione",
  description: exhibitionsDescription,
  openGraph: {
    title: "Program - Exhibitions | Castiglione",
    description: exhibitionsDescription,
  },
  twitter: {
    title: "Program - Exhibitions | Castiglione",
    description: exhibitionsDescription,
  },
};

export default function ProgramExhibitionsPage() {
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
                PROGRAM / EXHIBITIONS
              </p>
              <p className="max-w-none text-lg font-black leading-8 tracking-normal sm:text-xl lg:max-w-7xl lg:text-xl lg:leading-8 xl:text-2xl xl:leading-9">
                Explore touring exhibitions and immersive cultural experiences
                presented for major cities and audiences.
              </p>
            </div>

            <div className="highlights-grid">
              {exhibitionEvents.map((event) => (
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
