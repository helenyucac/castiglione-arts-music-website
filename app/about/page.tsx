import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

const aboutDescription =
  "Castiglione Arts & Culture is a touring production and exhibition company founded in Melbourne in 2015.";

export const metadata: Metadata = {
  title: "About Castiglione",
  description: aboutDescription,
  openGraph: {
    title: "About Castiglione",
    description: aboutDescription,
  },
  twitter: {
    title: "About Castiglione",
    description: aboutDescription,
  },
};

const displayFont = {
  fontFamily: 'Fraunces, Canela, "Canela Deck", "Cormorant Garamond", serif',
};

const headlineFont = {
  fontFamily: 'Fraunces, "Cormorant Garamond", serif',
};

const interFont = {
  fontFamily: "Inter, sans-serif",
};

const stats = [
  { value: "11", label: "Years", isAccent: true },
  { value: "12+", label: "Cities" },
  { value: "120", label: "Productions" },
];

const principles = [
  {
    number: "01",
    title: "Cultural fidelity",
    description:
      "Every production honours the artist's intent — preserved through rigorous artistic direction.",
  },
  {
    number: "02",
    title: "Operational excellence",
    description:
      "Logistics, technical production and audience experience held to international touring standards.",
  },
  {
    number: "03",
    title: "Local partnership",
    description:
      "We work with venues, councils and cultural institutions as creative collaborators, not vendors.",
  },
];

const milestones = [
  {
    year: "2015",
    title: "Founded in Melbourne",
    description:
      "Established as a boutique touring production company with a focus on classical recitals.",
  },
  {
    year: "2018",
    title: "Asia-Pacific expansion",
    description: "Opened Singapore office and produced first regional festival.",
  },
  {
    year: "2021",
    title: "Immersive exhibitions division",
    description:
      "Launched touring exhibitions vertical, partnering with global IP holders.",
  },
  {
    year: "2024",
    title: "Shanghai office",
    description:
      "Established Greater China operations for exhibitions and IP licensing.",
  },
  {
    year: "2026",
    title: "120+ productions",
    description:
      "Surpassed 120 productions across 12 cities and four continents.",
  },
];

