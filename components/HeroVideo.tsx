import { BRAND_COLORS, siteSettings } from "@/data/siteSettings";
import type { NormalizedHeroStat } from "@/lib/wix/types";

type HeroVideoProps = {
  videoSrc?: string;
  posterSrc: string;
  eyebrow?: string;
  headline?: string;
  heroStats?: NormalizedHeroStat[];
};

function getHeadlineLines(headline: string) {
  const lines = headline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 0 ? lines : ["Curating Global", "Culture and Artistry."];
}

export function HeroVideo({
  videoSrc,
  posterSrc,
  eyebrow = "Global Stories · Local Stages",
  headline = "Curating Global\nCulture and Artistry.",
  heroStats = [...siteSettings.heroStats],
}: HeroVideoProps) {
  const headlineLines = getHeadlineLines(headline);

  return (
    <section className="relative min-h-[640px] overflow-hidden bg-black text-white sm:min-h-[720px]">
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            className="size-full object-cover"
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div
            className="size-full bg-cover bg-center"
            style={{ backgroundImage: `url(${posterSrc})` }}
            role="img"
            aria-label="Concert stage with orchestra lighting"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
        <div className="media-grain absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[640px] w-full max-w-[1760px] flex-col justify-between px-4 py-10 text-left sm:min-h-[720px] sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <p
          className="pt-16 text-xs font-bold uppercase tracking-[0.28em] text-white sm:pt-20 sm:text-sm lg:pt-24"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {eyebrow}
        </p>

        <div className="flex max-w-[760px] flex-col items-start pb-4 sm:pb-6 lg:pb-8">
          <h1
            className="max-w-[18ch] text-left text-[clamp(2.35rem,4vw,4.5rem)] font-light leading-[0.96] tracking-normal text-white"
            style={{
              fontFamily:
                'Fraunces, Canela, "Canela Deck", "Cormorant Garamond", serif',
            }}
          >
            {headlineLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>
          <p
            className="mt-8 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[3.08px] text-[rgba(255,255,255,0.9)] antialiased"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {heroStats.map((stat, index) => (
              <span key={`${stat.value}-${stat.label}`}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                <span style={{ color: BRAND_COLORS.red }}>{stat.value}</span>{" "}
                <span>{stat.label}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
