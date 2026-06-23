export type TourCategory =
  | "anime-concert"
  | "gaming-concert"
  | "classical-recital"
  | "exhibitions"
  | "music-festival"
  | "lucid";
export type TourStatus = "on-sale" | "upcoming" | "past";

export type TourTicketLink = {
  label: string;
  href: string;
  city?: string;
  status?: "book-now" | "sold-out" | "waitlist" | "past";
};

export type TourCardData = {
  id: string;
  category: TourCategory;
  title: string;
  date: string;
  dateLabel: string;
  cities: string[];
  venues?: string[];
  ticketLinks?: TourTicketLink[];
  sourceUrl?: string;
  status: TourStatus;
  image: string;
  href?: string;
};

export type TourFilter = "whats-on" | TourCategory | "past";

export const homeTourFilters: { label: string; value: TourFilter }[] = [
  { label: "What's on", value: "whats-on" },
  { label: "Anime Concerts", value: "anime-concert" },
  { label: "Gaming Concerts", value: "gaming-concert" },
  { label: "Classical Concerts", value: "classical-recital" },
  { label: "Exhibitions", value: "exhibitions" },
  { label: "Past Event", value: "past" },
];

export const tourTypeFilters: { label: string; value: TourFilter }[] = [
  { label: "Anime Concerts", value: "anime-concert" },
  { label: "Gaming Concerts", value: "gaming-concert" },
  { label: "Classical Concerts", value: "classical-recital" },
  { label: "Exhibitions", value: "exhibitions" },
  { label: "Lucid Live", value: "lucid" },
];

export const tourCategoryLabels: Record<TourCategory, string> = {
  "anime-concert": "Anime concerts",
  "gaming-concert": "Gaming Concerts",
  "classical-recital": "Classical Concerts",
  exhibitions: "Exhibitions",
  "music-festival": "Music Festival",
  lucid: "Lucid Live",
};

export const tourCategoryColors: Record<TourCategory, string> = {
  "anime-concert": "#D7CEC4",
  "gaming-concert": "#B8AEA3",
  "classical-recital": "#CBBE9A",
  exhibitions: "#A89285",
  "music-festival": "#D7CEC4",
  lucid: "#BEC2B8",
};

