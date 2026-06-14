import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PartnershipForm } from "@/components/PartnershipForm";
import { PartnershipTabs } from "@/components/PartnershipTabs";

const partnershipsDescription =
  "We collaborate with artists, rights holders, brands and cultural institutions to create extraordinary experiences across the Asia-Pacific.";

export const metadata: Metadata = {
  title: "Partnerships | Castiglione",
  description: partnershipsDescription,
  openGraph: {
    title: "Partnerships | Castiglione",
    description: partnershipsDescription,
  },
  twitter: {
    title: "Partnerships | Castiglione",
    description: partnershipsDescription,
  },
};

const interFont = {
  fontFamily: "Inter, sans-serif",
};

const displayFont = {
  fontFamily: 'Fraunces, Canela, "Canela Deck", "Cormorant Garamond", serif',
};

export default function PartnershipsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#f5f1ea] text-[#111111]">
        <section className="border-t border-[rgba(17,17,17,0.06)] pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
          <div className="mx-auto grid w-full max-w-[1540px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
            <div className="lg:col-span-7">
              <p
                className="m-0 mb-7 p-0 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[rgb(217,74,40)] antialiased"
                style={interFont}
              >
                Partnership
              </p>
              <h1
                className="m-0 max-w-6xl text-[clamp(4.6rem,8.5vw,8.75rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#111111] antialiased"
                style={displayFont}
              >
                <span className="block">Let&apos;s build</span>
                <span className="block">
                  <span className="italic">experiences</span> together.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              <p
                className="m-0 max-w-[420px] text-[15px] font-normal leading-[24.375px] text-[rgba(17,17,17,0.75)] antialiased"
                style={interFont}
              >
                We collaborate with artists, rights holders, brands and cultural
                institutions to create extraordinary experiences across the
                Asia-Pacific.
              </p>
            </div>
          </div>
        </section>

        <PartnershipTabs />
        <PartnershipForm />
      </main>
      <Footer />
    </>
  );
}
