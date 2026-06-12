import Image from "next/image";
import Link from "next/link";
import { EventGallery } from "@/components/EventGallery";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import type { EventDetailData } from "@/data/eventDetails";

type EventDetailPageProps = {
  event: EventDetailData;
};

export function EventDetailPage({ event }: EventDetailPageProps) {
  return (
    <>
      <Navigation />
      <main>
        <section className="relative h-[50vh] min-h-[420px] overflow-hidden bg-black lg:h-[70vh]">
          <Image
            src={event.heroImage}
            alt={event.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </section>

        <section className="bg-white py-8 sm:py-10 lg:py-12">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <h1 className="max-w-6xl text-[clamp(2.25rem,5vw,5rem)] font-black uppercase leading-[0.92] tracking-normal">
              {event.title}
            </h1>
          </div>
        </section>

        <section className="bg-white pb-12 sm:pb-16 lg:pb-20">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="mb-6 pb-2 lg:mb-8">
              <h2 className="text-[clamp(1.8rem,3.2vw,3.25rem)] font-black uppercase leading-[0.92] tracking-normal">
                Tour Dates
              </h2>
            </div>

            <div>
              {event.tourDates.map((tourDate) => (
                <div
                  key={`${tourDate.date}-${tourDate.city}`}
                  className="grid gap-4 border-b border-black py-6 sm:py-7 lg:grid-cols-[0.9fr_0.8fr_1.7fr_auto] lg:items-center lg:gap-8"
                >
                  <p className="text-base font-black uppercase tracking-normal sm:text-lg">
                    {tourDate.date}
                  </p>
                  <p className="text-xl font-black uppercase leading-none tracking-normal sm:text-2xl">
                    {tourDate.city}
                  </p>
                  <p className="max-w-3xl text-base font-bold leading-7 sm:text-lg">
                    {tourDate.venue}
                  </p>
                  <a
                    href={tourDate.ticketHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center justify-center border border-black bg-black px-6 py-4 text-sm font-black uppercase tracking-normal text-white transition-colors hover:bg-[#fdf9ee] hover:text-black"
                  >
                    {tourDate.ticketLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black bg-[#f8f8f3] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="mb-8 border-b border-black pb-6 lg:mb-10">
              <h2 className="text-[clamp(1.8rem,3.2vw,3.25rem)] font-black uppercase leading-[0.92] tracking-normal">
                Event Info
              </h2>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div className="max-w-4xl">
                <p className="mb-6 text-xl font-black leading-7 tracking-normal sm:text-2xl">
                  {event.infoSubtitle}
                </p>
                <div className="space-y-5 text-base font-medium leading-7 sm:text-lg sm:leading-8">
                  {event.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 text-xl font-black uppercase leading-none tracking-normal">
                  {event.trailerTitle}
                </p>
                <div className="flex aspect-video items-center justify-center bg-black p-6 text-center text-lg font-black uppercase tracking-normal text-white">
                  {event.trailerPlaceholder}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="mb-8 border-b border-black pb-6 lg:mb-10">
              <h2 className="text-[clamp(1.8rem,3.2vw,3.25rem)] font-black uppercase leading-[0.92] tracking-normal">
                Photo Gallery
              </h2>
            </div>
            <EventGallery images={event.gallery} />
          </div>
        </section>

        <section className="border-t border-black bg-[#f8f8f3] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-4 lg:grid-cols-[0.45fr_1fr] lg:items-end">
              <h2 className="text-[clamp(1.8rem,3vw,3.5rem)] font-black uppercase leading-[0.95] tracking-normal">
                Presented By
              </h2>
              <p className="text-2xl font-black leading-none tracking-normal sm:text-3xl">
                {event.presentedBy}
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-black bg-black py-12 text-white sm:py-16 lg:py-20">
          <div className="mx-auto flex w-full max-w-[1760px] flex-col items-start gap-7 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-10">
            <p className="max-w-4xl text-[clamp(1.75rem,3vw,3.1rem)] font-black uppercase leading-[0.95] tracking-normal">
              {event.ctaCopy}
            </p>
            <Link
              href={event.ctaHref}
              className="inline-flex shrink-0 items-center justify-center border border-white bg-white px-8 py-5 text-base font-black uppercase tracking-normal text-black transition-colors hover:bg-black hover:text-white"
            >
              {event.ctaLabel}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
