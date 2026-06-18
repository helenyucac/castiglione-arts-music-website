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
  fontFamily: 'Fraunces, "Cormorant Garamond", serif',
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
                className="m-0 max-w-[738.914px] p-0 text-[81.9px] font-medium leading-[83.538px] tracking-[-1.638px] text-[rgb(17,17,17)] antialiased"
                style={displayFont}
              >
                <span className="block">Let&apos;s build</span>
                <span className="flex flex-wrap items-baseline gap-x-[0.26em]">
                  <span className="italic">experiences</span>
                  <span>together.</span>
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
