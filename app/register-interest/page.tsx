import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { RegisterInterestForm } from "@/components/RegisterInterestForm";
import type { EventDetailData } from "@/data/eventDetails";
import { getResolvedEventDetailBySlug } from "@/lib/wix/eventDetailContent";
import { normalizeTourSlug } from "@/lib/tourSlug";

const pageDescription = "Register your interest for upcoming Castiglione events.";

const interFont = {
  fontFamily: "Inter, sans-serif",
};

const displayFont = {
  fontFamily: 'Fraunces, "Cormorant Garamond", serif',
};

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Register Interest | Castiglione",
  description: pageDescription,
  openGraph: {
    title: "Register Interest | Castiglione",
    description: pageDescription,
  },
  twitter: {
    title: "Register Interest | Castiglione",
    description: pageDescription,
  },
};

type RegisterInterestPageProps = {
  searchParams?: Promise<{
    event?: string | string[];
  }>;
};

function firstSearchParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function splitCitySummary(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(/·|,|\|/)
    .map((city) => city.trim())
    .filter(Boolean);
}

function getRegisterInterestCities(event: EventDetailData | null) {
  if (!event) {
    return [];
  }

  if (event.registerInterestCities?.length) {
    return event.registerInterestCities;
  }

  const tourDateCities = event.tourDates.map((tourDate) => tourDate.city).filter(Boolean);

  if (tourDateCities.length > 0) {
    return Array.from(new Set(tourDateCities));
  }

  return Array.from(new Set(splitCitySummary(event.citySummary)));
}

export default async function RegisterInterestPage({
  searchParams,
}: RegisterInterestPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const requestedSlug = normalizeTourSlug(firstSearchParam(resolvedSearchParams.event));
  const event = requestedSlug
    ? await getResolvedEventDetailBySlug(requestedSlug).catch(() => null)
    : null;
  const eventSlug = event?.slug ?? requestedSlug ?? "general-interest";
  const eventTitle = event?.title ?? "Castiglione event updates";
  const cityOptions = getRegisterInterestCities(event);

  return (
    <>
      <Navigation />
      <main className="bg-[#f5f1ea] text-[#111111]">
        <section className="border-t border-[rgba(17,17,17,0.06)] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1540px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
            <div className="lg:col-span-7">
              <p
                className="m-0 mb-7 p-0 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[rgb(217,74,40)] antialiased"
                style={interFont}
              >
                Register Interest
              </p>
              <h1
                className="m-0 max-w-[780px] p-0 text-[62px] font-medium leading-[63.24px] tracking-normal text-[rgb(17,17,17)] antialiased md:text-[81.9px] md:leading-[83.538px]"
                style={displayFont}
              >
                {eventTitle}
              </h1>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              <p
                className="m-0 max-w-[420px] text-[15px] font-normal leading-[24.375px] text-[rgba(17,17,17,0.75)] antialiased"
                style={interFont}
              >
                Leave your email and preferred city, and we will share updates when this event opens.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f1ea] pb-20 sm:pb-24 lg:pb-28">
          <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6 lg:px-10">
            <RegisterInterestForm
              eventSlug={eventSlug}
              eventTitle={eventTitle}
              cityOptions={cityOptions}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
