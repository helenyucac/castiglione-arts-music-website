"use client";

import { useState } from "react";

const interFont = {
  fontFamily: "Inter, sans-serif",
};

const displayFont = {
  fontFamily: 'Fraunces, "Cormorant Garamond", serif',
};

const partnershipTabs = [
  {
    id: "artists",
    label: "Artists & Producers",
    subtitle: "Touring and audience development.",
    eyebrow: "Artists & Producers",
    headline: "For artists, agencies and\ncreative producers.",
    intro:
      "Bring your work to the Asia-Pacific's most distinctive cultural stages — with the programming, touring and audience-development scaffolding to make it resonate.",
    paragraphs: [
      "We collaborate with classical soloists, contemporary ensembles, festival producers and interdisciplinary artists across the Asia-Pacific. From a single recital to a multi-city tour, our team shapes the route to market — programming, production and the long-term audience relationship.",
      "Submissions are reviewed quarterly. Please share a project description, supporting media and your touring window.",
    ],
    capabilities: [
      "Touring & Market Entry",
      "Festival Programming",
      "Audience Development",
      "Production & Operations",
    ],
  },
  {
    id: "ip",
    label: "IP & Exhibitions",
    subtitle: "Licensing and touring strategy.",
    eyebrow: "IP & Exhibitions",
    headline: "For rights holders, studios\nand cultural institutions.",
    intro:
      "Adapt and tour your intellectual property across the Asia-Pacific with a partner who understands localisation, audience context and long-form cultural programming.",
    paragraphs: [
      "We license, localise and present exhibitions, immersive experiences and IP-led formats across Greater China, Southeast Asia and Australia. Our work spans museum-grade exhibitions, family entertainment and brand-led cultural platforms.",
      "We can take a project from rights conversation through to opening night — territory strategy, creative adaptation, venue partnerships and operations.",
    ],
    capabilities: [
      "Licensing & Localisation",
      "Exhibition Touring",
      "Venue & Institutional Partnerships",
      "Production & Operations",
    ],
  },
  {
    id: "brands",
    label: "Brands & Partnerships",
    subtitle: "Sponsorship and cultural collaborations.",
    eyebrow: "Brands & Partnerships",
    headline: "For brands, foundations and\ncultural patrons.",
    intro:
      "Align your brand with internationally recognised cultural moments. Our partnership programmes are designed for long-term resonance — not transactional placement.",
    paragraphs: [
      "Castiglione's programmes reach audiences across Melbourne, Singapore, Hangzhou and beyond. Our partners include luxury houses, financial institutions, public foundations and government cultural bodies.",
      "We design bespoke partnership platforms — from single-tour activations to multi-year season presences — built around your cultural objectives and the audiences you want to grow with.",
    ],
    capabilities: [
      "Presenting Partnerships",
      "Cultural Platform Development",
      "Audience Development",
      "Bespoke IP & Exhibition Collaborations",
    ],
  },
] as const;

type PartnershipTabId = (typeof partnershipTabs)[number]["id"];

export function PartnershipTabs() {
  const [activeTabId, setActiveTabId] = useState<PartnershipTabId>(
    partnershipTabs[0].id,
  );
  const activeTab =
    partnershipTabs.find((tab) => tab.id === activeTabId) ?? partnershipTabs[0];

  return (
    <>
      <section className="border-y border-[rgba(17,17,17,0.08)] bg-white">
        <div className="mx-auto grid w-full max-w-[1540px] md:grid-cols-3">
          {partnershipTabs.map((tab) => {
            const isActive = tab.id === activeTab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`relative min-h-[128px] border-b border-[rgba(17,17,17,0.08)] px-8 py-8 text-left transition-colors duration-150 md:border-b-0 md:border-r md:last:border-r-0 lg:px-10 ${
                  isActive ? "bg-white" : "bg-[#f5f1ea] hover:bg-white"
                }`}
              >
                <span
                  className="block text-left text-[30px] font-normal leading-[36px] tracking-[-0.45px] text-[rgb(17,17,17)] antialiased"
                  style={displayFont}
                >
                  {tab.label}
                </span>
                <span
                  className="mt-3 block text-[13px] font-normal leading-[20px] text-[rgba(17,17,17,0.58)] antialiased"
                  style={interFont}
                >
                  {tab.subtitle}
                </span>
                {isActive ? (
                  <span className="absolute bottom-0 left-0 h-px w-full bg-[rgb(217,74,40)]" aria-hidden="true" />
                ) : null}
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1540px] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
          <div className="lg:col-span-5">
            <p
              className="m-0 mb-6 p-0 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[rgb(217,74,40)] antialiased"
              style={interFont}
            >
              {activeTab.eyebrow}
            </p>
            <h2
              className="m-0 w-full max-w-[504.75px] whitespace-pre-line p-0 text-[48px] font-medium leading-[50.4px] tracking-[-0.96px] text-[rgb(17,17,17)] antialiased lg:w-[504.75px]"
              style={displayFont}
            >
              {activeTab.headline}
            </h2>
            <p
              className="mb-0 mt-8 w-full max-w-[504.75px] p-0 text-[16px] font-normal leading-[26px] text-[rgba(17,17,17,0.75)] antialiased lg:w-[504.75px]"
              style={interFont}
            >
              {activeTab.intro}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div
              className="space-y-6"
              style={interFont}
            >
              {activeTab.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="m-0 w-full max-w-[618.5px] p-0 text-[15px] font-normal leading-[24.375px] text-[rgba(17,17,17,0.75)] antialiased lg:w-[618.5px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-[rgba(17,17,17,0.1)] pt-8">
              <p
                className="m-0 mb-6 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[rgba(17,17,17,0.45)] antialiased"
                style={interFont}
              >
                Capabilities
              </p>
              <ul className="m-0 grid list-none gap-4 p-0">
                {activeTab.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-center gap-4 text-[15px] font-semibold leading-[22px] text-[#111111] antialiased"
                    style={interFont}
                  >
                    <span className="size-[5px] shrink-0 bg-[rgb(217,74,40)]" aria-hidden="true" />
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
