import { homeTourHighlights, type TourCardData } from "@/data/tours";
import { HomeWhatsOnShowcase } from "@/components/HomeWhatsOnShowcase";

const homepageProgramHighlights: TourCardData[] = [
  ...homeTourHighlights.filter(
    (event) => event.category !== "music-festival" && event.category !== "exhibitions",
  ),
  {
    id: "home-sonica-music-festival-2023",
    category: "music-festival",
    title: "Sonica Music Festival",
    date: "2023-03-01",
    dateLabel: "MAR 2023",
    cities: ["Melbourne"],
    status: "past",
    image: "/media/naruto-hero.jpg",
  },
  {
    id: "home-oddshapes-music-festival-2024",
    category: "music-festival",
    title: "Oddshapes Music Festival",
    date: "2024-10-01",
    dateLabel: "OCT 2024",
    cities: ["Melbourne"],
    status: "past",
    image: "/media/naruto-hero.jpg",
  },
  {
    id: "home-oddshapes-music-festival-2026",
    category: "music-festival",
    title: "Oddshapes Music Festival",
    date: "2026-03-01",
    dateLabel: "MAR 2026",
    cities: ["Melbourne"],
    status: "upcoming",
    image: "/media/naruto-hero.jpg",
  },
  {
    id: "home-leonardo-da-vinci-taipei",
    category: "exhibitions",
    title: "The Man Behind the Myth - Leonardo Da Vinci TAIPEI",
    date: "2022-12-01",
    dateLabel: "DEC 2022",
    cities: ["TAIPEI"],
    status: "past",
    image: "/media/our-touring-footprints.jpg",
  },
  {
    id: "home-marilyn-the-woman-behind-the-icon",
    category: "exhibitions",
    title: "Marilyn - The Woman Behind the Icon",
    date: "2023-07-01",
    dateLabel: "JUL 2023",
    cities: ["Sydney"],
    status: "past",
    image: "/media/our-touring-footprints.jpg",
  },
];

export function HighlightsSection() {
  return (
    <section id="whats-on" className="bg-[#f4f0ea] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 lg:mb-12">
          <p
            className="mb-6 text-xs font-semibold uppercase tracking-[0.36em] text-[#d24a37]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            CURRENT SEASON
          </p>
          <h2
            className="m-0 text-left text-[clamp(4rem,8vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.04em] text-[#111111] antialiased"
            style={{
              fontFamily:
                'Fraunces, Canela, "Canela Deck", "Cormorant Garamond", serif',
            }}
          >
            What&apos;s On
          </h2>
        </div>

        <HomeWhatsOnShowcase events={homepageProgramHighlights} />
      </div>
    </section>
  );
}
