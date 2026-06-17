import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WhatsOnEventCard } from "@/components/WhatsOnEventCard";
import { touringExhibitionProgramEvents } from "@/data/tours";

const exhibitionsDescription =
  "Explore Castiglione exhibition programs across touring cultural exhibitions and immersive experiences.";

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

            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {touringExhibitionProgramEvents.map((event) => (
                <WhatsOnEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
