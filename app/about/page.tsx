import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

const footprintStats = [
  { value: "2015", label: "Founded in Melbourne" },
  { value: "12+", label: "Cities reached across the region" },
  { value: "3", label: "Core touring pillars" },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="pb-8 sm:pb-12">
              <p className="max-w-6xl text-[clamp(2rem,5vw,5.75rem)] font-black leading-[0.98] tracking-normal">
                Castiglione Arts & Music is an Australia-based touring
                production company creating culture-rich concert experiences for
                major venues, devoted audiences, and artists with a global voice.
              </p>
            </div>

            <section className="about-section-grid border-b border-black py-14 sm:py-20">
              <div>
                <h2 className="text-[clamp(3.2rem,7vw,7.4rem)] font-black uppercase leading-[0.84] tracking-normal">
                  Our Story
                </h2>
                <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8">
                  <p>
                    Since 2015, Castiglione has brought world-class musicians,
                    cultural productions, and distinctive live experiences to
                    Australian audiences. What began with classical touring has
                    grown into a broader production practice spanning recital
                    stages, orchestral anime concerts, gaming programs, and
                    cross-cultural live events.
                  </p>
                  <p>
                    The company works across artist relationships, venue
                    planning, touring logistics, and audience development. Its
                    role is to shape productions that feel precise on stage and
                    memorable from the first announcement to the final encore.
                  </p>
                  <p>
                    Castiglione continues to build bridges between international
                    artists, beloved cultural worlds, and Australia&apos;s diverse
                    music-loving communities.
                  </p>
                </div>
              </div>
              <div className="about-section-media">
                <Image
                  src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1600&q=80"
                  alt="Orchestra performing in a concert hall"
                  fill
                  sizes="(min-width: 1280px) 50vw, 100vw"
                  className="object-cover opacity-90"
                />
              </div>
            </section>

            <section className="about-section-grid py-14 sm:py-20">
              <div>
                <h2 className="text-[clamp(3.2rem,7vw,7.4rem)] font-black uppercase leading-[0.84] tracking-normal">
                  Touring Footprints
                </h2>
                <div className="mt-8 grid max-w-2xl border-y border-black sm:grid-cols-3">
                  {footprintStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border-b border-black py-6 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0"
                    >
                      <p className="text-4xl font-black uppercase leading-none">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm font-black uppercase leading-5 tracking-normal text-black/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8">
                  <p>
                    Castiglione has toured artists and productions across
                    Australia and beyond, working with major concert halls,
                    recital venues, orchestras, agencies, and creative partners.
                  </p>
                  <p>
                    Its footprint covers classical music, anime and gaming
                    orchestral concerts, and broader cultural touring, with a
                    focus on programs that can travel elegantly between cities,
                    venues, and audiences.
                  </p>
                </div>

                <Link
                  href="/tours"
                  className="group mt-10 inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-black underline underline-offset-8 transition-colors hover:text-[#8a6d56]"
                >
                  Explore tours
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
              <div className="about-section-media bg-[#fdf9ee]">
                <Image
                  src="/media/touring-map.png"
                  alt="Castiglione touring map"
                  fill
                  sizes="(min-width: 1280px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
