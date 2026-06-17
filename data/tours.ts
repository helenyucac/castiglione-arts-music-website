export type TourCategory =
  | "anime-concert"
  | "gaming-concert"
  | "classical-recital"
  | "exhibitions"
  | "music-festival"
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

const lucidLiveImage = "/media/naruto-hero.jpg";

export const lucidLiveEvents: TourCardData[] = [
  {
    id: "lucid-chang-cheng-yue-2026",
    category: "lucid",
    title: "Chang Cheng-Yue",
    date: "2026-08-07",
    dateLabel: "AUG 2026",
    cities: ["Sydney", "Melbourne"],
    status: "upcoming",
    image: lucidLiveImage,
  },
  {
    id: "lucid-enno-cheng-2026",
    category: "lucid",
    title: "Enno Cheng",
    date: "2026-04-24",
    dateLabel: "APR 2026",
    cities: ["Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-sunset-rollercoaster-2026",
    category: "lucid",
    title: "Sunset Rollercoaster",
    date: "2026-04-17",
    dateLabel: "APR 2026",
    cities: ["Sydney", "Melbourne"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-moon-tang-2026",
    category: "lucid",
    title: "moon tang",
    date: "2026-03-29",
    dateLabel: "MAR 2026",
    cities: ["Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-the-landlords-cat-2026",
    category: "lucid",
    title: "The Landlord's Cat",
    date: "2026-03-27",
    dateLabel: "MAR 2026",
    cities: ["Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-crowd-lu-2025",
    category: "lucid",
    title: "Crowd Lu",
    date: "2025-12-06",
    dateLabel: "DEC 2025",
    cities: ["Melbourne", "Sydney", "Auckland"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-virgin-vacation-2025",
    category: "lucid",
    title: "Virgin Vacation",
    date: "2025-10-10",
    dateLabel: "OCT 2025",
    cities: ["Melbourne"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-waa-wei-2025",
    category: "lucid",
    title: "waa wei",
    date: "2025-09-18",
    dateLabel: "SEP 2025",
    cities: ["Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-lala-hsu-2025",
    category: "lucid",
    title: "LaLa Hsu",
    date: "2025-08-28",
    dateLabel: "AUG 2025",
    cities: ["Sydney", "Melbourne"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-skai-isyourgod-2025",
    category: "lucid",
    title: "SKAI ISYOURGOD - SG",
    date: "2025-08-23",
    dateLabel: "AUG 2025",
    cities: ["Singapore"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-9m88-2025",
    category: "lucid",
    title: "9m88 - SG",
    date: "2025-06-10",
    dateLabel: "JUN 2025",
    cities: ["Singapore"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-nmixx-2025",
    category: "lucid",
    title: "NMIXX 2ND FAN CONCERT CHANGE UP: MIXX LAB IN AUSTRALIA",
    date: "2025-06-06",
    dateLabel: "JUN 2025",
    cities: ["Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-gareth-t-na-2025",
    category: "lucid",
    title: "Gareth.T - NA",
    date: "2025-04-10",
    dateLabel: "APR 2025",
    cities: ["Vancouver", "Toronto", "New York City", "San Francisco", "Los Angeles"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-wannasleep-2025",
    category: "lucid",
    title: "wannasleep",
    date: "2025-03-18",
    dateLabel: "MAR 2025",
    cities: ["Sydney", "Melbourne"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-bestards-2024",
    category: "lucid",
    title: "BESTARDS",
    date: "2024-10-24",
    dateLabel: "OCT 2024",
    cities: ["Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-831-2024",
    category: "lucid",
    title: "831",
    date: "2024-10-25",
    dateLabel: "FEB / OCT 2024",
    cities: ["Los Angeles", "New York", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-gareth-t-asia-au-2024",
    category: "lucid",
    title: "Gareth.T - ASIA&AU",
    date: "2024-09-01",
    dateLabel: "SEP 2024",
    cities: ["Kuala Lumpur", "Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-fish-leong-2024",
    category: "lucid",
    title: "Fish Leong",
    date: "2024-01-25",
    dateLabel: "JAN 2024",
    cities: ["Sydney", "Melbourne", "Auckland"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-comz-2023-2024",
    category: "lucid",
    title: "COM'Z",
    date: "2023-12-07",
    dateLabel: "DEC 2023 / JAN 2024",
    cities: ["Sydney", "Melbourne", "Singapore"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-kanho-yakushiji-2023",
    category: "lucid",
    title: "Kanho Yakushiji",
    date: "2023-10-19",
    dateLabel: "OCT 2023",
    cities: ["Sydney", "Melbourne"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-cicada-2023",
    category: "lucid",
    title: "Cicada",
    date: "2023-09-21",
    dateLabel: "SEP 2023",
    cities: ["Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-showlo-2023",
    category: "lucid",
    title: "ShowLo",
    date: "2023-09-09",
    dateLabel: "SEP 2023",
    cities: ["Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-xiaoxia-2023",
    category: "lucid",
    title: "XiaoXia",
    date: "2023-08-17",
    dateLabel: "AUG 2023",
    cities: ["Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-a-mei-2023",
    category: "lucid",
    title: "A-Mei",
    date: "2023-07-28",
    dateLabel: "JUL 2023",
    cities: ["Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-weibird-2023",
    category: "lucid",
    title: "WeiBird",
    date: "2023-06-09",
    dateLabel: "JUN 2023",
    cities: ["Sydney", "Melbourne"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-neongarden-2023",
    category: "lucid",
    title: "NeonGarden",
    date: "2023-05-30",
    dateLabel: "MAY / JUN 2023",
    cities: ["Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-the-chairs-2023",
    category: "lucid",
    title: "The Chairs",
    date: "2023-05-27",
    dateLabel: "MAY 2023",
    cities: ["Sydney", "Melbourne"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-crowd-lu-2023",
    category: "lucid",
    title: "Crowd Lu",
    date: "2023-04-12",
    dateLabel: "APR 2023",
    cities: ["Brisbane", "Melbourne", "Sydney"],
    status: "past",
    image: lucidLiveImage,
  },
  {
    id: "lucid-sunset-rollercoaster-2022",
    category: "lucid",
    title: "Sunset Rollercoaster",
    date: "2022-12-12",
    dateLabel: "DEC 2022",
    cities: ["Brisbane", "Sydney", "Melbourne"],
    status: "past",
    image: lucidLiveImage,
  },
];

export const tourHighlights: TourCardData[] = [
  {
    id: "sonica-asian-pop",
    category: "music-festival",
    title: "Sonica — A Night of Asian Pop",
    date: "2026-12-01",
    dateLabel: "DEC 2026",
    cities: ["Marina Bay, Singapore"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "oddshapes-experimental-soundscapes",
    category: "music-festival",
    title: "OddShapes — Experimental Soundscapes",
    date: "2026-11-01",
    dateLabel: "NOV 2026",
    cities: ["Royal Botanic Gardens, Sydney"],
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  },
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
    image: "/media/naruto-square-poster.png",
    href: "/tours/naruto-the-symphonic-experience",
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
    title: '"Attack on Titan" - Beyond the Walls World Tour - The Official Concert',
    date: "2026-07-07",
    dateLabel: "Jul 2026",
    cities: ["Melbourne"],
    status: "on-sale",
    image: "/media/aot-poster.jpg",
    href: "/tours/attack-on-titan-beyond-the-walls-world-tour",
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
    id: "art-beyond-boundaries",
    category: "exhibitions",
    title: "Art Beyond Boundaries",
    date: "2026-03-01",
    dateLabel: "MAR 2026",
    cities: ["Melbourne"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "immersive-worlds",
    category: "exhibitions",
    title: "Immersive Worlds",
    date: "2026-04-01",
    dateLabel: "APR 2026",
    cities: ["Sydney"],
    status: "past",
    image:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
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
  ...lucidLiveEvents,
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
      event.category === "classical-recital" ||
      event.category === "lucid",
  ),
);

export const musicFestivalProgramEvents: TourCardData[] = sortTourCardsByDateDesc([
  {
    id: "sonica-music-festival-2023",
    category: "music-festival",
    title: "Sonica Music Festival",
    date: "2023-03-01",
    dateLabel: "MAR 2023",
    cities: ["Melbourne"],
    status: "past",
    image: "/media/naruto-hero.jpg",
  },
  {
    id: "oddshapes-music-festival-2024",
    category: "music-festival",
    title: "Oddshapes Music Festival",
    date: "2024-10-01",
    dateLabel: "OCT 2024",
    cities: ["Melbourne"],
    status: "past",
    image: "/media/naruto-hero.jpg",
  },
  {
    id: "oddshapes-music-festival-2026",
    category: "music-festival",
    title: "Oddshapes Music Festival",
    date: "2026-03-01",
    dateLabel: "MAR 2026",
    cities: ["Melbourne"],
    status: "upcoming",
    image: "/media/naruto-hero.jpg",
  },
]);

export const liveMusicFestivalProgramEvents = sortTourCardsByDateDesc([
  ...musicFestivalProgramEvents,
  ...lucidLiveEvents,
]);

export const touringExhibitionProgramEvents: TourCardData[] = sortTourCardsByDateDesc([
  {
    id: "leonardo-da-vinci-taipei",
    category: "exhibitions",
    title: "The Man Behind the Myth - Leonardo Da Vinci TAIPEI",
    date: "2022-12-01",
    dateLabel: "DEC 2022",
    cities: ["TAIPEI"],
    status: "past",
    image: "/media/our-touring-footprints.jpg",
  },
  {
    id: "marilyn-the-woman-behind-the-icon",
    category: "exhibitions",
    title: "Marilyn - The Woman Behind the Icon",
    date: "2023-07-01",
    dateLabel: "JUL 2023",
    cities: ["Sydney"],
    status: "past",
    image: "/media/our-touring-footprints.jpg",
  },
]);

export const homepageWhatsOnEvents = sortTourCardsByDateDesc([
  ...whatsOnConcertEvents,
  ...musicFestivalProgramEvents,
  ...touringExhibitionProgramEvents,
]);

export const homeTourHighlights = homepageWhatsOnEvents;
