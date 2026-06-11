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

      <div className="relative z-10 mx-auto flex min-h-[640px] w-full max-w-[1760px] items-end px-4 py-10 sm:min-h-[720px] sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="max-w-[980px] pb-4 sm:pb-6 lg:pb-8">
          <p
            className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-white sm:text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Global Stories · Local Stages
          </p>
          <h1
            className="text-balance text-[clamp(3.4rem,8vw,8.8rem)] font-light leading-[0.9] tracking-normal text-white"
            style={{
              fontFamily:
                'Canela, "Canela Deck", "Cormorant Garamond", Fraunces, serif',
            }}
          >
            <span className="block">Curating Global</span>
            <span className="block">Culture and Artistry.</span>
          </h1>
          <div className="mt-8 flex flex-col items-start gap-5">
            <SocialLinks className="justify-start" variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
