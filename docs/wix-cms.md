# Wix CMS

This document is the permanent maintenance guide for verified Wix CMS collection
IDs used by this project.

## Verified Collection IDs

| Collection | Collection ID | Status | Last Verified |
|------------|---------------|--------|---------------|
| Events | Import4 | Verified | 2026-07-01 |

## Environment Variables

Required Wix CMS environment variables:

```env
WIX_API_KEY=
WIX_SITE_ID=
WIX_COLLECTION_EVENTS_ID=Import4
```

- `WIX_API_KEY` is required.
- `WIX_SITE_ID` is required.
- `WIX_COLLECTION_EVENTS_ID` must currently be `Import4`.
- Do **not** use the fallback collection name `"Events"` for this Wix site.

## Deployment Checklist

1. Verify the Wix collection ID.
2. Update Vercel Environment Variables.
3. Update `.env.example`.
4. Update `README.md`.
5. Update `docs/wix-cms.md`.
6. Redeploy Production.
7. Verify the event detail page.
8. Remove any temporary debug routes before merging.

## Verification Procedure

1. Deploy a temporary debug route for development only.
2. Query the Wix Data Collections API.
3. Confirm the collection ID.
4. Update:
   - Vercel Environment Variables
   - `.env.example`
   - `README.md`
   - `docs/wix-cms.md`
5. Remove the temporary debug route.
6. Confirm that:
   - `/tours/<slug>` loads correctly.
   - `/api/debug/...` returns 404.

## Future Collections

| Collection | Collection ID | Status | Last Verified |
|------------|---------------|--------|---------------|

Only add collection IDs after they have been verified against the Wix Data
Collections API.
