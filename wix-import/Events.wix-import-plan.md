# Events Wix Import Plan

Import file: `wix-import/Events.import-ready-v2.csv`

This plan is for importing the Events draft into the existing Wix CMS `Events` collection. It does not require any frontend code changes.

## 1. Import Safety

`Events.import-ready-v2.csv` is structurally safe to import as a draft/update file.

Validation status:

| Check | Result |
| --- | --- |
| Same headers as previous import-ready draft | PASS |
| Same row count | PASS, 64 rows |
| No empty slugs | PASS |
| No `MANUAL` slugs | PASS |
| No duplicate slugs | PASS |
| No invalid slugs | PASS |
| No literal `OPTIONAL` in `sourceUrl` or `ticketPrimaryUrl` | PASS |

Important: this file is structurally ready, but not content-final. It still contains known non-blocking content issues, especially placeholder images and blank optional URLs.

## 2. Recommended Wix Import Mode

Recommended mode: **Update existing records**.

Matching key:

1. Preferred: `_id`
2. Fallback: `slug`

Use `_id` only if the Wix `Events` collection contains `_id` as a custom editable field matching this CSV. If Wix treats `_id` as a system field and does not allow matching on it, use `slug` instead.

Do not use create-only import if the `Events` collection already contains these records. Create-only import may duplicate all 64 events.

If the `Events` collection is currently empty, use create/import new records, but confirm that the collection fields are correctly mapped before importing.

## 3. Exact Wix UI Steps

1. Open Wix Dashboard.
2. Go to **Content Manager**.
3. Open the `Events` collection.
4. Confirm you are in the correct site and collection.
5. Create a backup/export of the current `Events` collection before importing.
6. Click **Import** or **More Actions → Import CSV**.
7. Upload `wix-import/Events.import-ready-v2.csv`.
8. Choose import mode:
   - If records already exist: choose **Update existing items**.
   - If collection is empty: choose **Add new items**.
9. For update mode, choose the matching field:
   - First choice: `_id`
   - If unavailable: `slug`
10. Review the field mapping screen.
11. Map columns according to the table below.
12. Confirm that Wix does not show unexpected unmapped required fields.
13. Preview the import if Wix offers a preview step.
14. Run the import.
15. After import, review several records manually before publishing.

## 4. Column Mapping

Map these CSV columns to the matching Wix `Events` collection fields:

| CSV Column | Wix Field | Map? | Notes |
| --- | --- | --- | --- |
| `_id` | `_id` or custom stable ID field | Yes | Use as update matching key if available. |
| `title` | `title` | Yes | Event display title. |
| `slug` | `slug` | Yes | Required for dynamic event pages. |
| `program` | `program` | Yes | Currently stored as display text. If Wix uses a Programs reference field, this may need reference mapping instead. |
| `categoryLabel` | `categoryLabel` | Yes | Public card/category label. Some legacy values remain intentionally preserved for now. |
| `status` | `status` | Yes | `past`, `upcoming`, or `on-sale`. |
| `cardImage` | `cardImage` | Yes, with caution | Current values include local paths and external URLs. If Wix field is Image type, local `/media/...` paths may need manual media replacement after import. |
| `eventCardDate` | `eventCardDate` | Yes | Public date display text. |
| `eventCardCities` | `eventCardCities` | Yes | Public city/location display text. |
| `sortDate` | `sortDate` | Yes | Sorting date. Confirm Wix field type is Date or Text compatible with `YYYY-MM-DD`. |
| `sourceUrl` | `sourceUrl` | Yes | Blank values are intentional where unknown/optional. |
| `isFeaturedHome` | `isFeaturedHome` | Yes | Boolean. |
| `isFeaturedProgram` | `isFeaturedProgram` | Yes | Boolean. |
| `isVisible` | `isVisible` | Yes | Boolean. |
| `ticketPrimaryUrl` | `ticketPrimaryUrl` | Yes | Blank values are intentional where unknown/optional. |
| `manualNotes` | `manualNotes` | Optional | Map only if the Wix collection includes an internal notes field. Do not expose this on the public site. |

## 5. Columns Not to Map

No required CSV column must be skipped.

Optional skip:

- `manualNotes`: skip if the Wix `Events` collection does not have an internal notes field or if the team does not want editorial notes stored in Wix.

Do not skip `slug`, `status`, `sortDate`, `isVisible`, `isFeaturedHome`, or `isFeaturedProgram`.

## 6. Before Final Import

Check these items before clicking the final import button:

