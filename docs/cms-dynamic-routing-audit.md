# CMS Dynamic Routing Audit

Phase 6.1 audit for preparing CMS-driven event detail routes without changing current public routes, UI, layout, styling, Wix data, or import CSV files.

## Current Tour Routes

| Route | File | Type | Current Data Flow |
| --- | --- | --- | --- |
| `/tours` | `app/tours/page.tsx` | Tours archive/listing | CMS-first listing data with local fallback through `lib/wix/listingData.ts` |
| `/tours/naruto-the-symphonic-experience` | `app/tours/naruto-the-symphonic-experience/page.tsx` | Hardcoded static event detail route | Calls `getResolvedEventDetailBySlug(narutoEventDetail.slug)` and falls back to `narutoEventDetail` |
| `/tours/attack-on-titan-beyond-the-walls-world-tour` | `app/tours/attack-on-titan-beyond-the-walls-world-tour/page.tsx` | Hardcoded static event detail route | Calls `getResolvedEventDetailBySlug(attackOnTitanEventDetail.slug)` and falls back to `attackOnTitanEventDetail` |

There is currently no `app/tours/[slug]/page.tsx` dynamic route.

## Existing CMS-First Functions

| Area | File | Functions | Notes |
| --- | --- | --- | --- |
| Events | `lib/wix/events.ts` | `getEvents()`, `getFeaturedHomeEvents()`, `getEventsByProgram(program)`, `getEventBySlug(slug)` | Supports CMS event listings and single event lookup by slug. Normalizes Wix event rows to card/listing shape. |
| Event detail content | `lib/wix/eventDetailContent.ts` | `getResolvedEventDetailBySlug(slug)` | Merges CMS event primary content and associated sections into the existing `EventDetailData` shape. Currently requires a local fallback entry in `eventDetailsBySlug`. |
| Tour dates | `lib/wix/eventDetails.ts` | `getTourDates(eventIdOrSlug, alternateEventIds?)` | Supports matching by slug, id, reference id, and reference object. Sorts by `order`, then date. Falls back through the event detail resolver. |
| Event videos | `lib/wix/eventDetails.ts` | `getEventVideos(eventIdOrSlug, alternateEventIds?)` | Supports matching by slug, id, reference id, and reference object. Optional trailer behavior is preserved by resolver fallback. |
| Event gallery | `lib/wix/eventDetails.ts` | `getEventGallery(eventIdOrSlug, alternateEventIds?)` | Supports matching by slug, id, reference id, and reference object. Sorts by `order`, then Wix return/upload order. |
| Partners | `lib/wix/partners.ts` | `getPartners()`, `getPartnersByEvent(eventIdOrSlug, alternateEventIds?)` | Supports event matching by slug, id, reference id, and reference object. Filters hidden records. |
| Venues | `lib/wix/venues.ts` | `getVenues()` | Provides venue normalization for tour-date venue matching. Current visible UI still receives venue text. |
| Testimonials | `lib/wix/testimonials.ts` | `getTestimonials(filter?)`, `getTestimonialsByEvent(eventIdOrSlug, alternateEventIds?)` | Supports event matching by slug, id, reference id, and reference object. Data is prepared but no testimonial UI is currently rendered. |

## Current Event Detail Resolver Behavior

`getResolvedEventDetailBySlug(slug)` already performs CMS-first resolution for the two current hardcoded event pages:

1. Looks up local fallback from `eventDetailsBySlug[slug]`.
2. If local fallback is missing, returns `null`.
3. If Wix is not configured, returns local fallback.
4. If Wix event exists, merges CMS fields over the local fallback.
5. Fetches TourDates, EventVideos, EventGallery, Partners, Venues, and Testimonials from CMS.
6. Falls back section-by-section to local data if CMS data is missing, empty, invalid, or unavailable.

This is safe for existing static routes. It is not yet enough for CMS-only dynamic routes, because a CMS event without a matching local `data/eventDetails.ts` slug currently resolves to `null`.

## Missing Functions / Gaps

