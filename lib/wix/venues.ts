import { queryWixCollection, visibleFilter } from "@/lib/wix/client";
import { normalizeVenue } from "@/lib/wix/normalizers";

export async function getVenues() {
  const items = await queryWixCollection("Venues", {
    filter: visibleFilter(),
    sort: [{ fieldName: "venueName", order: "ASC" }],
  });

  return items.map(normalizeVenue).sort((first, second) =>
    first.venueName.localeCompare(second.venueName),
  );
}
