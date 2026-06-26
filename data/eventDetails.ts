import {
  getTourProgram,
  homepageWhatsOnEvents,
  type TourCardData,
  type TourProgram,
} from "@/data/tours";

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
  caption?: string;
};

export type EventDetailData = {
  slug: string;
  breadcrumb: string[];
  categoryLabel: string;
  title: string;
  heroTitleOffset?: boolean;
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
  trailerEyebrow?: string;
  trailerVideoSrc?: string;
  galleryImages?: EventGalleryImage[];
  tourDates: EventTourDate[];
  relatedEyebrow: string;
  relatedTitle: string;
  relatedHref: string;
  relatedLinkLabel: string;
  relatedEvents: TourCardData[];
};

const activeRelatedStatuses = new Set(["on-sale", "upcoming"]);

function getLocalDateTimestamp(date: string) {
  const isoDate = date.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (isoDate) {
    const [, year, month, day] = isoDate;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }

  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getTodayTimestamp() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
}

const getRelatedProgramEvents = (program: TourProgram, excludedId: string) =>
  homepageWhatsOnEvents
    .filter((event) => event.id !== excludedId)
    .filter((event) => getTourProgram(event.category) === program)
    .filter((event) => activeRelatedStatuses.has(event.status))
    .filter((event) => getLocalDateTimestamp(event.date) >= getTodayTimestamp())
    .slice(0, 3);

export const narutoEventDetail: EventDetailData = {
  slug: "naruto-the-symphonic-experience",
  breadcrumb: ["Home", "What's On", "Anime Concerts"],
  categoryLabel: "Anime Concerts",
  title: "NARUTO: The Symphonic Experience",
  heroTitleOffset: true,
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
    "With Masuda's dynamic soundtrack, blending rock, pop, and traditional Japanese instruments like the Shakuhachi and Shamisen, the live music elevates each scene's impact, immersing the audience in Naruto's story.",
    "Whether you're a devoted fan or new to the series, NARUTO: The Symphonic Experience offers an exclusive, unforgettable way to celebrate Naruto's epic journey and music in a truly one-of-a-kind setting.",
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
  relatedTitle: "More from Anime & Gaming Concerts.",
  relatedHref: "/programs/concerts",
  relatedLinkLabel: "SEE FULL SEASON",
  relatedEvents: getRelatedProgramEvents("anime-gaming-concerts", "naruto-symphonic-experience"),
};

export const attackOnTitanEventDetail: EventDetailData = {
  slug: "attack-on-titan-beyond-the-walls-world-tour",
  breadcrumb: ["Home", "What's On", "Anime Concerts"],
  categoryLabel: "Anime Concerts",
  title: '"Attack on Titan" - Beyond the Walls World Tour - The Official Concert',
  intro:
    'Epic "Attack on Titan" Concert Experience Set to Electrify Fans with Iconic Soundtrack and Immersive Visuals',
  heroImage: "/media/aot-hero.jpg",
  heroAlt: "Attack on Titan Beyond the Walls World Tour horizontal key visual",
  seasonLabel: "JUL 2026",
  citySummary: "MELBOURNE",
  primaryCtaLabel: "BUY TICKETS",
  primaryCtaHref: "#tour-dates",
  secondaryCtaLabel: "PARTNER ON THIS TOUR",
  secondaryCtaHref: "/partnerships",
  aboutEyebrow: "ABOUT THE SHOW",
  description: [
    'Fans of the globally renowned anime phenomenon "Attack on Titan" are in for a once-in-a-lifetime experience! Join this colossal celebration of music and anime, featuring the iconic soundtrack and immersive visuals.',
    "Featuring the internationally acclaimed soundtrack composed by Hiroyuki Sawano (seasons 1, 2, 3 and The Final Season) and Kohta Yamamoto (The Final Season), the concert will showcase the iconic tracks that have come to define the series, including at'aek ON taitn, counter・attack-mankind, Apple Seed, and Footsteps of Doom.",
    'This concert promises to be an awe-inspiring fusion of rock and orchestral music, captivating vocal performances, and breathtaking visuals, creating a fully immersive experience to transport attendees straight into the heart of the "Attack on Titan" universe.',
  ],
  trailerEyebrow: "TRAILER VIDEO",
  trailerVideoSrc: "/media/aot-trailer.mp4",
  tourDates: [
    {
      date: "05 JUL 2026, 7:30 PM",
      city: "Melbourne",
      venue: "Arts Centre Melbourne, Hamer Hall",
      ticketLabel: "BUY TICKETS",
      ticketHref:
        "https://www.artscentremelbourne.com.au/whats-on/2026/contemporary-music/attack-on-titan",
    },
    {
      date: "06 JUL 2026, 7:30 PM",
      city: "Melbourne",
      venue: "Arts Centre Melbourne, Hamer Hall",
      ticketLabel: "BUY TICKETS",
      ticketHref:
        "https://www.artscentremelbourne.com.au/whats-on/2026/contemporary-music/attack-on-titan",
    },
    {
      date: "07 JUL 2026, 7:30 PM",
      city: "Melbourne",
      venue: "Arts Centre Melbourne, Hamer Hall",
      ticketLabel: "BUY TICKETS",
      ticketHref:
        "https://www.artscentremelbourne.com.au/whats-on/2026/contemporary-music/attack-on-titan",
    },
  ],
  relatedEyebrow: "ALSO PROGRAMMED",
  relatedTitle: "More from Anime & Gaming Concerts.",
  relatedHref: "/programs/concerts",
  relatedLinkLabel: "SEE FULL SEASON",
  relatedEvents: getRelatedProgramEvents("anime-gaming-concerts", "attack-on-titan-world-tour"),
};

export const eventDetailsBySlug: Record<string, EventDetailData> = {
  [narutoEventDetail.slug]: narutoEventDetail,
  [attackOnTitanEventDetail.slug]: attackOnTitanEventDetail,
};