| Gap | Impact | Recommended Fix |
| --- | --- | --- |
| CMS-only event detail resolver | A future `/tours/[slug]` page cannot render events that exist only in Wix CMS and not in `eventDetailsBySlug`. | Extend the resolver or add a new resolver that can normalize a CMS `Events` record into `EventDetailData` without requiring a local fallback. |
| Safe defaults for CMS-only detail pages | CMS-only records may be missing hero image, breadcrumb, CTA labels, related copy, or required display fields. | Define field-level defaults and a minimum required-field guard before rendering. |
| Dynamic route metadata helper | Static pages currently have per-route `generateMetadata()`. A dynamic route needs slug-based metadata from CMS with fallback. | Add metadata resolution beside the dynamic page once the CMS-only detail resolver is ready. |
| `notFound()` policy | Unknown slugs need a clean 404 instead of empty or broken detail pages. | Use `notFound()` when neither CMS nor local fallback can resolve a slug. |
| Static params strategy | Build/deploy behavior depends on whether dynamic route is SSR, ISR, or pre-generated. | Decide whether to use dynamic rendering, `generateStaticParams()`, or ISR after confirming deployment requirements. |
| Canonical/static route transition plan | Static Naruto/AOT pages and a dynamic sibling could both represent the same conceptual route. | Keep static pages during transition. Exact static routes take precedence over `[slug]`; remove them only after dynamic parity is confirmed. |

## Can `app/tours/[slug]/page.tsx` Be Added Safely?

Routing-wise, yes. In the Next.js App Router, exact static routes such as:

- `app/tours/naruto-the-symphonic-experience/page.tsx`
- `app/tours/attack-on-titan-beyond-the-walls-world-tour/page.tsx`

can coexist with a dynamic sibling route:

- `app/tours/[slug]/page.tsx`

The exact static routes remain more specific and should continue to handle their current URLs. `app/tours/page.tsx` also remains separate from `[slug]`.

Data-wise, not yet. The current detail resolver still requires a local fallback entry in `data/eventDetails.ts`, so a dynamic route would not yet unlock true CMS-only event pages. Adding `[slug]` before fixing that resolver would create a route that only works for events already hardcoded locally, which is not the goal of Phase 6.

Recommendation: do not add `app/tours/[slug]/page.tsx` in this phase.

## Safest Implementation Plan

1. Keep the existing static event detail pages in place.
2. Extend the event detail resolver so a CMS `Events` record can be normalized into the current `EventDetailData` shape even when no local fallback exists.
3. Add a minimum required-field check for CMS-only event pages:
   - `slug`
   - `title`
   - `categoryLabel` or program/category mapping
   - `heroImage` or a defined fallback image
   - `aboutBody` / description or a defined empty-state policy
4. Add dynamic metadata resolution for slug-based pages.
5. Add `app/tours/[slug]/page.tsx` using the same `EventDetailPage` component and `notFound()` for unresolved slugs.
6. Test with one CMS-only event slug in preview.
7. Keep the existing static Naruto/AOT pages during the transition.
8. After parity is confirmed, decide whether to remove static pages, keep them as explicit overrides, or convert them into redirects/canonicalized dynamic pages.

## Risks

| Risk | Notes | Mitigation |
| --- | --- | --- |
| CMS-only events with incomplete fields | Could render a visually broken detail page if defaults are too permissive. | Add strict minimum required fields before rendering. |
| Duplicate content | Static and dynamic pages could theoretically represent the same slug if transition is not managed. | Static routes should take precedence, but set canonical strategy before removing static pages. |
| Missing media assets | Wix records may have placeholder or empty media fields. | Keep local fallback when available; define default behavior for CMS-only records. |
| Reference shape variance | Wix references may arrive as ids, objects, or nested records. | Existing helpers already support several forms; keep normalization isolated in `lib/wix`. |
| Build behavior uncertainty | Dynamic route behavior depends on deployment settings and caching strategy. | Choose SSR/ISR/static generation explicitly in the implementation phase. |

## Should Existing Static Pages Remain?

Yes. The existing static pages should remain during the transition because they are stable public routes, already CMS-first where data exists, and provide local fallback for critical event pages.

## Suggested Next Implementation Step

Implement a CMS-only event detail resolver without creating the dynamic route yet. The resolver should:

1. Try CMS `Events` by slug.
2. Merge over local fallback when local fallback exists.
3. Build a safe `EventDetailData` object from CMS-only records when no local fallback exists.
4. Preserve section-level fallbacks for TourDates, EventVideos, EventGallery, Partners, Venues, and Testimonials.
5. Return `null` only when neither CMS nor local data can produce a safe detail page.

Once that resolver is tested, create `app/tours/[slug]/page.tsx` in the next phase.