const offices = [
  {
    eyebrow: "01 / Headquarters",
    city: "Melbourne",
    country: "Australia",
    footer: "Programming · Partnership",
  },
  {
    eyebrow: "02 / Regional Hub",
    city: "Singapore",
    country: "Singapore",
    footer: "Touring · Growth",
  },
  {
    eyebrow: "03 / Greater China Office",
    city: "Hangzhou",
    country: "China",
    footer: "Market Development",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] font-semibold uppercase leading-none tracking-[0.36em] text-[#d24a37] antialiased"
      style={interFont}
    >
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#f5f1ea] text-[#111111]">
        <section className="border-t border-[rgba(17,17,17,0.06)] pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <Eyebrow>About Castiglione</Eyebrow>
                <h1
                  className="mt-7 max-w-5xl text-[80.7px] font-medium leading-[82.314px] tracking-[-1.614px] text-[#111111] antialiased"
                  style={headlineFont}
                >
                  <span className="block">An institution</span>
                  <span className="block">for the global stage.</span>
                </h1>
              </div>

              <div className="lg:col-span-4 lg:col-start-9 lg:pt-9">
                <p
                  className="max-w-xl text-[15px] font-normal leading-[1.8] text-[rgba(17,17,17,0.72)] antialiased"
                  style={interFont}
                >
                  Castiglione Arts &amp; Culture is a touring production and
                  exhibition company founded in Melbourne in 2015. We curate the
                  journey of concerts, festivals and immersive experiences across
                  the world&apos;s most distinctive cultural venues.
                </p>
              </div>
            </div>

            <div className="relative mt-14 aspect-[16/7] min-h-[280px] overflow-hidden bg-[#ded8cf] sm:mt-16 lg:mt-20">
              <Image
                src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1800&q=82"
                alt="A quiet concert hall interior with tall windows"
                fill
                priority
                sizes="(min-width: 1280px) 92vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid w-full max-w-[1760px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
            <div className="lg:col-span-4">
              <Eyebrow>The Institution</Eyebrow>
              <h2
                className="mt-6 max-w-3xl text-[48px] font-medium leading-[48.96px] tracking-[-0.96px] text-[#111111] antialiased"
                style={headlineFont}
              >
                Global footprint,{" "}
                <span className="italic">local resonance.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div
                className="max-w-5xl space-y-5 text-[15px] font-normal leading-[1.85] text-[rgba(17,17,17,0.72)] antialiased"
                style={interFont}
              >
                <p>
                  Since 2015 we have redefined the touring landscape by bridging
                  Eastern and Western creative horizons. We don&apos;t simply host
                  events — we curate moments of profound cultural exchange
                  between cities, audiences and artists.
                </p>
                <p>
                  Our work spans the orchestral stages of Sydney and Melbourne,
                  the festival fields of Singapore, and the major exhibition
                  halls of Shanghai and Tokyo. Every programme is anchored in
                  artistic integrity and delivered with the operational discipline
                  of international touring.
                </p>
              </div>

              <div className="mt-12 grid max-w-4xl grid-cols-3 gap-8 border-t border-[rgba(17,17,17,0.08)] pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p
                      className={`text-[clamp(2.6rem,4.5vw,4.8rem)] font-normal leading-none tracking-[-0.05em] antialiased ${
                        stat.isAccent ? "text-[#d24a37]" : "text-black/25"
                      }`}
                      style={displayFont}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="mt-3 text-[10px] font-medium uppercase leading-none tracking-[0.28em] text-[rgba(17,17,17,0.45)] antialiased"
                      style={interFont}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f1ea] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3">
                <Eyebrow>Our Principles</Eyebrow>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <h2
                  className="max-w-5xl text-[48px] font-medium leading-[50.4px] tracking-[-0.96px] text-[#111111] antialiased"
                  style={headlineFont}
                >
                  Three commitments that shape every production.
                </h2>
              </div>
            </div>

            <div className="mt-12 grid border border-[rgba(17,17,17,0.14)] md:grid-cols-3">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="border-b border-[rgba(17,17,17,0.14)] px-8 py-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:px-10 lg:py-10"
                >
                  <p
                    className="text-[22px] font-normal leading-none text-[#d24a37] antialiased"
                    style={displayFont}
                  >
                    {principle.number}
                  </p>
                  <h3
                    className="mt-9 text-[21px] font-medium leading-tight tracking-[-0.02em] text-[#111111] antialiased"
                    style={displayFont}
                  >
                    {principle.title}
                  </h3>
                  <p
                    className="mt-4 max-w-md text-[14px] font-normal leading-[1.8] text-[rgba(17,17,17,0.66)] antialiased"
                    style={interFont}
                  >
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid w-full max-w-[1760px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
            <div className="lg:col-span-3">
              <Eyebrow>Milestones</Eyebrow>
            </div>

            <div className="lg:col-span-8 lg:col-start-4">
              <h2
                className="text-[48px] font-medium leading-[50.4px] tracking-[-0.96px] text-[#111111] antialiased"
                style={headlineFont}
              >
                Eleven years on the road.
              </h2>

              <div className="mt-14 border-b border-[rgba(17,17,17,0.08)]">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.year}
                    className="grid gap-5 border-t border-[rgba(17,17,17,0.08)] py-8 md:grid-cols-12 md:gap-8"
                  >
                    <p
                      className="text-[30px] font-normal leading-none text-[#d24a37] antialiased md:col-span-2"
                      style={displayFont}
                    >
                      {milestone.year}
                    </p>
                    <h3
                      className="text-[19px] font-medium leading-snug tracking-[-0.02em] text-[#111111] antialiased md:col-span-4"
                      style={displayFont}
                    >
                      {milestone.title}
                    </h3>
                    <p
                      className="text-[14px] font-normal leading-[1.8] text-[rgba(17,17,17,0.58)] antialiased md:col-span-6"
                      style={interFont}
                    >
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f1ea] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3">
                <Eyebrow>Global Presence</Eyebrow>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <h2
                  className="max-w-5xl text-[48px] font-medium leading-[50.4px] tracking-[-0.96px] text-[#111111] antialiased"
                  style={headlineFont}
                >
                  Four offices across the Asia-Pacific.
                </h2>
              </div>
            </div>

            <div className="mt-12 grid border border-[rgba(17,17,17,0.12)] md:grid-cols-2 lg:grid-cols-4">
              {offices.map((office) => (
                <article
                  key={office.city}
                  className="min-h-[250px] border-b border-[rgba(17,17,17,0.12)] p-8 md:border-r lg:border-b-0"
                >
                  <p
                    className="text-[10px] font-medium uppercase leading-none tracking-[0.28em] text-[rgba(17,17,17,0.45)] antialiased"
                    style={interFont}
                  >
                    {office.eyebrow}
                  </p>
                  <h3
                    className="mt-12 text-[47.775px] font-normal leading-[47.775px] tracking-[-0.9555px] text-[#111111] antialiased"
                    style={{ fontFamily: 'Fraunces, "Cormorant Garamond", serif' }}
                  >
                    {office.city}
                  </h3>
                  <p
                    className="mt-4 text-[11px] font-medium uppercase leading-none tracking-[0.28em] text-[rgba(17,17,17,0.45)] antialiased"
                    style={interFont}
                  >
                    {office.country}
                  </p>
                  <p
                    className="mt-12 border-t border-[rgba(17,17,17,0.08)] pt-4 text-[13px] font-normal leading-[22.1px] text-[rgba(17,17,17,0.65)] antialiased"
                    style={interFont}
                  >
                    {office.footer}
                  </p>
                </article>
              ))}

              <div className="min-h-[250px] bg-[#d8d5cf]" aria-hidden="true" />
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/partnerships"
                className="inline-flex border border-[#111111] px-8 py-4 text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-[#111111] antialiased transition-colors duration-150 hover:bg-[#111111] hover:text-white"
                style={interFont}
              >
                Work with us →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
