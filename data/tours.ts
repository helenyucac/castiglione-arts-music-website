export type TourCategory =
  | "anime-concert"
  | "gaming-concert"
  | "classical-recital"
  | "exhibition"
  | "lucid";
export type TourStatus = "on-sale" | "upcoming" | "past";

export type TourCardData = {
  id: string;
  category: TourCategory;
  title: string;
  date: string;
  dateLabel: string;
  cities: string[];
  status: TourStatus;
  image: string;
  href?: string;
};

export type TourFilter = "whats-on" | TourCategory | "past";

export const homeTourFilters: { label: string; value: TourFilter }[] = [
  { label: "What's on", value: "whats-on" },
  { label: "Anime Concerts", value: "anime-concert" },
  { label: "Gaming Concerts", value: "gaming-concert" },
  { label: "Classic Concerts", value: "classical-recital" },
  { label: "Exhibitions", value: "exhibition" },
  { label: "Past Event", value: "past" },
];

export const tourTypeFilters: { label: string; value: TourFilter }[] = [
  { label: "Anime Concerts", value: "anime-concert" },
  { label: "Gaming Concerts", value: "gaming-concert" },
  { label: "Classic Concerts", value: "classical-recital" },
  { label: "Exhibitions", value: "exhibition" },
  { label: "Lucid Live", value: "lucid" },
];

export const tourCategoryLabels: Record<TourCategory, string> = {
  "anime-concert": "Anime concerts",
  "gaming-concert": "Gaming Concerts",
  "classical-recital": "Classic Concerts",
  exhibition: "Exhibitions",
  lucid: "Lucid Live",
};

export const tourCategoryColors: Record<TourCategory, string> = {
  "anime-concert": "#A7B4C2",
  "gaming-concert": "#595C64",
  "classical-recital": "#AEACA6",
  exhibition: "#F8F8F3",
  lucid: "#68635D",
};

export const tourHighlights: TourCardData[] = [
  {
    id: "mischa-maisky-recital",
    category: "classical-recital",
    title: "Mischa Maisky in Recital with Lily Maisky",
    date: "2026-11-12",
    dateLabel: "Nov 2026",
    cities: ["Melbourne", "Sydney", "Brisbane", "Perth"],
    status: "on-sale",
    image:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "naruto-symphonic-experience",
    category: "anime-concert",
    title: "NARUTO: The Symphonic Experience",
    date: "2026-10-08",
    dateLabel: "Oct 2026",
    cities: ["Sydney", "Melbourne"],
    status: "on-sale",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "joe-hisaishi-symphonic-stories",
    category: "anime-concert",
    title: "Symphonic Stories: Anime Worlds Live",
    date: "2026-09-06",
    dateLabel: "Sep 2026",
    cities: ["Sydney", "Melbourne", "Brisbane"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "rachmaninov-piano-nights",
    category: "classical-recital",
    title: "Rachmaninov Piano Nights",
    date: "2026-08-28",
    dateLabel: "Aug 2026",
    cities: ["Melbourne", "Perth"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "attack-on-titan-world-tour",
    category: "anime-concert",
    title: '"Attack on Titan" - Beyond the Walls World Tour',
    date: "2026-07-16",
    dateLabel: "Jul 2026",
    cities: ["Melbourne"],
    status: "on-sale",
    image:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "game-worlds-live",
    category: "gaming-concert",
    title: "Game Worlds Live: Orchestral Quest",
    date: "2026-06-18",
    dateLabel: "Jun 2026",
    cities: ["Adelaide", "Sydney"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "chamber-masters-australia",
    category: "classical-recital",
    title: "Chamber Masters Australia",
    date: "2026-05-12",
    dateLabel: "May 2026",
    cities: ["Canberra", "Melbourne"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "one-piece-piano-symphony",
    category: "anime-concert",
    title: "ONE PIECE Piano Symphony",
    date: "2026-04-22",
    dateLabel: "Apr 2026",
    cities: ["Melbourne", "Sydney"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "juan-diego-florez",
    category: "classical-recital",
    title: "Juan Diego Florez in Recital",
    date: "2025-12-02",
    dateLabel: "Dec 2025",
    cities: ["Melbourne", "Sydney", "Adelaide"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "demon-slayer-in-concert",
    category: "anime-concert",
    title: "Demon Slayer: Kimetsu no Yaiba In Concert",
    date: "2025-10-18",
    dateLabel: "Oct 2025",
    cities: ["Singapore", "Sydney", "Melbourne"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ray-chen-recital",
    category: "classical-recital",
    title: "Ray Chen in Recital",
    date: "2025-09-10",
    dateLabel: "Sep 2025",
    cities: ["Melbourne", "Sydney", "Brisbane"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "final-fantasy-piano-concert",
    category: "gaming-concert",
    title: "Crystalline Resonance FINAL FANTASY Piano Concert",
    date: "2025-03-08",
    dateLabel: "Feb-Mar 2025",
    cities: ["Sydney", "Melbourne", "Auckland"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "maxim-vengerov",
    category: "classical-recital",
    title: "Maxim Vengerov",
    date: "2024-08-22",
    dateLabel: "Aug 2024",
    cities: ["Brisbane", "Melbourne", "Sydney"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "milos-classical-guitar",
    category: "classical-recital",
    title: "MILOS: The Classical Guitar Hero",
    date: "2023-11-16",
    dateLabel: "Nov 2023",
    cities: ["Sydney", "Melbourne", "Perth"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "yiruma-oceania-tour",
    category: "classical-recital",
    title: "Yiruma Piano Oceania Tour: Autumn Rain",
    date: "2017-05-01",
    dateLabel: "2017",
    cities: ["Auckland", "Sydney", "Brisbane", "Taipei"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sheng-zhongguo",
    category: "classical-recital",
    title: "Sheng Zhongguo Violin Concert",
    date: "2015-07-12",
    dateLabel: "Jul 2015",
    cities: ["Melbourne"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lucid-live-showcase",
    category: "lucid",
    title: "Lucid Live Showcase",
    date: "2026-12-01",
    dateLabel: "TBA 2026",
    cities: ["Melbourne", "Sydney"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lucid-live-sessions",
    category: "lucid",
    title: "Lucid Live Sessions",
    date: "2026-11-01",
    dateLabel: "TBA 2026",
    cities: ["Melbourne"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lucid-orchestra-series",
    category: "lucid",
    title: "Lucid Orchestra Series",
    date: "2026-10-01",
    dateLabel: "TBA 2026",
    cities: ["Sydney", "Melbourne"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lucid-piano-collection",
    category: "lucid",
    title: "Lucid Piano Collection",
    date: "2026-09-01",
    dateLabel: "TBA 2026",
    cities: ["Melbourne", "Brisbane"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lucid-chamber-nights",
    category: "lucid",
    title: "Lucid Chamber Nights",
    date: "2026-08-01",
    dateLabel: "TBA 2026",
    cities: ["Canberra", "Melbourne"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lucid-special-event",
    category: "lucid",
    title: "Lucid Special Event",
    date: "2026-07-01",
    dateLabel: "TBA 2026",
    cities: ["Sydney"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
  },
];

export const homeTourHighlights = tourHighlights.filter(
  (tour) => tour.category !== "lucid",
);
