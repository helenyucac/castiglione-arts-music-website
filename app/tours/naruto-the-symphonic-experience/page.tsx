import type { Metadata } from "next";
import { EventDetailPage } from "@/components/EventDetailPage";
import { narutoEventDetail } from "@/data/eventDetails";
import { getResolvedEventDetailBySlug } from "@/lib/wix/eventDetailContent";

const narutoDescription =
  "Naruto: The Symphonic Experience brings the iconic music and emotional world of the beloved anime series into the concert hall.";

export async function generateMetadata(): Promise<Metadata> {
  const event = await getResolvedEventDetailBySlug(narutoEventDetail.slug);
  const title = event?.seoTitle ?? "Naruto: The Symphonic Experience | Castiglione";
  const description = event?.seoDescription ?? narutoDescription;

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

export default async function NarutoTheSymphonicExperiencePage() {
  const event = await getResolvedEventDetailBySlug(narutoEventDetail.slug);

  return <EventDetailPage event={event ?? narutoEventDetail} />;
}
