import type { Metadata } from "next";
import { EventDetailPage } from "@/components/EventDetailPage";
import { attackOnTitanEventDetail } from "@/data/eventDetails";

const attackOnTitanDescription =
  "An epic anime concert experience bringing the iconic Attack on Titan soundtrack and immersive visuals to the concert hall.";

export const metadata: Metadata = {
  title: '"Attack on Titan" - Beyond the Walls World Tour | Castiglione',
  description: attackOnTitanDescription,
  openGraph: {
    title: '"Attack on Titan" - Beyond the Walls World Tour | Castiglione',
    description: attackOnTitanDescription,
  },
  twitter: {
    title: '"Attack on Titan" - Beyond the Walls World Tour | Castiglione',
    description: attackOnTitanDescription,
  },
};

export default function AttackOnTitanBeyondTheWallsWorldTourPage() {
  return <EventDetailPage event={attackOnTitanEventDetail} />;
}
