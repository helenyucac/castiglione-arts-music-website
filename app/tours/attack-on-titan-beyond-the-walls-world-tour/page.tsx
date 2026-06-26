import type { Metadata } from "next";
import { EventDetailPage } from "@/components/EventDetailPage";
import { attackOnTitanEventDetail } from "@/data/eventDetails";
import { getResolvedEventDetailBySlug } from "@/lib/wix/eventDetailContent";

const attackOnTitanDescription =
  "An epic anime concert experience bringing the iconic Attack on Titan soundtrack and immersive visuals to the concert hall.";

export async function generateMetadata(): Promise<Metadata> {
  const event = await getResolvedEventDetailBySlug(attackOnTitanEventDetail.slug);
  const title =
    event?.seoTitle ?? '"Attack on Titan" - Beyond the Walls World Tour | Castiglione';
  const description = event?.seoDescription ?? attackOnTitanDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function AttackOnTitanBeyondTheWallsWorldTourPage() {
  const event = await getResolvedEventDetailBySlug(attackOnTitanEventDetail.slug);

  return <EventDetailPage event={event ?? attackOnTitanEventDetail} />;
}
