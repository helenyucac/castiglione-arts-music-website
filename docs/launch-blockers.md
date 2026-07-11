# Launch Blocker Audit

Scope: Programs, What's On, Partnership, Enquire, and Event Detail pages only.

This audit intentionally excludes cosmetic spacing, subjective design feedback, future CMS improvements, and non-blocking SEO polish. It reports only Critical and High launch blockers.

## Summary

| Severity | Count |
| --- | ---: |
| Critical | 1 |
| High | 3 |
| Total | 4 |

## Critical

| Page / Area | Issue | Reason | Recommended Fix |
| --- | --- | --- | --- |
| Partnership / Enquire | Enquiry forms do not submit to a real destination. | `components/PartnershipForm.tsx` and `components/ContactForm.tsx` call `preventDefault()` and only show a local preview success state. User submissions, files, and contact enquiries are not delivered anywhere in production. | Connect the forms to a real backend, Wix form endpoint, CRM, or email service before launch. If the production form backend is not ready, replace the form CTA with a clear mailto/contact option. |

## High

| Page / Area | Issue | Reason | Recommended Fix |
| --- | --- | --- | --- |
| Programs / What's On / Tours listing / Related event cards | Event cards can become broken or no-op links when `href` is missing. | `components/WhatsOnEventCard.tsx` and `components/TourCard.tsx` fall back to `"#"` when an event does not have a resolved `href`. CMS records with missing slugs, or local fallback events without detail routes, can render clickable cards that do not navigate to an event page. | Require valid slugs for all launch-visible event cards, hide cards without a valid route, or render non-clickable cards with a clear unavailable state. |
| Event Detail | CMS-only event detail pages can render empty required sections. | `lib/wix/eventDetailContent.ts` creates CMS-only fallback event data with `description: []` and `tourDates: []`. `components/EventDetailPage.tsx` always renders the About and Tour Dates sections, so a CMS event missing long copy or tour date records can show empty production sections. | Treat About copy and Tour Dates as required for publishable CMS events, or hide those sections when their resolved arrays are empty. |
| Event Detail | CMS-only event detail pages without media use the Naruto hero image as a fallback. | `lib/wix/eventDetailContent.ts` sets `DEFAULT_EVENT_HERO_IMAGE` to `/media/naruto-hero.jpg`. Any CMS-only event without a hero/poster/card image can display unrelated Naruto artwork on its event page. | Require a CMS hero/card image before publishing an event, or replace the fallback with a neutral Castiglione placeholder that is safe for any event. |

## Checks With No Launch Blocker Found

- Programs and What's On listing pages have CMS-first loading with local fallback paths.
- Header navigation includes desktop and mobile navigation, and the Enquire CTA has a fallback destination.
- The dynamic event route exists at `/tours/[slug]` and correctly calls `notFound()` when no event can be resolved.
- Trailer Video and Photo Gallery sections are optional and do not render when their resolved data is missing.
- Existing static event pages for Naruto and Attack on Titan continue to use the shared Event Detail UI.

## Validation

Passed:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

Note: pnpm printed a registry metadata warning because network access is restricted in this environment, but each validation command exited successfully.
