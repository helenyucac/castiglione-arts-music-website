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
  title: string;
  heroImage: string;
  heroAlt: string;
  tourDates: EventTourDate[];
  infoSubtitle: string;
  description: string[];
  trailerTitle: string;
  trailerPlaceholder: string;
  gallery: EventGalleryImage[];
  presentedBy: string;
  ctaCopy: string;
  ctaHref: string;
  ctaLabel: string;
};

export const narutoEventDetail: EventDetailData = {
  slug: "naruto-the-symphonic-experience",
  title: "NARUTO: THE SYMPHONIC EXPERIENCE",
  heroImage: "/media/naruto-hero.jpg",
  heroAlt: "Naruto: The Symphonic Experience horizontal key visual",
  tourDates: [
    {
      date: "OCT 03, 2026",
      city: "SYDNEY",
      venue: "Sydney ICC Darling Harbour Theatre",
      ticketLabel: "BUY TICKETS",
      ticketHref: "https://premier.ticketek.com.au/shows/Show.aspx?sh=NARUTOX26",
    },
    {
      date: "OCT 04, 2026",
      city: "MELBOURNE",
      venue: "MCEC, THE PLENARY",
      ticketLabel: "BUY TICKETS",
      ticketHref:
        "https://castiglione.flicket.io/474a1e8c-0e5a-4096-9b07-3e76a53ef154/releases/GP%20Sale%20Sale%20%5Bfull%20price%5D",
    },
  ],
  infoSubtitle: "About the performance",
  description: [
    "Naruto: The Symphonic Experience brings the iconic music and emotional world of the beloved anime series into the concert hall. Performed live by orchestra, this touring concert experience invites audiences to revisit unforgettable themes, characters, and cinematic moments through a powerful symphonic lens.",
    "Designed for anime fans, music lovers, and families alike, the production celebrates the connection between screen culture and live performance, transforming a beloved story into an immersive concert experience.",
  ],
  trailerTitle: "Trailer",
  trailerPlaceholder: "Trailer coming soon",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80",
      alt: "Stage lighting over a live concert audience",
    },
    {
      src: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1000&q=80",
      alt: "Orchestra performing under warm concert lighting",
    },
    {
      src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80",
      alt: "Concert hall with dramatic stage lighting",
    },
    {
      src: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?auto=format&fit=crop&w=1000&q=80",
      alt: "Musicians performing on stage",
    },
    {
      src: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80",
      alt: "Live performance with illuminated stage",
    },
  ],
  presentedBy: "Castiglione Arts & Culture",
  ctaCopy: "Interested in creating extraordinary live experiences together?",
  ctaHref: "/partnerships",
  ctaLabel: "PARTNER WITH US",
};

export const eventDetailsBySlug: Record<string, EventDetailData> = {
  [narutoEventDetail.slug]: narutoEventDetail,
};
