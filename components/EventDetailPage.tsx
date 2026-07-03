import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WhatsOnEventCard } from "@/components/WhatsOnEventCard";
import type { EventDetailData } from "@/data/eventDetails";
import { formatPublicDateDisplay } from "@/lib/dateDisplay";

type EventDetailPageProps = {
  event: EventDetailData;
};

const eyebrowStyle = {
  fontFamily: "Inter, sans-serif",
};

const displayStyle = {
  fontFamily: 'Fraunces, "Cormorant Garamond", serif',
};

const sectionEyebrowClass =
  "m-0 p-0 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[#d94a28] antialiased";

const tourDateMonthIndexes: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

function getTourDateTimestamp(date: string) {
  const match = date.match(
    /^(\d{1,2})\s+([A-Z]{3})\s+(\d{4})(?:,\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM))?/i,
  );

  if (!match) {
    const timestamp = Date.parse(date);
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  const [, day, month, year, hourRaw, minuteRaw, meridiemRaw] = match;
  const monthIndex = tourDateMonthIndexes[month.toUpperCase()] ?? 0;
  let hour = hourRaw ? Number(hourRaw) : 0;
  const minute = minuteRaw ? Number(minuteRaw) : 0;
  const meridiem = meridiemRaw?.toUpperCase();

  if (meridiem === "PM" && hour < 12) {
    hour += 12;
  }

  if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }

  return new Date(Number(year), monthIndex, Number(day), hour, minute).getTime();
}

function getPrimaryCtaHref(event: EventDetailData) {
  return event.primaryCtaLabel.toLowerCase().includes("ticket")
    ? "#tour-dates"
    : event.primaryCtaHref;
}

