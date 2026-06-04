import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="border-b border-black pb-10">
              <h1 className="max-w-5xl text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-[0.82] tracking-normal">
                Contact Us
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 sm:text-xl">
                For touring enquiries, artist opportunities, venue partnerships,
                and season updates, send us a note or join the Castiglione mail
                list.
              </p>
            </div>

            <div className="grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:py-16">
              <aside className="border-t border-black pt-6">
                <h2 className="text-3xl font-black uppercase leading-none tracking-normal">
                  Office
                </h2>
                <address className="mt-6 max-w-md text-lg not-italic leading-8">
                  Level 2 Alfred Deakin Building
                  <br />
                  Flinders Street
                  <br />
                  Melbourne 3000
                </address>
                <p className="mt-8 max-w-md text-base font-bold leading-7 text-black/65">
                  This preview form is prepared for front-end review. A production
                  submission endpoint or mailing list provider can be connected
                  before launch.
                </p>
              </aside>

              <section className="border-t border-black pt-6">
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
