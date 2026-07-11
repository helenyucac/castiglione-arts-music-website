# Production SEO Audit

Date: 2026-07-03

Scope audited:

- Home (`/`)
- About (`/about`)
- Programs section and program landing pages (`/programs/concerts`, `/programs/music-festival`, `/programs/exhibitions`)
- Partnership (`/partnerships`)
- Contact (`/contact`)
- Tours listing (`/tours`)
- Event Detail pages (`/tours/[slug]`, `/tours/naruto-the-symphonic-experience`, `/tours/attack-on-titan-beyond-the-walls-world-tour`)

This audit is report-only. No code, metadata, CMS data, CSV files, or UI were changed.

## Executive Summary

The site builds successfully and has page-level titles/descriptions on most routes, but it is not production-complete from an SEO standpoint. The largest gaps are missing canonical URLs, missing sitemap/robots files, missing Open Graph/Twitter images, duplicate generic page titles, and missing structured data.

External link HTTP checks could not be completed in this sandbox because outbound DNS/network access failed. Internal links and anchors were checked statically.

## Page Metadata Coverage

| Page | Title | Meta Description | Canonical | OG Title / Description | OG Image | Twitter Card | Robots | Structured Data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home `/` | Present via root metadata | Present via root metadata | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| About `/about` | Present | Present | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| Programs: Concert `/programs/concerts` | Present | Present | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| Programs: Live Music `/programs/music-festival` | Present | Present | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| Programs: Exhibition `/programs/exhibitions` | Present | Present | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| Partnership `/partnerships` | Present | Present | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| Contact `/contact` | Present, but duplicate/generic | Present | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| Tours `/tours` | Present, but duplicate/generic | Present | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| Dynamic Event `/tours/[slug]` | Generated from resolved event | Generated from resolved event | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| Naruto static event | Generated from resolved event/local fallback | Generated from resolved event/local fallback | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |
| Attack on Titan static event | Generated from resolved event/local fallback | Generated from resolved event/local fallback | Missing | Present | Missing | Present, no image | Missing explicit directive | Missing |

## Critical Issues

No critical SEO blockers were found in the audited source. The site builds and the core audited routes exist, with the exception noted below about the missing top-level `/programs` index route.

## High Priority

| Issue | Pages Affected | Reason | Recommended Fix |
| --- | --- | --- | --- |
| Canonical URLs are missing site-wide. | All audited pages | No page defines `alternates.canonical`, and there is no `metadataBase` configured. Search engines may index duplicate URL variants and social metadata cannot reliably resolve absolute URLs. | Add a production base URL and canonical URL for every static and dynamic route. |
| Open Graph images and Twitter images are missing site-wide. | All audited pages | Metadata includes OG/Twitter titles and descriptions, but no `openGraph.images` or `twitter.images`. Shared links may appear without rich previews. | Define a default site OG image and page-specific/event-specific OG images where available. |
| No sitemap is implemented. | All audited pages | There is no `app/sitemap.ts` or `public/sitemap.xml`. Search engines do not receive a complete crawl map for static pages, program pages, tours, or dynamic event URLs. | Generate a sitemap covering home, static pages, program pages, tours listing, and all visible CMS/local event detail URLs. |
| No robots file is implemented. | Site-wide | There is no `app/robots.ts` or `public/robots.txt`. Crawling defaults are likely permissive, but production crawler guidance and sitemap discovery are missing. | Add `robots.txt` with production crawl rules and sitemap location. |
| Duplicate/generic titles are used on important pages. | Home, Contact, Tours | Home defaults to `Castiglione`; Contact also uses `Castiglione`; Tours also uses `Castiglione`. Duplicate titles reduce search-result clarity and make pages harder to distinguish. | Give Contact and Tours unique titles, e.g. `Contact | Castiglione` and `Tours | Castiglione`. |

## Medium Priority

