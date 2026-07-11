# Events Import-Ready Draft v2 Report

Generated from `Events.import-ready-draft.csv` with only the approved high-priority fixes. Original CSV files and prior drafts were not overwritten.

## Summary

- Rows processed: 64
- Columns preserved: 16
- Changed fields: 3
- Changed rows: 2

## Exact Changed Fields

| Row | ID | Title | Field | Old Value | New Value |
| --- | --- | --- | --- | --- | --- |
| 2 | mischa-maisky-recital | Mischa Maisky in Recital | categoryLabel | Classical Concerts | Classical Concerts & Theatre |
| 11 | oddshapes-music-festival-2026 | Oddshapes Music Festival | categoryLabel | Music Festival | Live Music & Festivals |
| 11 | oddshapes-music-festival-2026 | Oddshapes Music Festival | status | upcoming | past |

## Validation

| Check | Result |
| --- | --- |
| same_headers_as_import_ready_draft | PASS |
| same_row_count_as_import_ready_draft | PASS |
| no_empty_slug | PASS |
| no_manual_slug | PASS |
| no_duplicate_slug | PASS |
| no_invalid_slug | PASS |
| no_literal_optional_in_source_or_ticket | PASS |
| only_approved_3_rows_changed | PASS |

## Notes

- Mischa Maisky: category label normalized only; ticket/source URLs and image remain unchanged.
- Chang Cheng-Yue: intentionally unchanged per approval; `Lucid Live`, blank URLs, and current image are preserved.
- Oddshapes Music Festival 2026: status set to `past`; category label normalized to `Live Music & Festivals`; image remains unchanged.
- Oddshapes Music Festival 2024 was not changed.
- This v2 is safer than the previous import-ready draft because it resolves the approved taxonomy/status issues while preserving all unapproved fields.