export function EventDetailPage({ event }: EventDetailPageProps) {
  const heroTitleOffsetClass = event.heroTitleOffset ? "lg:mt-14" : "";
  const galleryImages = event.galleryImages ?? [];
  const primaryCtaHref = getPrimaryCtaHref(event);
  const sortedTourDates = [...event.tourDates].sort(
    (firstDate, secondDate) =>
      getTourDateTimestamp(firstDate.date) - getTourDateTimestamp(secondDate.date),
  );

  return (
    <>
      <Navigation />
      <main className="bg-[#f5f1ea] text-[#111111]">
        <section className="border-b border-[rgba(17,17,17,0.06)] py-5">
          <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-10">
            {event.breadcrumb.map((item, index) => (
              <span
                key={item}
                className="text-[10px] font-semibold uppercase leading-none tracking-[2.2px] text-[rgba(17,17,17,0.52)] antialiased"
                style={eyebrowStyle}
              >
                {index > 0 ? <span className="mx-2 text-[rgba(17,17,17,0.28)]">/</span> : null}
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start lg:gap-24">
              <div>
                <div className="mb-7">
                  <p className={sectionEyebrowClass} style={eyebrowStyle}>
                    <span className="mr-2 inline-block size-2 bg-[#d94a28]" aria-hidden="true" />
                    {event.categoryLabel}
                  </p>
                </div>
                <h1
                  className={`m-0 w-full max-w-[732.25px] p-0 text-[clamp(44px,6vw,68.25px)] font-medium leading-[1.04] tracking-[-0.02em] text-[#111111] antialiased lg:w-[732.25px] lg:text-[68.25px] lg:leading-[70.98px] lg:tracking-[-1.365px] ${heroTitleOffsetClass}`}
                  style={displayStyle}
                >
                  {event.title}
                </h1>
                {event.intro ? (
                  <p
                    className="mt-8 mb-0 w-full max-w-[576px] p-0 text-[17px] font-normal leading-[27.625px] text-[rgba(17,17,17,0.75)] antialiased lg:w-[576px]"
                    style={eyebrowStyle}
                  >
                    {event.intro}
                  </p>
                ) : null}
              </div>

              <aside className="w-full max-w-[460px] bg-[#FBEDE9] p-8 lg:min-h-[315.5px] lg:w-[460px]">
                <p
                  className="mb-6 text-[11px] font-semibold uppercase leading-none tracking-[2.75px] text-[rgba(17,17,17,0.42)] antialiased"
                  style={eyebrowStyle}
                >
                  Season
                </p>
                <p
                  className="text-[28px] font-medium leading-none tracking-[-0.02em] text-[#111111] antialiased"
                  style={displayStyle}
                >
                  {event.seasonLabel}
                </p>
                <p
                  className="mt-3 text-[11px] font-semibold uppercase leading-[18px] tracking-[2.2px] text-[rgba(17,17,17,0.52)] antialiased"
                  style={eyebrowStyle}
                >
                  {event.citySummary}
                </p>

                <div className="mt-8 grid gap-3">
                  <a
                    href={primaryCtaHref}
                    className="inline-flex items-center justify-center bg-[#111111] px-6 py-4 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-white antialiased transition-opacity hover:opacity-80"
                    style={eyebrowStyle}
                  >
                    {event.primaryCtaLabel} →
                  </a>
                  <Link
                    href={event.secondaryCtaHref}
                    className="inline-flex items-center justify-center border border-[rgba(17,17,17,0.48)] px-6 py-4 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[#111111] antialiased transition-colors hover:border-[#111111]"
                    style={eyebrowStyle}
                  >
                    {event.secondaryCtaLabel}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
            <div className="relative aspect-video overflow-hidden bg-[#e7e0d6]">
              <Image
                src={event.heroImage}
                alt={event.heroAlt}
                fill
                priority
                sizes="(min-width: 1280px) 1500px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(17,17,17,0.08)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.22fr_1fr] lg:gap-20 lg:px-10">
            <p className={sectionEyebrowClass} style={eyebrowStyle}>
              {event.aboutEyebrow}
            </p>
            <div className="w-full max-w-[1200px]">
              {event.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-6 w-full max-w-[1200px] p-0 text-[17px] font-normal leading-[27.625px] text-[rgba(17,17,17,0.8)] antialiased last:mb-0"
                  style={eyebrowStyle}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {event.trailerVideoSrc ? (
          <section className="border-t border-[rgba(17,17,17,0.08)] bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.22fr_1fr] lg:gap-20 lg:px-10">
              <p className={sectionEyebrowClass} style={eyebrowStyle}>
                {event.trailerEyebrow ?? "TRAILER VIDEO"}
              </p>
              <div className="w-full max-w-[1200px]">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-black"
                  aria-label={`${event.title} trailer video`}
                >
                  <source src={event.trailerVideoSrc} type="video/mp4" />
                </video>
              </div>
            </div>
          </section>
        ) : null}

        <section
          id="tour-dates"
          className="scroll-mt-24 border-t border-[rgba(17,17,17,0.08)] bg-white py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.22fr_1fr] lg:gap-20">
              <p className={sectionEyebrowClass} style={eyebrowStyle}>
                Tour Dates
              </p>
              <div className="w-full max-w-[1200px]">
                <div className="grid">
                  {sortedTourDates.map((tourDate, index) => (
                    <article
                      key={`${tourDate.date}-${tourDate.city}`}
                      className="grid gap-6 border-b border-[rgba(17,17,17,0.15)] py-8 last:border-b-0 lg:grid-cols-[120px_220px_minmax(0,1fr)_auto] lg:items-start lg:gap-8"
                    >
                      <p
                        className="m-0 p-0 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[#d94a28] antialiased lg:pt-4"
                        style={eyebrowStyle}
                      >
                        Show {index + 1}
                      </p>
                      <p
                        className="mt-0 mb-0 pt-4 pb-0 text-[13px] font-normal uppercase leading-[19.5px] tracking-[1.95px] text-[#d94a28] antialiased"
                        style={eyebrowStyle}
                      >
                        {formatPublicDateDisplay(tourDate.date) ?? tourDate.date}
                      </p>
                      <div className="lg:self-center">
                        <h3
                          className="m-0 text-[34px] font-medium leading-[38px] tracking-[-0.03em] text-[#111111] antialiased"
                          style={displayStyle}
                        >
                          {tourDate.city}
                        </h3>
                        <p
                          className="mt-2 mb-0 p-0 text-[13px] font-normal uppercase leading-[19.5px] tracking-[1.95px] text-[rgba(17,17,17,0.6)] antialiased"
                          style={eyebrowStyle}
                        >
                          {tourDate.venue}
                        </p>
                      </div>
                      <div className="lg:flex lg:justify-end lg:pt-4">
                        <a
                          href={tourDate.ticketHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-[#111111] px-6 py-4 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-white antialiased transition-opacity hover:opacity-80"
                          style={eyebrowStyle}
                        >
                          {tourDate.ticketLabel} →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {galleryImages.length > 0 ? (
          <section className="border-t border-[rgba(17,17,17,0.08)] bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.22fr_1fr] lg:gap-20 lg:px-10">
              <p className={sectionEyebrowClass} style={eyebrowStyle}>
                Photo Gallery
              </p>
              <div className="grid w-full max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {galleryImages.map((image, index) => (
                  <figure
                    key={`${image.src}-${index}`}
                    className={index === 0 ? "sm:col-span-2 lg:col-span-2" : undefined}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#e7e0d6]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes={
                          index === 0
                            ? "(min-width: 1024px) 760px, (min-width: 640px) 92vw, 100vw"
                            : "(min-width: 1024px) 380px, (min-width: 640px) 46vw, 100vw"
                        }
                        className="object-cover"
                      />
                    </div>
                    {image.caption ? (
                      <figcaption
                        className="mt-3 text-[12px] font-normal leading-[18px] text-[rgba(17,17,17,0.62)] antialiased"
                        style={eyebrowStyle}
                      >
                        {image.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-t border-[rgba(17,17,17,0.08)] bg-[#f5f1ea] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
            <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="flex flex-col gap-5">
                <p className={sectionEyebrowClass} style={eyebrowStyle}>
                  {event.relatedEyebrow}
                </p>
                <h2
                  className="m-0 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#111111] antialiased"
                  style={displayStyle}
                >
                  {event.relatedTitle}
                </h2>
              </div>
              <Link
                href={event.relatedHref}
                className="text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[#111111] underline underline-offset-8 antialiased transition-opacity hover:opacity-70"
                style={eyebrowStyle}
              >
                {event.relatedLinkLabel} →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {event.relatedEvents.map((relatedEvent) => (
                <WhatsOnEventCard key={relatedEvent.id} event={relatedEvent} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
