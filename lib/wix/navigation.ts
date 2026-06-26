import { queryWixCollection, sortAsc, visibleFilter } from "@/lib/wix/client";
import { filterByLocation, normalizeNavigationLink, normalizeSocialLink } from "@/lib/wix/normalizers";
import type { NavigationLocation, SocialLocation } from "@/lib/wix/types";

export async function getNavigationLinks(location?: NavigationLocation | string) {
  const items = await queryWixCollection("NavigationLinks", {
    filter: visibleFilter(location ? { location } : {}),
    sort: sortAsc("order"),
  });

  return filterByLocation(items.map(normalizeNavigationLink), location);
}

export async function getSocialLinks(location?: SocialLocation | string) {
  const items = await queryWixCollection("SocialLinks", {
    filter: visibleFilter(location ? { location } : {}),
    sort: sortAsc("order"),
  });

  return filterByLocation(items.map(normalizeSocialLink), location);
}
