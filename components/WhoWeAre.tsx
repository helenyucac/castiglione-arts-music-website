import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function WhoWeAre() {
  return (
    <section id="about" className="bg-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1760px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.42fr] lg:px-10">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="max-w-3xl text-[clamp(2.25rem,4.8vw,4.8rem)] font-black uppercase leading-[0.92] tracking-normal">
              Who We Are
            </h2>
          </div>
          <Link
            href="/partnerships"
            className="mt-8 inline-flex w-fit items-center gap-2 border border-black bg-black px-5 py-4 text-sm font-black uppercase text-white transition-colors hover:bg-[#ffcf33] hover:text-black"
          >
            Partner with us
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          <div className="space-y-5 text-lg leading-8">
            <p>
              Since its founding in Melbourne in 2015, Castiglione has developed
              touring productions for audiences across Australia and beyond,
              connecting global artists, beloved screen worlds, and major concert
              venues.
            </p>
            <p>
              Our work spans live orchestral anime and gaming concerts, master
              classical concerts, chamber music, and cross-cultural projects.
              Every tour is shaped through artist relationships, venue planning,
              production logistics, and a deep respect for the audience journey.
            </p>
            <p id="lucid-live">
              Through Lucid Live, we also support contemporary Asian pop and
              adjacent live music projects with the same touring discipline and
              audience-first care.
            </p>
          </div>

          <div className="relative min-h-[360px] overflow-hidden border border-black bg-black lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1000&q=80"
              alt="Concert crowd under stage lights"
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[#ffcf33] p-5 text-black">
              <p className="text-sm font-black uppercase tracking-normal">
                Touring production from Melbourne to major stages across the region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
