import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailPage } from "@/components/EventDetailPage";
import { getResolvedEventDetailBySlug } from "@/lib/wix/eventDetailContent";

type TourEventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: TourEventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getResolvedEventDetailBySlug(slug);

  if (!event) {
    notFound();
  }

  const title = event.seoTitle ?? `${event.title} | Castiglione`;
  const description = event.seoDescription ?? event.intro;

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

export default async function TourEventPage({ params }: TourEventPageProps) {
  const { slug } = await params;
  const event = await getResolvedEventDetailBySlug(slug);

  if (!event) {
    notFound();
  }

  return <EventDetailPage event={event} />;
}
