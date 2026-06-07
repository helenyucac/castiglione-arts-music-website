import { ArrowUpRight, Play } from "lucide-react";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";

type HeroVideoProps = {
  videoSrc?: string;
  posterSrc: string;
};

export function HeroVideo({ videoSrc, posterSrc }: HeroVideoProps) {
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

      <div className="relative z-10 mx-auto flex min-h-[640px] w-full max-w-[1760px] flex-col justify-between px-4 py-8 sm:min-h-[720px] sm:px-6 lg:px-10">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-normal sm:text-sm">
          <span className="grid size-9 place-items-center rounded-full border border-white/80">
            <Play aria-hidden="true" size={15} fill="currentColor" />
          </span>
          Touring production / Australia
        </div>

        <div className="max-w-6xl pb-4">
          <p className="mb-5 text-sm font-black uppercase tracking-normal text-[#ffcf33] sm:text-base">
            Live orchestral anime, gaming concerts and classic concerts
          </p>
          <h1 className="text-balance max-w-5xl text-[clamp(3.2rem,9vw,9.4rem)] font-black uppercase leading-[0.82] tracking-normal">
            Castiglione
          </h1>
          <div className="mt-8 max-w-4xl">
            <p className="max-w-2xl text-lg leading-7 text-white/90 sm:text-xl">
              Australia-based touring production for culture-rich live concerts,
              built for major halls, devoted audiences, and unforgettable nights.
            </p>
            <div className="mt-6 flex flex-col items-start gap-5">
              <Link
                href="#tours"
                className="inline-flex w-fit items-center gap-2 border border-white px-5 py-4 text-sm font-black uppercase transition-colors hover:bg-white hover:text-black"
              >
                View Highlights
                <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
              <SocialLinks className="justify-start" variant="hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
