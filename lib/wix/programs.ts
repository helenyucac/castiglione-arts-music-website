import { queryWixCollection, sortAsc, visibleFilter } from "@/lib/wix/client";
import { normalizeProgramItem } from "@/lib/wix/normalizers";

export async function getPrograms() {
  const items = await queryWixCollection("Programs", {
    filter: visibleFilter(),
    sort: sortAsc("order"),
  });

  return items.map(normalizeProgramItem).sort((first, second) => first.order - second.order);
}

export async function getProgramBySlug(slug: string) {
  const items = await queryWixCollection("Programs", {
    filter: visibleFilter({ slug }),
    limit: 1,
  });

  return items[0] ? normalizeProgramItem(items[0]) : null;
}
