import Image from "next/image";
import Link from "next/link";
import { getHomepageProgramCards } from "@/lib/wix/listingData";

export async function ProgramsSection() {
  const programs = await getHomepageProgramCards();

  return (
    <section id="programs" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
        <div className="mb-14 sm:mb-[4.5rem] lg:mb-20">
          <p
            className="mb-6 text-xs font-semibold uppercase tracking-[0.36em] text-[#e43d24]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            OUR HIGHLIGHTS
          </p>
          <h2
            className="m-0 text-left text-[clamp(3.5rem,9vw,5.11875rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[#111111] antialiased sm:whitespace-nowrap lg:text-[81.9px] lg:leading-[80.262px] lg:tracking-[-2.0475px]"
            style={{
              fontFamily:
                'Fraunces, Canela, "Canela Deck", "Cormorant Garamond", serif',
            }}
          >
            Stories. Stages. Experiences.
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-12">
          {programs.map((program) => (
            <Link key={program.number} href={program.href} className="group block">
              <article>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f8f3]">
                  <Image
                    src={program.image}
                    alt={program.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 80vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  />
                  <span
                    className="absolute left-0 top-0 px-4 py-3 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-white antialiased"
                    style={{
                      backgroundColor: program.badgeColor,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {program.number}
                  </span>
                </div>

                <div className="pt-8">
                  <h3
                    className="mb-3 cursor-pointer text-left text-[20px] font-medium leading-[27.5px] tracking-[-0.1px] text-[#111111] antialiased transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-[rgba(17,17,17,0.65)]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {program.title}
                  </h3>
                  <p
                    className="text-left text-[14px] font-normal leading-[24.5px] text-[rgba(17,17,17,0.65)] antialiased"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {program.description}
                  </p>
                  <p
                    className="mt-8 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[#111111] antialiased transition-opacity duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-70"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    EXPLORE →
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
