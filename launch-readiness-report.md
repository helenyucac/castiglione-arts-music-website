# Launch Readiness Report

Generated: 2026-07-02

Scope audited:

- Home
- Our Story
- Programs and program landing pages
- What's On / event card listings
- Partnership
- Contact
- Tours archive
- Static event detail pages
- Dynamic event detail route `/tours/[slug]`
- Header, footer, metadata, local media references, and CMS fallback paths

Notes:

- This audit did not modify UI, layout, Wix CMS data, or CSV files.
- Local `/media` and `/fonts` references used in code resolve to files in `public/`.
- Wix production content was not modified. Findings involving CMS-only records are based on the current resolver and component behavior.

## Critical

| Page | Severity | Reason | Recommended fix |
| --- | --- | --- | --- |
| Contact | Critical | The contact form prevents the default submit and only shows a front-end preview success message. No email, CRM, Wix form, or API endpoint receives the enquiry. | Connect the form to the approved Wix/CRM/email endpoint, or replace it with a clear mail/contact CTA before launch. |
| Partnership | Critical | The partnership enquiry form prevents the default submit and only sets a local success state. Uploaded files are selected in the browser but are not sent anywhere. | Connect the form and file upload to the launch submission workflow, including recipient email, storage, and success/error states. |

## High

| Page | Severity | Reason | Recommended fix |
| --- | --- | --- | --- |
| Home What's On, Program pages, Tours archive, Related event cards | High | Event cards fall back to `href="#"` when an event has no `href` or CMS slug. The local fallback data contains far fewer event links than event records, so cards can become non-navigating links if CMS data is incomplete or unavailable. | Require a valid slug for every visible CMS Event and map cards to `/tours/{slug}`. Add local fallback slugs for launch-critical cards or render non-linked archive cards intentionally. |
| Dynamic Event Detail pages | High | CMS-only events can render empty sections. `createCmsOnlyFallback()` starts with `description: []` and `tourDates: []`, while `EventDetailPage` always renders About, Tour Dates, and Related sections. | Hide About/Tour Dates/Related sections when their data arrays are empty, or make the relevant CMS fields required before publishing an event. |
| Dynamic Event Detail pages | High | CMS-only events use `/media/naruto-hero.jpg` as the default hero image when no CMS hero/card/poster image is available. This can show the wrong IP artwork on unrelated event pages. | Require hero/card image for published CMS Events, or replace the default with a neutral Castiglione fallback image. |
| Home Hero | High | The homepage hero video is a `.mov` file (`/media/video-banner-dark.mov`). Browser support for MOV is inconsistent, especially outside Safari. | Provide a web-compatible MP4/WebM hero video and keep the poster fallback image. |
| Home What's On, Program pages, Tours archive | High | Several fallback listing images are placeholders or reused artwork: the local data contains many Unsplash images, Lucid Live uses the Naruto hero image, and Music Festival cards also use the Naruto hero image. | Upload official event artwork in Wix and ensure every visible event has a proper `cardImage`; keep local fallback images brand-safe. |

## Medium

| Page | Severity | Reason | Recommended fix |
| --- | --- | --- | --- |
| All pages | Medium | Metadata does not define Open Graph or Twitter images. Pages set text metadata, but no `openGraph.images` or `twitter.images` are present. | Add a default OG/Twitter image at site level, and event-specific images for event detail pages where possible. |
| All pages | Medium | No favicon/app icon/manifest asset was found under `app/` or `public/`. | Add `favicon.ico` or Next `app/icon.*`, plus Apple/web app icons if required. |
| Tours archive | Medium | The archive filter labels still use older naming such as `Anime Concerts`, `Gaming Concerts`, `Classical Concerts`, and `Exhibitions`, while the finalized IA uses grouped labels such as `Anime & Gaming Concerts` and `Classical Concerts & Theatre`. | Align archive filter labels with the finalized category naming or intentionally document the archive taxonomy as separate. |
| Naruto and Attack on Titan event detail pages | Medium | Local fallback breadcrumbs/category labels still show `Anime Concerts` instead of the finalized `Anime & Gaming Concerts`. If CMS is unavailable, static event detail pages can show outdated category naming. | Update local event detail fallback labels to the finalized category labels. |
| Footer | Medium | The newsletter subscribe control is a button with no submit handler or integration, so email addresses are not captured. | Connect to the mailing list provider or hide/disable the form until it is wired. |
| Event cards | Medium | Card images use empty alt text. This can be acceptable only if images are decorative, but many event posters carry event identity. | Decide whether listing images are decorative; if not, use event title or CMS alt text for event card images. |
| Dynamic Event Detail pages | Medium | Related Events can render an empty "More from..." section if the same category has no future/on-sale related events. | Hide the Related Events section when the resolved related events array is empty. |
| Static and dynamic event metadata | Medium | Event detail metadata includes title and description but does not include event-specific OG images. | Use `heroImage` or `cardImage` as metadata image when available. |

## Low

| Page | Severity | Reason | Recommended fix |
| --- | --- | --- | --- |
| Tours archive and fallback listings | Low | One fallback title is missing a space: `Demon Slayer:Kimetsu no Yaiba In Concert`. | Correct the display title in local fallback data and CMS if needed. |
| Home What's On | Low | The CTA copy reads `View more event`, which is grammatically singular. | Change to `View more events` or another final approved CTA label. |
| Contact | Low | Contact page metadata title is the generic `Castiglione`, not page-specific. | Use a page-specific title such as `Contact | Castiglione`. |
| Tours archive | Low | Tours page metadata title is the generic `Castiglione`, not page-specific. | Use a page-specific title such as `Tours | Castiglione`. |
| Attack on Titan static event metadata | Low | The static metadata fallback description still uses the older short description if CMS/local SEO description is unavailable. | Update the fallback metadata description to match the current approved event copy. |

## Checks Passed

- Local routes found by the build include `/`, `/about`, `/contact`, `/partnerships`, `/programs/concerts`, `/programs/music-festival`, `/programs/exhibitions`, `/tours`, `/tours/[slug]`, and the two static event routes.
- No temporary `/api/debug/...` route appears in the current route table.
- Local public media and font references used in code are present in `public/`.
- Trailer Video and Photo Gallery sections are optional and hide when their data is absent.
- Tour date ticket links use external-link attributes in the rendered event detail component.

## Validation

- `pnpm lint`: passed
- `pnpm typecheck`: passed
- `pnpm build`: passed

Note: pnpm reported a registry metadata fetch warning in the offline/restricted environment, but `eslint`, `tsc --noEmit`, and `next build --webpack` all completed successfully with exit code 0.
