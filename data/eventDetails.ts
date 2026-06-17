import { whatsOnConcertEvents, type TourCardData } from "@/data/tours";

export type EventTourDate = {
  date: string;
  city: string;
  venue: string;
  ticketLabel: string;
  ticketHref: string;
};

export type EventGalleryImage = {
  src: string;
  alt: string;
};

export type EventDetailData = {
  slug: string;
  breadcrumb: string[];
  categoryLabel: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  seasonLabel: string;
  citySummary: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  aboutEyebrow: string;
  description: string[];
  trailerEyebrow: string;
  trailerVideoSrc: string;
  tourDates: EventTourDate[];
  relatedEyebrow: string;
  relatedTitle: string;
  relatedHref: string;
  relatedLinkLabel: string;
  relatedEvents: TourCardData[];
};

const relatedConcertEvents = whatsOnConcertEvents
  .filter((event) => event.id !== "naruto-symphonic-experience")
  .filter(
    (event) =>
      event.category === "anime-concert" ||
      event.category === "gaming-concert" ||
      event.category === "classical-recital",
  )
  .slice(0, 3);

export const narutoEventDetail: EventDetailData = {
  slug: "naruto-the-symphonic-experience",
  breadcrumb: ["Home", "What's On", "Anime Concerts"],
  categoryLabel: "Anime Concerts",
  title: "NARUTO: The Symphonic Experience",
  intro:
    "A live symphonic concert experience bringing Naruto's iconic story, music, and emotional world into the concert hall.",
  heroImage: "/media/naruto-hero.jpg",
  heroAlt: "Naruto: The Symphonic Experience horizontal key visual",
  seasonLabel: "OCT 2026",
  citySummary: "SYDNEY · MELBOURNE",
  primaryCtaLabel: "BUY TICKETS",
  primaryCtaHref: "#tour-dates",
  secondaryCtaLabel: "PARTNER ON THIS TOUR",
  secondaryCtaHref: "/partnerships",
  aboutEyebrow: "ABOUT THE PRODUCTION",
  description: [
    "NARUTO: The Symphonic Experience brings the beloved anime to life on a grand scale, pairing a cinematic montage of iconic scenes with a live orchestra performing Toshio Masuda's original score.",
    "Across the concert, audiences revisit Naruto Uzumaki's journey to become Hokage through music, rivalry, growth, and unforgettable screen moments. The orchestra performs Masuda's soundtrack alongside the series' well-known openings and endings, inviting fans into a shared celebration of the music they love.",
    "Created as an exclusive film and musical montage for this concert experience, the production is designed for longtime fans and new audiences alike, blending rock, pop, and traditional Japanese colours into an immersive symphonic event.",
  ],
  trailerEyebrow: "TRAILER VIDEO",
  trailerVideoSrc: "/media/naruto-au-trailer.mov",
  tourDates: [
    {
      date: "03 OCT 2026",
      city: "Sydney",
      venue: "ICC Darling Harbour Theatre",
      ticketLabel: "BUY TICKETS",
      ticketHref: "https://premier.ticketek.com.au/shows/Show.aspx?sh=NARUTOX26",
    },
    {
      date: "04 OCT 2026",
      city: "Melbourne",
      venue: "MCEC, The Plenary",
      ticketLabel: "BUY TICKETS",
      ticketHref:
        "https://castiglione.flicket.io/474a1e8c-0e5a-4096-9b07-3e76a53ef154/releases/GP%20Sale%20Sale%20%5Bfull%20price%5D",
    },
  ],
  relatedEyebrow: "ALSO PROGRAMMED",
  relatedTitle: "More from Concert & Theatre.",
  relatedHref: "/programs/concerts",
  relatedLinkLabel: "SEE FULL SEASON",
  relatedEvents: relatedConcertEvents,
};

export const eventDetailsBySlug: Record<string, EventDetailData> = {
  [narutoEventDetail.slug]: narutoEventDetail,
};
