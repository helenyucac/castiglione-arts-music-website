"use client";

import { useEffect, useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const attemptedPlaybackReasons = useRef<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncReducedMotionPreference() {
      setPrefersReducedMotion(mediaQuery.matches);
    }

    syncReducedMotionPreference();
    mediaQuery.addEventListener("change", syncReducedMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncReducedMotionPreference);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || prefersReducedMotion) {
      return;
    }

    attemptedPlaybackReasons.current.clear();

    async function tryPlay(reason: string) {
      if (!video || attemptedPlaybackReasons.current.has(reason)) {
        return;
      }

      attemptedPlaybackReasons.current.add(reason);
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("webkit-playsinline", "true");

      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    }

    function handleLoadedMetadata() {
      void tryPlay("loadedmetadata");
    }

    function handleCanPlay() {
      void tryPlay("canplay");
    }

    function handlePageShow() {
      void tryPlay("pageshow");
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void tryPlay("visibilitychange");
      }
    }

    function handleWeixinBridgeReady() {
      void tryPlay("WeixinJSBridgeReady");
    }

    void tryPlay("mount");
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("WeixinJSBridgeReady", handleWeixinBridgeReady);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("WeixinJSBridgeReady", handleWeixinBridgeReady);
    };
  }, [prefersReducedMotion, videoSrc]);

  async function handleTapToPlay() {
    const video = videoRef.current;

    if (!video || prefersReducedMotion) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    try {
      await video.play();
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <section className="relative min-h-[640px] overflow-hidden bg-black text-white sm:min-h-[720px]">
      <div className="absolute inset-0">
        {videoSrc ? (
          <>
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                isPlaying || prefersReducedMotion ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden="true"
            />
            <video
              ref={videoRef}
              className={`size-full object-cover transition-opacity duration-300 ${
                isPlaying || prefersReducedMotion ? "opacity-100" : "opacity-0"
              }`}
              src={videoSrc}
              autoPlay={!prefersReducedMotion}
              muted
              loop
              playsInline
              preload="auto"
              onPlaying={() => setIsPlaying(true)}
              onPause={() => {
                if (!document.hidden) {
                  setIsPlaying(false);
                }
              }}
              {...{ "webkit-playsinline": "true" }}
            />
            {!isPlaying && !prefersReducedMotion ? (
              <button
                type="button"
                className="absolute inset-0 z-[5] cursor-pointer bg-transparent"
                aria-label="Play hero video"
                onClick={handleTapToPlay}
              />
            ) : null}
          </>
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
            className="w-full max-w-full text-left text-[clamp(2.75rem,13vw,3.5rem)] font-light leading-[0.98] tracking-normal text-white sm:max-w-[18ch] sm:text-[clamp(2.35rem,4vw,4.5rem)] sm:leading-[0.96]"
            style={{
              fontFamily:
                'Fraunces, Canela, "Canela Deck", "Cormorant Garamond", serif',
            }}
          >
            {headlineLines.map((line) => (
              <span key={line} className="block whitespace-normal sm:whitespace-nowrap">
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
