import { queryWixCollection, sortAsc, visibleFilter } from "@/lib/wix/client";
import {
  normalizeEventGalleryImage,
  normalizeEventVideo,
  normalizeTourDate,
  sortByOrder,
} from "@/lib/wix/normalizers";

export async function getTourDates(eventIdOrSlug: string) {
  const items = await queryWixCollection("TourDates", {
    filter: visibleFilter({ event: eventIdOrSlug }),
    sort: sortAsc("date"),
  });

  return sortByOrder(items.map(normalizeTourDate));
}

export async function getEventVideos(eventIdOrSlug: string) {
  const items = await queryWixCollection("EventVideos", {
    filter: visibleFilter({ event: eventIdOrSlug }),
    sort: sortAsc("order"),
  });

  return sortByOrder(items.map(normalizeEventVideo));
}

export async function getEventGallery(eventIdOrSlug: string) {
  const items = await queryWixCollection("EventGallery", {
    filter: visibleFilter({ event: eventIdOrSlug }),
    sort: sortAsc("order"),
  });

  return sortByOrder(items.map(normalizeEventGalleryImage));
}
