import type { Metadata } from "next";
import { EventDetailPage } from "@/components/EventDetailPage";
import { narutoEventDetail } from "@/data/eventDetails";

const narutoDescription =
  "Naruto: The Symphonic Experience brings the iconic music and emotional world of the beloved anime series into the concert hall.";

export const metadata: Metadata = {
  title: "Naruto: The Symphonic Experience | Castiglione",
  description: narutoDescription,
  openGraph: {
    title: "Naruto: The Symphonic Experience | Castiglione",
    description: narutoDescription,
    images: [
      {
        url: narutoEventDetail.heroImage,
        width: 2400,
        height: 1350,
        alt: narutoEventDetail.heroAlt,
      },
    ],
  },
  twitter: {
    title: "Naruto: The Symphonic Experience | Castiglione",
    description: narutoDescription,
  },
};

export default function NarutoTheSymphonicExperiencePage() {
  return <EventDetailPage event={narutoEventDetail} />;
}
