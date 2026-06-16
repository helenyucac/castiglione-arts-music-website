import { homeTourHighlights } from "@/data/tours";
import { HomeWhatsOnShowcase } from "@/components/HomeWhatsOnShowcase";

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

        <HomeWhatsOnShowcase events={homeTourHighlights} />
      </div>
    </section>
  );
}