| Issue | Pages Affected | Reason | Recommended Fix |
| --- | --- | --- | --- |
| Structured data is not implemented. | Home, Programs, Event Detail pages, Contact | No JSON-LD or equivalent structured data was found. Event pages especially miss the opportunity to expose `Event`, `Organization`, `WebSite`, and breadcrumb data. | Add structured data for Organization/WebSite globally, BreadcrumbList for navigable pages, and Event schema for event detail pages with dates, venue, ticket URL, image, and status. |
| Event card image alt text is empty. | Home What's On, Program pages, Tours listing, Related event cards | `WhatsOnEventCard` and `TourCard` render event images with `alt=""`. These images communicate event identity and should not be treated as purely decorative. | Use event title/category as alt text or add a dedicated image alt field in CMS/local data. |
| Event detail metadata lacks image-specific social sharing. | Event Detail pages | Dynamic and static event metadata generate title/description but do not pass the event hero/card image to OG/Twitter metadata. | Use resolved event hero/card image for `openGraph.images` and `twitter.images`, with a neutral fallback. |
| Top-level `/programs` route is absent. | Programs information architecture | The project has program landing pages and a homepage Programs section, but no `/programs` index page. This is not currently an internal broken link because navigation points to `/#programs`, but external users/search engines may expect `/programs`. | Either create a `/programs` index page or ensure it is not referenced in sitemap, redirects, or external campaigns. |
| External links could not be HTTP-verified in this environment. | Social links and ticketing/source URLs | Static extraction found external URLs, but sandbox DNS/network access returned `ENOTFOUND`; therefore HTTP status verification was not possible here. | Run a production link checker from an environment with outbound network access before launch. |

## Low Priority

| Issue | Pages Affected | Reason | Recommended Fix |
| --- | --- | --- | --- |
| Favicon/icon files are missing from the app/public roots. | Site-wide | No `app/icon.*`, `app/favicon.ico`, `public/favicon.ico`, or manifest icon was found. Browser tabs and search surfaces may show a default icon. | Add favicon and app icons in standard Next.js locations. |
| Viewport metadata is not explicitly declared. | Site-wide | Next.js provides a default viewport, so this is not a blocker. A project-level explicit viewport can make intent clearer. | Optional: export a viewport configuration from `app/layout.tsx` if the team wants explicit control. |
| Robots directives are not explicit in page metadata. | Site-wide | Pages do not define per-page `robots` metadata. This is acceptable if all pages should be indexable, but production intent is not documented in metadata. | Optional: set global index/follow robots metadata and override pages that should not be indexed. |

## Duplicate Metadata

| Type | Duplicate Value | Pages |
| --- | --- | --- |
| Title | `Castiglione` | Home, Contact, Tours |

No duplicate meta descriptions were found among the inspected static page source strings, though CMS-driven event descriptions should be checked after production data is fully populated.

## Link Audit

### Internal Links

Static internal links found in source resolve to existing routes or existing homepage anchors:

- `/`
- `/about`
- `/partnerships`
- `/tours`
- `/tours/naruto-the-symphonic-experience`
- `/tours/attack-on-titan-beyond-the-walls-world-tour`
- `/#programs`
- `/#whats-on`
- `#tour-dates` on event detail pages when tour dates exist

No statically detectable broken internal links were found.

### External Links

External URLs found include:

- Social links: Instagram, Facebook, TikTok, YouTube, Rednote/Xiaohongshu
- Ticketing links: Ticketek, Flicket, Arts Centre Melbourne, Melbourne Recital Centre, City Recital Hall
- Source/fallback media links: Castiglione legacy URLs and Unsplash image URLs

HTTP status checks were not completed because this environment cannot resolve external DNS. Run an external link checker in production or CI with network access.

## Technical Metadata Checks

| Check | Result |
| --- | --- |
| Language tag | Present: `<html lang="en">` |
| Viewport tag | Not explicitly defined; Next.js default viewport is expected |
| Favicon | Missing |
| Sitemap | Missing |
| Robots.txt | Missing |
| Canonical URLs | Missing |
| OG title/description | Present |
| OG image | Missing |
| Twitter Card metadata | Present, but missing image |
| Structured data | Missing |

## Recommended Fixes

1. Add production URL configuration and canonical URLs.
2. Add default and page-specific Open Graph/Twitter images.
3. Add `app/sitemap.ts` and include all visible CMS/local event routes.
4. Add `app/robots.ts` with sitemap discovery.
5. Make Contact and Tours titles unique.
6. Add Event/Organization/Breadcrumb structured data.
7. Populate meaningful alt text for event card images.
8. Add favicon/app icons.
9. Run a production external link checker after deployment or from CI with network access.

## Validation

Passed:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

Note: pnpm printed a registry metadata warning because outbound network access is restricted in this environment, but all validation commands exited successfully.
