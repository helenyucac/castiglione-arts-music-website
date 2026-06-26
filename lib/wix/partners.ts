import { queryWixCollection, sortAsc, visibleFilter } from "@/lib/wix/client";
import { normalizePartner, sortByOrder } from "@/lib/wix/normalizers";

export async function getPartners() {
  const items = await queryWixCollection("Partners", {
    filter: visibleFilter(),
    sort: sortAsc("order"),
  });

  return sortByOrder(items.map(normalizePartner));
}
