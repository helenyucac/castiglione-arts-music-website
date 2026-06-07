import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PartnershipForm } from "@/components/PartnershipForm";

const partnershipsDescription =
  "For venue partners, presenters, sponsors, IP producers, rights holders, and cultural organisations interested in building touring projects with Castiglione.";

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

export default function PartnershipsPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="pb-10">
              <h1 className="max-w-5xl text-[clamp(2.6rem,6vw,5.6rem)] font-black uppercase leading-[0.92] tracking-normal">
                Partnerships
              </h1>
              <p className="mt-8 max-w-4xl text-lg leading-8 sm:text-xl">
                For venue partners, presenters, sponsors, IP producers, rights
                holders, and cultural organisations interested in building
                touring projects with Castiglione.
              </p>
              <div className="mt-10 border-t border-black" aria-hidden="true" />
            </div>

            <div className="py-12 lg:py-16">
              <section className="max-w-5xl">
                <h2 className="mb-8 text-xl font-black uppercase leading-none tracking-normal sm:text-2xl">
                  Partnership Enquiry
                </h2>
                <PartnershipForm />
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
