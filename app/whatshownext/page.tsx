import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WhatShowNextSurveyForm } from "@/components/WhatShowNextSurveyForm";
import { getWhatShowNextForm } from "@/lib/wix/forms";

const pageDescription =
  "Tell Castiglione what show, artist, concert or cultural experience you would like to see next.";

const interFont = {
  fontFamily: "Inter, sans-serif",
};

const displayFont = {
  fontFamily: 'Fraunces, "Cormorant Garamond", serif',
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "What Show Next? | Castiglione",
  description: pageDescription,
  openGraph: {
    title: "What Show Next? | Castiglione",
    description: pageDescription,
  },
  twitter: {
    title: "What Show Next? | Castiglione",
    description: pageDescription,
  },
};

export default async function WhatShowNextPage() {
  const form = await getWhatShowNextForm().catch(() => null);

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
                Survey
              </p>
              <h1
                className="m-0 max-w-[780px] p-0 text-[62px] font-medium leading-[63.24px] tracking-[-1.24px] text-[rgb(17,17,17)] antialiased md:text-[81.9px] md:leading-[83.538px] md:tracking-[-1.638px]"
                style={displayFont}
              >
                What show next?
              </h1>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              <p
                className="m-0 max-w-[420px] text-[15px] font-normal leading-[24.375px] text-[rgba(17,17,17,0.75)] antialiased"
                style={interFont}
              >
                Share the artists, concerts, anime titles, exhibitions or cultural
                experiences you would love to see Castiglione bring to the stage.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f1ea] pb-20 sm:pb-24 lg:pb-28">
          <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6 lg:px-10">
            {form?.fields.length ? (
              <WhatShowNextSurveyForm fields={form.fields} />
            ) : (
              <p
                className="m-0 text-[15px] font-normal leading-[24.375px] text-[rgba(17,17,17,0.75)] antialiased"
                style={interFont}
              >
                The survey is temporarily unavailable. Please check back soon.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
