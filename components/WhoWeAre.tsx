import Link from "next/link";

const storyStats = [
  { value: "11", label: "Years", accent: true },
  { value: "15+", label: "Cities" },
  { value: "120+", label: "Productions" },
];

export function WhoWeAre() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-[1760px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.35fr_0.65fr] lg:gap-20 lg:px-10 xl:gap-28">
        <div>
          <p
            className="mb-7 text-xs font-semibold uppercase tracking-[0.36em] text-[#d24a37]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            OUR STORY
          </p>
          <h2
            className="m-0 text-left text-[54.6px] font-medium leading-[57.33px] tracking-[-1.092px] text-[#111111] antialiased"
            style={{ fontFamily: 'Fraunces, "Cormorant Garamond", serif' }}
          >
            <span className="block">Cultural</span>
            <span className="block">Journeys.</span>
          </h2>
        </div>

        <div className="pt-1 lg:pt-2">
          <p
            className="mb-14 max-w-5xl text-left text-[17px] font-normal leading-[29.75px] text-[rgba(17,17,17,0.75)] antialiased"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Since 2015, Castiglione Arts & Culture has connected artists,
            audiences and ideas across the Asia-Pacific. Through concerts,
            festivals and exhibitions, we create experiences that travel beyond
            borders and resonate within local communities.
          </p>

          <div className="border-t border-[rgba(17,17,17,0.08)] pt-10 sm:pt-12">
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {storyStats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className={`m-0 text-[clamp(3rem,5vw,4.4rem)] font-medium leading-none tracking-[-0.04em] antialiased ${
                      stat.accent ? "text-[#d24a37]" : "text-[rgba(17,17,17,0.28)]"
                    }`}
                    style={{ fontFamily: 'Fraunces, "Cormorant Garamond", serif' }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-2 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[rgba(17,17,17,0.45)] antialiased"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-12 inline-flex border-b border-[#111111] pb-2 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[#111111] antialiased transition-opacity duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-70"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
