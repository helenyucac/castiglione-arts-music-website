import { queryWixCollection, sortAsc } from "@/lib/wix/client";
import { normalizeProgramItem } from "@/lib/wix/normalizers";

export async function getPrograms() {
  const items = await queryWixCollection("Programs", {
    sort: sortAsc("order"),
    limit: 1000,
  });

  return items
    .map(normalizeProgramItem)
    .filter((program) => program.isVisible)
    .sort((first, second) => first.order - second.order);
}

export async function getProgramBySlug(slug: string) {
  const items = await queryWixCollection("Programs", {
    filter: { slug },
    limit: 1,
  });

  const program = items[0] ? normalizeProgramItem(items[0]) : null;
  return program?.isVisible ? program : null;
}
