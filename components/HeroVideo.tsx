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

      <div className="relative z-10 mx-auto flex min-h-[640px] w-full max-w-[1760px] flex-col justify-between px-4 py-10 text-left sm:min-h-[720px] sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <p
          className="pt-16 text-xs font-bold uppercase tracking-[0.28em] text-white sm:pt-20 sm:text-sm lg:pt-24"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Global Stories · Local Stages
        </p>

        <div className="flex max-w-[760px] flex-col items-start pb-4 sm:pb-6 lg:pb-8">
          <h1
            className="max-w-[18ch] text-left text-[clamp(2.35rem,4vw,4.5rem)] font-light leading-[0.96] tracking-normal text-white"
            style={{
              fontFamily:
                'Canela, "Canela Deck", "Cormorant Garamond", Fraunces, serif',
            }}
          >
            <span className="block whitespace-nowrap">Curating Global</span>
            <span className="block whitespace-nowrap">Culture and Artistry.</span>
          </h1>
          <div className="mt-8 flex flex-col items-start gap-5">
            <SocialLinks className="justify-start" variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