1. Confirm the import mode is **Update existing items** if the collection already has Events records.
2. Confirm the matching field is `_id` or `slug`.
3. Confirm there are 64 rows in the import preview.
4. Confirm `slug` is mapped and no slugs are blank.
5. Confirm `sortDate` maps to the intended Wix field type.
6. Confirm boolean fields map correctly:
   - `isFeaturedHome`
   - `isFeaturedProgram`
   - `isVisible`
7. Confirm `cardImage` mapping behavior:
   - If the Wix field is Image type, test one row first if possible.
   - Local paths like `/media/naruto-hero.jpg` may not become Wix media automatically.
8. Confirm `program` mapping:
   - If it is a Text field, map directly.
   - If it is a Reference field to `Programs`, verify Wix can resolve references.
9. Confirm `manualNotes` is either mapped to an internal field or intentionally skipped.

## 7. After Import Checks

After the import finishes:

1. Check total `Events` collection item count.
2. Search for these records:
   - `Mischa Maisky in Recital`
   - `Chang Cheng-Yue`
   - `Oddshapes Music Festival`
   - `NARUTO: The Symphonic Experience`
   - `"Attack on Titan" - Beyond the Walls World Tour - The Official Concert`
3. Confirm these approved v2 fixes are present:
   - `Mischa Maisky in Recital` → `categoryLabel = Classical Concerts & Theatre`
   - `Oddshapes Music Festival` 2026 → `categoryLabel = Live Music & Festivals`
   - `Oddshapes Music Festival` 2026 → `status = past`
4. Confirm `Chang Cheng-Yue` is unchanged:
   - `categoryLabel = Lucid Live`
   - blank `ticketPrimaryUrl`
   - blank `sourceUrl`
5. Confirm no duplicate records were created.
6. Confirm dynamic pages still resolve by slug.
7. Confirm event listing filters still work in Preview.
8. Confirm blank optional URLs do not render broken public buttons.

## 8. Rollback Plan

Before import:

1. Export the current `Events` collection from Wix.
2. Save the export with a timestamp, for example:
   - `Events.backup-before-v2-import-YYYY-MM-DD.csv`

If import goes wrong:

1. Stop editing/publishing immediately.
2. Review whether the issue is duplicate creation or incorrect field mapping.
3. If duplicates were created:
   - Filter records by import timestamp if Wix exposes it.
   - Delete the newly imported duplicate rows.
   - Re-run import in update mode using `_id` or `slug`.
4. If fields were mapped incorrectly:
   - Re-import the pre-import backup CSV.
   - Or correct the field mapping and re-import `Events.import-ready-v2.csv`.
5. Re-test event listing pages and dynamic event pages in Preview before publishing.

## 9. Remaining Known Content Issues That Should Not Block Import

These issues are known and should not block a structural Wix import, but they should be resolved before final publishing.

### Placeholder Images

- 28 rows still use remote Unsplash images.
- 32 rows still use `/media/naruto-hero.jpg`, which appears to be a reused placeholder.
- `cardImage` values were intentionally preserved in v2.

Recommended follow-up: upload official event artwork in Wix Media Manager and replace placeholder image fields.

### Missing Optional URLs

- 58 rows have blank `sourceUrl`.
- 60 rows have blank `ticketPrimaryUrl`.
- These are not technical import blockers.
- For active/future events, review URL completeness before publishing.

Recommended follow-up: add official source/ticket URLs where available; leave blank only if past, not on sale, or intentionally not linked.

### Duplicate Titles

Some titles repeat across different years or tours, for example:

- `Oddshapes Music Festival`
- `ONE PIECE Piano Symphony`
- `Sunset Rollercoaster`
- `Crowd Lu`
- `Juan Diego Flórez in Recital`

These are acceptable if they represent distinct event years or tour instances. Slugs are unique, so they do not block import.

### Legacy Category Labels

Some `categoryLabel` values remain fine-grained labels, such as:

- `Lucid Live`
- `Anime Concerts`
- `Gaming Concerts`
- `Classical Concerts`
- `Music Festival`

These were intentionally preserved except for the approved high-priority fixes. Decide later whether to normalize all event card labels to the latest public taxonomy.

## 10. Duplicate Warning

Importing `Events.import-ready-v2.csv` in create/new-record mode against a non-empty `Events` collection may create duplicate records.

To avoid duplicates:

1. Use **Update existing items**.
2. Match on `_id` if possible.
3. If `_id` is not available as a matching field, match on `slug`.
4. Confirm the preview shows updates, not new duplicate rows.

## 11. Recommendation

Recommended import mode: **Update existing records**.

Recommended matching key: `_id` if Wix supports it as a custom field; otherwise `slug`.

Overall recommendation: proceed with a controlled import into Wix Preview / non-production CMS state, then review images, active-event URLs, and category labels before publishing.
