const stats = [
  { value: "2015", label: "Founded in Melbourne" },
  { value: "12+", label: "Cities reached worldwide" },
  { value: "4", label: "Major touring regions" },
  { value: "10+", label: "Years of artist and production experience" },
];

const milestones = [
  {
    year: "2015",
    title: "First recital foundations",
    description: "Classical touring roots begin with recital-led projects in Australia.",
  },
  {
    year: "2017",
    title: "Oceania and Asia reach",
    description: "Piano tours connect audiences across Australia, New Zealand, and Taiwan.",
  },
  {
    year: "2024",
    title: "Anime and gaming scale",
    description: "Symphonic screen-world concerts expand into major Australian venues.",
  },
  {
    year: "Now",
    title: "A broader live portfolio",
    description: "Classic concerts, cinematic concerts, and Lucid Live projects move in parallel.",
  },
];

export function PathTravelled() {
  return (
    <section className="bg-[#111111] py-14 text-white sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-normal text-[#00a896]">
              Touring footprints
            </p>
            <h2 className="max-w-4xl text-[clamp(2.25rem,4.8vw,4.8rem)] font-black uppercase leading-[0.92] tracking-normal">
              The Path We&apos;ve Travelled
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80">
              From Australia to New Zealand, Southeast Asia, Taiwan, and the
              United States, our tours are curated so audiences feel welcomed
              into performances of international calibre.
            </p>
          </div>

          <div>
            <div className="grid grid-cols-2 border border-white md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="min-h-40 border-b border-r border-white p-4 last:border-r-0 md:border-b-0">
                  <p className="text-4xl font-black uppercase leading-none text-[#ffcf33] sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-sm font-bold uppercase leading-5 tracking-normal text-white/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {milestones.map((item) => (
                <article key={item.year} className="border border-white/60 p-5">
                  <p className="text-sm font-black uppercase tracking-normal text-[#ffcf33]">
                    {item.year}
                  </p>
                  <h3 className="mt-4 text-2xl font-black uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-7 text-white/75">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
