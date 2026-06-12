const hubs = [
  {
    eyebrow: "01 / HEADQUARTERS",
    city: "Melbourne",
    country: "Australia",
    footer: "Programming · Partnerships",
  },
  {
    eyebrow: "02 / REGIONAL HUB",
    city: "Singapore",
    country: "Singapore",
    footer: "Touring · Growth",
  },
  {
    eyebrow: "03 / GREATER CHINA OFFICE",
    city: "Hangzhou",
    country: "China",
    footer: "Market Development",
  },
];

export function OurHubs() {
  return (
    <section id="our-hubs" className="bg-[#f4f0ea] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
        <p
          className="mb-14 text-xs font-semibold uppercase tracking-[0.36em] text-[#d24a37] sm:mb-16 lg:mb-20"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          OUR HUBS
        </p>

        <div className="grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
          {hubs.map((hub) => (
            <article key={hub.city} className="flex min-h-[360px] flex-col md:min-h-[430px] lg:min-h-[500px]">
              <p
                className="mb-8 text-[11px] font-medium uppercase tracking-[0.28em] text-[rgba(17,17,17,0.45)] antialiased sm:mb-10"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {hub.eyebrow}
              </p>

              <div>
                <h2
                  className="m-0 p-0 text-[47.775px] font-normal leading-[47.775px] tracking-[-0.9555px] text-[#111111] antialiased"
                  style={{
                    fontFamily: 'Fraunces, "Cormorant Garamond", serif',
                  }}
                >
                  {hub.city}
                </h2>
                <p
                  className="mt-6 text-[12px] uppercase tracking-[0.28em] text-[rgba(17,17,17,0.45)] antialiased"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {hub.country}
                </p>
              </div>

              <div className="mt-10 border-t border-[rgba(17,17,17,0.08)] pt-4">
                <p
                  className="text-[13px] font-normal leading-[22.1px] text-[rgba(17,17,17,0.65)] antialiased"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {hub.footer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