export const tourHighlights: TourCardData[] = [
  {
    id: "mischa-maisky-recital",
    category: "classical-recital",
    title: "Mischa Maisky in Recital",
    date: "2026-11-15",
    dateLabel: "06-15 NOV 2026",
    cities: ["Melbourne", "Sydney", "Brisbane", "Perth"],
    venues: [
      "Arts Centre Melbourne, Hamer Hall",
      "Sydney Opera House",
      "QPAC, Concert Hall",
      "Winthrop Hall",
    ],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "naruto-symphonic-experience",
    category: "anime-concert",
    title: "NARUTO: The Symphonic Experience",
    date: "2026-10-04",
    dateLabel: "03-04 OCT 2026",
    cities: ["Sydney", "Melbourne"],
    venues: ["Darling Harbour Theatre (ICC)", "MCEC, The Plenary"],
    ticketLinks: [
      {
        label: "Sydney tickets",
        city: "Sydney",
        href: "https://premier.ticketek.com.au/shows/Show.aspx?sh=NARUTOX26",
        status: "book-now",
      },
      {
        label: "Melbourne tickets",
        city: "Melbourne",
        href: "https://castiglione.flicket.io/474a1e8c-0e5a-4096-9b07-3e76a53ef154/releases/GP%20Sale%20Sale%20%5Bfull%20price%5D",
        status: "book-now",
      },
    ],
    sourceUrl: "https://www.castiglione.com.au/narutothesymphonicexperience",
    status: "on-sale",
    image: "/media/naruto-square-poster.png",
    href: "/tours/naruto-the-symphonic-experience",
  },
  {
    id: "attack-on-titan-world-tour",
    category: "anime-concert",
    title: '"Attack on Titan" - Beyond the Walls World Tour - The Official Concert',
    date: "2026-07-07",
    dateLabel: "05-07 JUL 2026",
    cities: ["Melbourne"],
    venues: ["Arts Centre Melbourne, Hamer Hall"],
    ticketLinks: [
      {
        label: "Arts Centre Melbourne tickets",
        city: "Melbourne",
        href: "https://www.artscentremelbourne.com.au/whats-on/2026/contemporary-music/attack-on-titan",
        status: "book-now",
      },
    ],
    sourceUrl: "https://www.castiglione.com.au/attackontitan",
    status: "on-sale",
    image: "/media/aot-poster.jpg",
    href: "/tours/attack-on-titan-beyond-the-walls-world-tour",
  },
  {
    id: "one-piece-piano-symphony-2026",
    category: "anime-concert",
    title: "ONE PIECE Piano Symphony",
    date: "2026-04-26",
    dateLabel: "24-26 APR 2026",
    cities: ["Melbourne", "Sydney"],
    venues: ["Melbourne Recital Centre", "City Recital Hall"],
    ticketLinks: [
      {
        label: "Melbourne tickets",
        city: "Melbourne",
        href: "https://www.melbournerecital.com.au/events/2026/one-piece-piano-symphony/",
        status: "past",
      },
      {
        label: "Sydney tickets",
        city: "Sydney",
        href: "https://www.cityrecitalhall.com/whats-on/events/one-piece-piano-symphony/",
        status: "past",
      },
    ],
    sourceUrl: "https://www.castiglione.com.au/onepiecepianosymphony",
    status: "past",
    image:
      "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "juan-diego-florez-2025",
    category: "classical-recital",
    title: "Juan Diego Flórez in Recital",
    date: "2025-12-03",
    dateLabel: "29 NOV-03 DEC 2025",
    cities: ["Melbourne", "Sydney", "Adelaide"],
    venues: ["Arts Centre Melbourne, Hamer Hall", "Sydney Opera House", "Adelaide Festival Centre"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "demon-slayer-in-concert",
    category: "anime-concert",
    title: "Demon Slayer:Kimetsu no Yaiba In Concert",
    date: "2025-10-31",
    dateLabel: "17-31 OCT 2025",
    cities: ["Singapore", "Melbourne", "Brisbane", "Sydney"],
    venues: [
      "Esplanade Theatre",
      "Palais Theatre",
      "Brisbane City Hall",
      "Sydney Town Hall",
    ],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ray-chen-recital-2025",
    category: "classical-recital",
    title: "Ray Chen in Recital",
    date: "2025-09-14",
    dateLabel: "08-14 SEP 2025",
    cities: ["Melbourne", "Sydney", "Brisbane"],
    venues: ["Arts Centre Melbourne, Hamer Hall", "Sydney Opera House", "QPAC, Concert Hall"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "game-on-australia-premiere-tour-2025",
    category: "gaming-concert",
    title: "GAME ON! Australia Premiere Tour 2025",
    date: "2025-05-10",
    dateLabel: "10 MAY 2025",
    cities: ["Melbourne"],
    venues: ["The Plenary (MCEC)"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "final-fantasy-piano-concert",
    category: "gaming-concert",
    title: "Crystalline Resonance FINAL FANTASY Piano Concert",
    date: "2025-03-05",
    dateLabel: "21 FEB-05 MAR 2025",
    cities: ["Perth", "Brisbane", "Melbourne", "Sydney", "Wellington"],
    venues: [
      "Winthrop Hall",
      "Brisbane City Hall",
      "Melbourne Recital Centre",
      "Sydney Town Hall",
      "The Opera House",
    ],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nobuo-uematsu-contiki-show",
    category: "gaming-concert",
    title: "Nobuo Uematsu conTIKI SHOW",
    date: "2024-09-08",
    dateLabel: "05-08 SEP 2024",
    cities: ["Melbourne", "Sydney"],
    venues: ["Melbourne Recital Centre", "Athenaeum Theatre One", "State Theatre"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "maxim-vengerov",
    category: "classical-recital",
    title: "Maxim Vengerov",
    date: "2024-08-10",
    dateLabel: "05-10 AUG 2024",
    cities: ["Brisbane", "Melbourne", "Sydney"],
    venues: ["QPAC", "Art Centre Melbourne", "Sydney Opera House"],
    sourceUrl: "https://www.castiglione.com.au/maximvengerov",
    status: "past",
    image:
      "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "one-piece-music-symphony-2024",
    category: "anime-concert",
    title: "ONE PIECE Music Symphony",
    date: "2024-07-27",
    dateLabel: "19-27 JUL 2024",
    cities: ["Melbourne", "Brisbane", "Sydney"],
    venues: ["The Plenary (MCEC)", "Brisbane City Hall", "Darling Harbour Theatre (ICC)"],
    ticketLinks: [
      {
        label: "Melbourne tickets",
        city: "Melbourne",
        href: "https://castiglione.flicket.io/events/efcd3736-cb1a-4755-b26e-33cb0e3933cd/reservation",
        status: "past",
      },
      {
        label: "Brisbane tickets",
        city: "Brisbane",
        href: "https://castiglione.flicket.io/events/e2d392ca-b17d-40e1-a856-cdd88419045d/reservation",
        status: "past",
      },
    ],
    sourceUrl: "https://www.castiglione.com.au/onepiecemusicsymphony",
    status: "past",
    image:
      "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "one-piece-piano-symphony-2024",
    category: "anime-concert",
    title: "ONE PIECE Piano Symphony",
    date: "2024-07-25",
    dateLabel: "23-25 JUL 2024",
    cities: ["Perth", "Adelaide"],
    venues: ["Perth Concert Hall", "Adelaide Town Hall"],
    sourceUrl: "https://www.castiglione.com.au/onepiecepianosymphony",
    status: "past",
    image:
      "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "juan-diego-florez-2023",
    category: "classical-recital",
    title: "Juan Diego Flórez in Recital",
    date: "2023-11-07",
    dateLabel: "02-07 NOV 2023",
    cities: ["Melbourne", "Sydney", "Canberra"],
    venues: ["Arts Centre Melbourne, Hamer Hall", "Sydney Opera House", "Llewellyn Hall"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "milos-classical-guitar",
    category: "classical-recital",
    title: "MILOŠ: The Classical Guitar Hero",
    date: "2023-11-12",
    dateLabel: "05-12 NOV 2023",
    cities: ["Sydney", "Melbourne", "Perth"],
    venues: ["City Recital Hall", "Melbourne Recital Centre", "Perth Concert Hall"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ray-chen-recital-2022",
    category: "classical-recital",
    title: "Ray Chen: In Recital",
    date: "2022-08-13",
    dateLabel: "06-13 AUG 2022",
    cities: ["Melbourne", "Adelaide", "Brisbane", "Perth"],
    venues: ["Melbourne Recital Centre", "Adelaide Town Hall", "Queensland Performing Arts Centre", "Perth Concert Hall"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mai-fujisawa-melody-of-japan",
    category: "classical-recital",
    title: "Mai Fujisawa: Melody of Japan",
    date: "2019-11-16",
    dateLabel: "14-16 NOV 2019",
    cities: ["Melbourne", "Sydney"],
    venues: ["Melbourne Recital Centre", "Monash Concert Hall", "State Theatre"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lisa-ono-music-journey",
    category: "classical-recital",
    title: "Lisa Ono: Music Journey",
    date: "2019-09-22",
    dateLabel: "17-22 SEP 2019",
    cities: ["Adelaide", "Sydney", "Melbourne", "Brisbane"],
    venues: ["Adelaide Town Hall", "Sydney Opera House", "Arts Centre Melbourne, Hammer Hall", "Brisbane City Hall"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "piano-battle",
    category: "classical-recital",
    title: "Piano Battle",
    date: "2019-09-01",
    dateLabel: "25 AUG-01 SEP 2019",
    cities: ["Melbourne", "Brisbane", "Sydney", "Perth"],
    venues: ["Melbourne Recital Centre", "Brisbane City Hall", "The Concourse", "Perth Concert Hall"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "yiruma-2019-frame",
    category: "classical-recital",
    title: "Yiruma 2019: Frame",
    date: "2019-05-18",
    dateLabel: "10-18 MAY 2019",
    cities: ["Melbourne", "Brisbane", "Sydney"],
    venues: ["Melbourne Convention and Exhibition Centre", "Queensland Performing Arts Centre", "Sydney Opera House"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "yundi-li-sonata-world-tour",
    category: "classical-recital",
    title: "Yundi Li 2018 Australia Tour: Touch of Chopin",
    date: "2018-11-06",
    dateLabel: "03-06 NOV 2018",
    cities: ["Melbourne", "Sydney"],
    venues: ["Palais Theatre", "Sydney Opera House"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "maksim-mrvica-new-silk-road",
    category: "classical-recital",
    title: "Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody",
    date: "2018-09-30",
    dateLabel: "26-30 SEP 2018",
    cities: ["Brisbane", "Melbourne", "Perth", "Sydney"],
    venues: ["Brisbane City Hall", "Palais Theatre", "Perth Concert Hall", "Sydney Opera House"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lisa-ono-la-vie-en-rose",
    category: "classical-recital",
    title: "Lisa Ono Australia Tour: La Vie En Rose",
    date: "2018-05-20",
    dateLabel: "17-20 MAY 2018",
    cities: ["Melbourne", "Sydney", "Brisbane"],
    venues: ["Melbourne Recital Centre", "Sydney Opera House", "QPAC, Concert Hall"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "peter-bence",
    category: "classical-recital",
    title: "Peter Bence",
    date: "2018-04-22",
    dateLabel: "22 APR 2018",
    cities: ["Sydney"],
    venues: ["City Recital Centre"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "shi-jin-melody-of-the-night",
    category: "classical-recital",
    title: "Shi Jin Piano Concert: Melody of the Night",
    date: "2017-11-14",
    dateLabel: "12-14 NOV 2017",
    cities: ["Melbourne", "Sydney"],
    venues: ["Melbourne Recital Centre", "The Concourse"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "yiruma-oceania-tour",
    category: "classical-recital",
    title: "Yiruma Piano 2017 Oceania Tour: Autumn Rain",
    date: "2017-12-14",
    dateLabel: "MAY / DEC 2017",
    cities: ["Auckland", "Sydney", "Brisbane", "Taipei"],
    venues: ["ASB Theatre", "Sydney Opera House", "QPAC, Concert Hall", "TICC"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lu-siqing-violin-concert-nostalgia",
    category: "classical-recital",
    title: "Lu Siqing Violin Concert: Nostalgia",
    date: "2016-08-17",
    dateLabel: "16-17 AUG 2016",
    cities: ["Melbourne"],
    venues: ["Melbourne Recital Centre"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "yiruma-piano-australia-tour-2016",
    category: "classical-recital",
    title: "Yiruma Piano 2016 Australia Tour: Kiss the Rain",
    date: "2016-07-31",
    dateLabel: "26-31 JUL 2016",
    cities: ["Adelaide", "Melbourne", "Sydney"],
    venues: ["Festival Theatre", "Melbourne Convention Center", "Sydney Opera House"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sheng-zhongguo",
    category: "classical-recital",
    title: "Sheng Zhongguo Violin Concert",
    date: "2015-07-04",
    dateLabel: "03-04 JUL 2015",
    cities: ["Melbourne"],
    venues: ["Melbourne Recital Centre"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "christmas-at-cruden-farm-silvie-paladino",
    category: "classical-recital",
    title: "Christmas at Cruden Farm with Silvie Paladino",
    date: "2025-12-13",
    dateLabel: "13 DEC 2025",
    cities: ["Langwarrin"],
    venues: ["Cruden Farm"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?auto=format&fit=crop&w=1200&q=80",
  },
];

function sortTourCardsByDateDesc(events: TourCardData[]) {
  return [...events].sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
}

export const whatsOnConcertEvents = sortTourCardsByDateDesc(
  tourHighlights.filter(
    (event) =>
      event.category === "anime-concert" ||
      event.category === "gaming-concert" ||
      event.category === "classical-recital",
  ),
);

export const musicFestivalProgramEvents: TourCardData[] = sortTourCardsByDateDesc([]);

export const liveMusicFestivalProgramEvents = sortTourCardsByDateDesc([
  ...musicFestivalProgramEvents,
]);

export const touringExhibitionProgramEvents: TourCardData[] = sortTourCardsByDateDesc([]);

export const homepageWhatsOnEvents = sortTourCardsByDateDesc([
  ...whatsOnConcertEvents,
  ...touringExhibitionProgramEvents,
]);

export const homeTourHighlights = homepageWhatsOnEvents;
