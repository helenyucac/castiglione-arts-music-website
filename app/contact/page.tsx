import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

const contactDescription =
  "Contact Castiglione for touring enquiries, artist opportunities, venue partnerships, and season updates.";

export const metadata: Metadata = {
  title: "Castiglione",
  description: contactDescription,
  openGraph: {
    title: "Castiglione",
    description: contactDescription,
  },
  twitter: {
    title: "Castiglione",
    description: contactDescription,
  },
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="pb-10">
              <h1 className="max-w-5xl text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-[0.82] tracking-normal">
                Contact Us
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 sm:text-xl">
                For touring enquiries, artist opportunities, venue partnerships,
                and season updates, send us a note or join the Castiglione mail
                list.
              </p>
              <div className="mt-10 border-t border-black" aria-hidden="true" />
            </div>

            <div className="py-12 lg:py-16">
              <section className="max-w-5xl">
                <h2 className="mb-8 text-3xl font-black uppercase leading-none tracking-normal">
                  Contact / Mailing List
                </h2>
                <ContactForm />
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
