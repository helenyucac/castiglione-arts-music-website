# Wix CMS Import CSVs

Generated from the current Next.js project data. These files are intended as seed/import workbooks for Wix CMS collections. No frontend code or source data files were changed to create this export.

## Files and Collections

| CSV | Wix Collection | Notes |
| --- | --- | --- |
| SiteSettings.csv | SiteSettings | One main site settings row for hero, logo, footer, contact, SEO defaults. |
| DesignSettings.csv | DesignSettings | One global design-token row. Use as CSS-variable source, not per-component typography control. |
| Programs.csv | Programs | Anime & Gaming Concerts, Classical Concerts & Theatre, Live Music & Festivals, Touring Exhibitions. |
| Events.csv | Events | All current event card rows from the shared project data. |
| TourDates.csv | TourDates | Explicit tour dates currently available for Naruto and Attack on Titan. |
| EventVideos.csv | EventVideos | Local Naruto and Attack on Titan trailer references. Upload files to Wix before binding. |
| EventGallery.csv | EventGallery | Placeholder row only. Do not publish/import as real gallery data. |
| SocialLinks.csv | SocialLinks | Footer social platforms and URLs. |
| NavigationLinks.csv | NavigationLinks | Header/mobile links, header CTA, and footer links. |
| Partners.csv | Partners | Castiglione row plus placeholder example. |
| Venues.csv | Venues | Initial venue rows derived from current tour dates and event data. |
| Testimonials.csv | Testimonials | Placeholder rows only. Do not publish as real testimonials. |

## Recommended Import Order

1. DesignSettings.csv
2. SiteSettings.csv
3. Programs.csv
4. Venues.csv
5. Partners.csv
6. Events.csv
7. TourDates.csv
8. EventVideos.csv
9. EventGallery.csv
10. SocialLinks.csv
11. NavigationLinks.csv
12. Testimonials.csv

## Fields Requiring Manual Completion

- Any value marked `MANUAL` needs editor/client confirmation before launch.
- Event slugs marked `MANUAL` do not currently have confirmed event detail URLs in the frontend.
- Venue address, website, and mapUrl values are intentionally marked `MANUAL` unless verified in current data.
- Contact phone is marked `MANUAL` because it is not present in current code.
- Source URLs and ticket URLs marked `OPTIONAL` are not present in the current data source.

## Visual Assets to Upload to Wix

Values marked `UPLOAD TO WIX` should be uploaded through Wix Media Manager and then replaced with the Wix media reference. This includes:

- Header logo: `/media/logo/castiglione-logo.png`
- Homepage video: `/media/video-banner-dark.mov`
- Naruto assets: poster/hero/trailer references currently under `/media/`
- Attack on Titan assets: poster/hero/trailer references currently under `/media/`
- Unsplash placeholder images currently used by program cards and many event cards
- Social icons if Wix CMS should manage icons as media rather than frontend icon components
- Partner logos, testimonial portraits/logos, and gallery images

## Placeholder Rows Not for Publishing

Do not publish these as real content:

- `example-gallery-row-do-not-import` in EventGallery.csv
- `partner-example-do-not-import` in Partners.csv
- `testimonial-example-homepage`, `testimonial-example-event`, `testimonial-example-partner` in Testimonials.csv

## Notes

- Events.csv intentionally keeps current card image paths/URLs for traceability, but most visual fields should be replaced by Wix-hosted media references.
- TourDates.csv references Events by the event card `_id` where a matching event card exists.
- The current frontend has optional trailer/gallery behavior planned; EventVideos and EventGallery can remain empty for events with no media.
