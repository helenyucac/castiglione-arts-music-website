# CMS Import Summary

Generated import-ready CSVs for the requested Wix CMS collections that currently have an original CSV in `wix-import/`. Existing source CSVs were not modified.

## Files Generated

| Collection | Original CSV | Import-ready CSV | Rows | Columns | Placeholders Removed | Rows Affected | Columns Cleaned |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Programs | wix-import/Programs.csv | wix-import/Programs.import-ready.csv | 4 | 8 | 4 | 4 | heroImage: 4 |

## Collections Not Generated

| Collection | Reason |
| --- | --- |
| Venues | Original CSV not found |
| Partners | Original CSV not found |
| Testimonials | Original CSV not found |
| TourDates | Original CSV not found |
| EventVideos | Original CSV not found |
| EventGallery | Original CSV not found |

## Validation

| Collection | Same Headers | Same Row Count | Invalid Exact Placeholders Remaining Outside manualNotes |
| --- | --- | --- | --- |
| Programs | PASS | PASS | 0 |

## Placeholder Cleanup Details

| Collection | Placeholder Value Removed | Count |
| --- | --- | --- |
| Programs | UPLOAD TO WIX | 4 |

## Recommended Wix Import Order

| Order | Collection | Action | Notes |
| --- | --- | --- | --- |
| 1 | Programs | Import `wix-import/Programs.import-ready.csv` | Import before Events if Events will reference Programs later. Current file has 4 rows. |
| 2 | Venues | Skip for now - original CSV not present | Import before TourDates if TourDates will reference Venues. |
| 3 | Partners | Skip for now - original CSV not present | Import before event partner references/testimonials if used. |
| 4 | Testimonials | Skip for now - original CSV not present | Can import after Events/Partners if references are used. |
| 5 | TourDates | Skip for now - original CSV not present | Import after Events, and after Venues if using venue references. |
| 6 | EventVideos | Skip for now - original CSV not present | Import after Events. |
| 7 | EventGallery | Skip for now - original CSV not present | Import after Events. |

## Manual Review Notes

| Area | Note | Recommended Action |
| --- | --- | --- |
| Programs | Placeholder values were blanked outside manualNotes. | Review blank fields before publishing. For media fields, upload/select real Wix media assets where needed. |
| Missing collections | Some requested original CSVs are not present. | Venues, Partners, Testimonials, TourDates, EventVideos, EventGallery |

## Confirmation

- Application code was not modified.
- Original CSV files were not modified or overwritten.
- Generated import-ready CSVs preserve headers and row counts.
- `manualNotes` values were intentionally left unchanged, even if they contain placeholder wording.
- No git operations were performed.
