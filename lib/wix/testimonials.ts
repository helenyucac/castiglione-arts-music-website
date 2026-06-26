import { queryWixCollection, sortAsc, visibleFilter } from "@/lib/wix/client";
import { normalizeTestimonial, sortByOrder } from "@/lib/wix/normalizers";

type TestimonialFilter = {
  relatedEvent?: string;
  relatedPartner?: string;
};

export async function getTestimonials(filter: TestimonialFilter = {}) {
  const items = await queryWixCollection("Testimonials", {
    filter: visibleFilter(filter),
    sort: sortAsc("order"),
  });

  return sortByOrder(items.map(normalizeTestimonial));
}
