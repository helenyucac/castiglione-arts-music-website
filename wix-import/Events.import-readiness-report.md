# Events Import Readiness Report

This is a short review companion for `Events.cleaned.csv`.

## Import Readiness

- Total rows: 64
- Structurally valid rows: 64
- Content-ready rows without manual-review flags: 2
- Rows needing content/asset review: 62

## Validation

| Check | Result |
| --- | --- |
| same_row_count | PASS |
| same_column_count | PASS |
| same_columns | PASS |
| no_manual_slugs | PASS |
| no_duplicate_slugs | PASS |
| no_invalid_slugs | PASS |

## Top Manual Review Reasons

| Reason | Rows |
| --- | --- |
| reused Naruto hero image appears to be placeholder | 32 |
| legacy/fine-grained categoryLabel: Lucid Live | 29 |
| external/remote cardImage should be replaced with Wix media asset | 28 |
| Unsplash placeholder image | 28 |
| legacy/fine-grained categoryLabel: Classical Concerts | 21 |
| duplicate title; confirm this is a distinct event/year | 10 |
| legacy/fine-grained categoryLabel: Anime Concerts | 6 |
| legacy/fine-grained categoryLabel: Music Festival | 3 |
| legacy/fine-grained categoryLabel: Gaming Concerts | 3 |
| missing ticketPrimaryUrl for active/future event | 2 |
| missing sourceUrl for active/future event verification | 2 |
| status is upcoming but sortDate is before 2026-06-29 | 1 |

## Recommendation

Import can proceed technically from `Events.cleaned.csv`, but the rows listed in `Events.cleanup-report.md` should be reviewed before publishing them as final CMS content.
