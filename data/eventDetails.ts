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
  intro: "",
  heroImage: "/media/naruto-hero.jpg",
  heroAlt: "Naruto: The Symphonic Experience horizontal key visual",
  seasonLabel: "OCT 2026",
  citySummary: "SYDNEY · MELBOURNE",
  primaryCtaLabel: "BUY TICKETS",
  primaryCtaHref: "#tour-dates",
  secondaryCtaLabel: "PARTNER ON THIS TOUR",
  secondaryCtaHref: "/partnerships",
  aboutEyebrow: "ABOUT THE SHOW",
  description: [
    "NARUTO: The Symphonic Experience is a live concert that brings the beloved anime to life on a grand scale. This two-hour event features a film montage of iconic scenes from over 220 episodes, synchronized to a live orchestra performing Toshio Masuda's original score. Fans will relive Naruto Uzumaki's journey to become Hokage, facing rivalries, challenges, and growth along the way.",
    "The orchestra performs not only Masuda's unforgettable soundtrack but also the series' most famous openings and endings, inviting the audience to sing along with the music they love. This interactive element draws fans closer to Naruto, celebrating the powerful, shared bond the music creates.",
    "This event is truly exclusive: the film and musical montage created for NARUTO: The Symphonic Experience can only be seen at these shows. Audiences will have a unique opportunity to sing, laugh, cheer, and feel the excitement of seeing their favorite characters on screen, experiencing the full range of emotions that Naruto inspires.",
    "With Masuda's dynamic soundtrack, blending rock, pop, and traditional Japanese instruments like the Shakuhachi and Shamisen, the live music elevates each scene’s impact, immersing the audience in Naruto's story.",
    "Whether you're a devoted fan or new to the series, NARUTO: The Symphonic Experience offers an exclusive, unforgettable way to celebrate Naruto’s epic journey and music in a truly one-of-a-kind setting.",
  ],
  trailerEyebrow: "TRAILER VIDEO",
  trailerVideoSrc: "/media/naruto-au-trailer.mp4",
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
      venue: "MCEC, THE PLENARY",
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
