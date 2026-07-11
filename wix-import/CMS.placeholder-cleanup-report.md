# CMS Placeholder Cleanup Report

Cleaned draft CSVs were generated from original import CSVs. Original CSV files were not overwritten.

## Summary

- Files processed: 2
- Files skipped because original CSV is missing: 6
- Total literal placeholders removed: 184

## Files Processed

| Collection | Original CSV | Cleaned CSV | Rows | Columns | Placeholders Removed | Rows Affected | Columns Affected | Values Removed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Events | wix-import/Events.csv | wix-import/Events.placeholder-cleaned.csv | 64 | 16 | 180 | 62 | slug: 62, ticketPrimaryUrl: 60, sourceUrl: 58 | OPTIONAL: 118, MANUAL: 62 |
| Programs | wix-import/Programs.csv | wix-import/Programs.placeholder-cleaned.csv | 4 | 8 | 4 | 4 | heroImage: 4 | UPLOAD TO WIX: 4 |

## Files Skipped

| Collection | Reason |
| --- | --- |
| TourDates | Original CSV not found |
| EventVideos | Original CSV not found |
| EventGallery | Original CSV not found |
| Partners | Original CSV not found |
| Venues | Original CSV not found |
| Testimonials | Original CSV not found |

## Validation

| Collection | Same Headers | Same Row Count |
| --- | --- | --- |
| Events | PASS | PASS |
| Programs | PASS | PASS |

## Manual Review Notes

| Collection | Row | ID | Title/Name | Field | Review Reason | Recommended Action |
| --- | --- | --- | --- | --- | --- | --- |
| Events | 2 | mischa-maisky-recital | Mischa Maisky in Recital | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 2 | mischa-maisky-recital | Mischa Maisky in Recital | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 2 | mischa-maisky-recital | Mischa Maisky in Recital | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 4 | lucid-chang-cheng-yue-2026 | Chang Cheng-Yue | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 4 | lucid-chang-cheng-yue-2026 | Chang Cheng-Yue | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 4 | lucid-chang-cheng-yue-2026 | Chang Cheng-Yue | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 6 | one-piece-piano-symphony-2026 | ONE PIECE Piano Symphony | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 7 | lucid-enno-cheng-2026 | Enno Cheng | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 7 | lucid-enno-cheng-2026 | Enno Cheng | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 7 | lucid-enno-cheng-2026 | Enno Cheng | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 8 | lucid-sunset-rollercoaster-2026 | Sunset Rollercoaster | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 8 | lucid-sunset-rollercoaster-2026 | Sunset Rollercoaster | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 8 | lucid-sunset-rollercoaster-2026 | Sunset Rollercoaster | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 9 | lucid-moon-tang-2026 | moon tang | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 9 | lucid-moon-tang-2026 | moon tang | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 9 | lucid-moon-tang-2026 | moon tang | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 10 | lucid-the-landlords-cat-2026 | The Landlord's Cat | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 10 | lucid-the-landlords-cat-2026 | The Landlord's Cat | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 10 | lucid-the-landlords-cat-2026 | The Landlord's Cat | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 11 | oddshapes-music-festival-2026 | Oddshapes Music Festival | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 11 | oddshapes-music-festival-2026 | Oddshapes Music Festival | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 11 | oddshapes-music-festival-2026 | Oddshapes Music Festival | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 12 | christmas-at-cruden-farm-silvie-paladino | Christmas at Cruden Farm with Silvie Paladino | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 12 | christmas-at-cruden-farm-silvie-paladino | Christmas at Cruden Farm with Silvie Paladino | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 12 | christmas-at-cruden-farm-silvie-paladino | Christmas at Cruden Farm with Silvie Paladino | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 13 | lucid-crowd-lu-2025 | Crowd Lu | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 13 | lucid-crowd-lu-2025 | Crowd Lu | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 13 | lucid-crowd-lu-2025 | Crowd Lu | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 14 | juan-diego-florez-2025 | Juan Diego Flórez in Recital | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 14 | juan-diego-florez-2025 | Juan Diego Flórez in Recital | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 14 | juan-diego-florez-2025 | Juan Diego Flórez in Recital | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 15 | demon-slayer-in-concert | Demon Slayer:Kimetsu no Yaiba In Concert | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 15 | demon-slayer-in-concert | Demon Slayer:Kimetsu no Yaiba In Concert | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 15 | demon-slayer-in-concert | Demon Slayer:Kimetsu no Yaiba In Concert | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 16 | lucid-virgin-vacation-2025 | Virgin Vacation | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 16 | lucid-virgin-vacation-2025 | Virgin Vacation | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 16 | lucid-virgin-vacation-2025 | Virgin Vacation | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 17 | lucid-waa-wei-2025 | waa wei | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 17 | lucid-waa-wei-2025 | waa wei | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 17 | lucid-waa-wei-2025 | waa wei | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 18 | ray-chen-recital-2025 | Ray Chen in Recital | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 18 | ray-chen-recital-2025 | Ray Chen in Recital | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 18 | ray-chen-recital-2025 | Ray Chen in Recital | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 19 | lucid-lala-hsu-2025 | LaLa Hsu | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 19 | lucid-lala-hsu-2025 | LaLa Hsu | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 19 | lucid-lala-hsu-2025 | LaLa Hsu | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 20 | lucid-skai-isyourgod-2025 | SKAI ISYOURGOD - SG | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 20 | lucid-skai-isyourgod-2025 | SKAI ISYOURGOD - SG | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 20 | lucid-skai-isyourgod-2025 | SKAI ISYOURGOD - SG | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 21 | lucid-9m88-2025 | 9m88 - SG | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 21 | lucid-9m88-2025 | 9m88 - SG | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 21 | lucid-9m88-2025 | 9m88 - SG | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 22 | lucid-nmixx-2025 | NMIXX 2ND FAN CONCERT CHANGE UP: MIXX LAB IN AUSTRALIA | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 22 | lucid-nmixx-2025 | NMIXX 2ND FAN CONCERT CHANGE UP: MIXX LAB IN AUSTRALIA | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 22 | lucid-nmixx-2025 | NMIXX 2ND FAN CONCERT CHANGE UP: MIXX LAB IN AUSTRALIA | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 23 | game-on-australia-premiere-tour-2025 | GAME ON! Australia Premiere Tour 2025 | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 23 | game-on-australia-premiere-tour-2025 | GAME ON! Australia Premiere Tour 2025 | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 23 | game-on-australia-premiere-tour-2025 | GAME ON! Australia Premiere Tour 2025 | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 24 | lucid-gareth-t-na-2025 | Gareth.T - NA | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 24 | lucid-gareth-t-na-2025 | Gareth.T - NA | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 24 | lucid-gareth-t-na-2025 | Gareth.T - NA | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 25 | lucid-wannasleep-2025 | wannasleep | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 25 | lucid-wannasleep-2025 | wannasleep | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 25 | lucid-wannasleep-2025 | wannasleep | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 26 | final-fantasy-piano-concert | Crystalline Resonance FINAL FANTASY Piano Concert | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 26 | final-fantasy-piano-concert | Crystalline Resonance FINAL FANTASY Piano Concert | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 26 | final-fantasy-piano-concert | Crystalline Resonance FINAL FANTASY Piano Concert | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 27 | lucid-831-2024 | 831 | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 27 | lucid-831-2024 | 831 | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 27 | lucid-831-2024 | 831 | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 28 | lucid-bestards-2024 | BESTARDS | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 28 | lucid-bestards-2024 | BESTARDS | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 28 | lucid-bestards-2024 | BESTARDS | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 29 | oddshapes-music-festival-2024 | Oddshapes Music Festival | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 29 | oddshapes-music-festival-2024 | Oddshapes Music Festival | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 29 | oddshapes-music-festival-2024 | Oddshapes Music Festival | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 30 | nobuo-uematsu-contiki-show | Nobuo Uematsu conTIKI SHOW | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 30 | nobuo-uematsu-contiki-show | Nobuo Uematsu conTIKI SHOW | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 30 | nobuo-uematsu-contiki-show | Nobuo Uematsu conTIKI SHOW | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 31 | lucid-gareth-t-asia-au-2024 | Gareth.T - ASIA&AU | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 31 | lucid-gareth-t-asia-au-2024 | Gareth.T - ASIA&AU | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 31 | lucid-gareth-t-asia-au-2024 | Gareth.T - ASIA&AU | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 32 | maxim-vengerov | Maxim Vengerov | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 32 | maxim-vengerov | Maxim Vengerov | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 33 | one-piece-music-symphony-2024 | ONE PIECE Music Symphony | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 34 | one-piece-piano-symphony-2024 | ONE PIECE Piano Symphony | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 34 | one-piece-piano-symphony-2024 | ONE PIECE Piano Symphony | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 35 | lucid-fish-leong-2024 | Fish Leong | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 35 | lucid-fish-leong-2024 | Fish Leong | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 35 | lucid-fish-leong-2024 | Fish Leong | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 36 | lucid-comz-2023-2024 | COM'Z | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 36 | lucid-comz-2023-2024 | COM'Z | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 36 | lucid-comz-2023-2024 | COM'Z | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 37 | milos-classical-guitar | MILOŠ: The Classical Guitar Hero | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 37 | milos-classical-guitar | MILOŠ: The Classical Guitar Hero | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 37 | milos-classical-guitar | MILOŠ: The Classical Guitar Hero | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 38 | juan-diego-florez-2023 | Juan Diego Flórez in Recital | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 38 | juan-diego-florez-2023 | Juan Diego Flórez in Recital | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 38 | juan-diego-florez-2023 | Juan Diego Flórez in Recital | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 39 | lucid-kanho-yakushiji-2023 | Kanho Yakushiji | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 39 | lucid-kanho-yakushiji-2023 | Kanho Yakushiji | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 39 | lucid-kanho-yakushiji-2023 | Kanho Yakushiji | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 40 | lucid-cicada-2023 | Cicada | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 40 | lucid-cicada-2023 | Cicada | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 40 | lucid-cicada-2023 | Cicada | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 41 | lucid-showlo-2023 | ShowLo | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 41 | lucid-showlo-2023 | ShowLo | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 41 | lucid-showlo-2023 | ShowLo | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 42 | lucid-xiaoxia-2023 | XiaoXia | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 42 | lucid-xiaoxia-2023 | XiaoXia | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 42 | lucid-xiaoxia-2023 | XiaoXia | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 43 | lucid-a-mei-2023 | A-Mei | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 43 | lucid-a-mei-2023 | A-Mei | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 43 | lucid-a-mei-2023 | A-Mei | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 44 | marilyn-the-woman-behind-the-icon | Marilyn - The Woman Behind the Icon | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 44 | marilyn-the-woman-behind-the-icon | Marilyn - The Woman Behind the Icon | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 44 | marilyn-the-woman-behind-the-icon | Marilyn - The Woman Behind the Icon | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 45 | lucid-weibird-2023 | WeiBird | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 45 | lucid-weibird-2023 | WeiBird | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 45 | lucid-weibird-2023 | WeiBird | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 46 | lucid-neongarden-2023 | NeonGarden | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 46 | lucid-neongarden-2023 | NeonGarden | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 46 | lucid-neongarden-2023 | NeonGarden | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 47 | lucid-the-chairs-2023 | The Chairs | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 47 | lucid-the-chairs-2023 | The Chairs | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 47 | lucid-the-chairs-2023 | The Chairs | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 48 | lucid-crowd-lu-2023 | Crowd Lu | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 48 | lucid-crowd-lu-2023 | Crowd Lu | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 48 | lucid-crowd-lu-2023 | Crowd Lu | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 49 | sonica-music-festival-2023 | Sonica Music Festival | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 49 | sonica-music-festival-2023 | Sonica Music Festival | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 49 | sonica-music-festival-2023 | Sonica Music Festival | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 50 | lucid-sunset-rollercoaster-2022 | Sunset Rollercoaster | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 50 | lucid-sunset-rollercoaster-2022 | Sunset Rollercoaster | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 50 | lucid-sunset-rollercoaster-2022 | Sunset Rollercoaster | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 51 | leonardo-da-vinci-taipei | The Man Behind the Myth - Leonardo Da Vinci TAIPEI | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 51 | leonardo-da-vinci-taipei | The Man Behind the Myth - Leonardo Da Vinci TAIPEI | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 51 | leonardo-da-vinci-taipei | The Man Behind the Myth - Leonardo Da Vinci TAIPEI | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 52 | ray-chen-recital-2022 | Ray Chen: In Recital | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 52 | ray-chen-recital-2022 | Ray Chen: In Recital | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 52 | ray-chen-recital-2022 | Ray Chen: In Recital | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 53 | mai-fujisawa-melody-of-japan | Mai Fujisawa: Melody of Japan | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 53 | mai-fujisawa-melody-of-japan | Mai Fujisawa: Melody of Japan | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 53 | mai-fujisawa-melody-of-japan | Mai Fujisawa: Melody of Japan | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 54 | lisa-ono-music-journey | Lisa Ono: Music Journey | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 54 | lisa-ono-music-journey | Lisa Ono: Music Journey | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 54 | lisa-ono-music-journey | Lisa Ono: Music Journey | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 55 | piano-battle | Piano Battle | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 55 | piano-battle | Piano Battle | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 55 | piano-battle | Piano Battle | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 56 | yiruma-2019-frame | Yiruma 2019: Frame | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 56 | yiruma-2019-frame | Yiruma 2019: Frame | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 56 | yiruma-2019-frame | Yiruma 2019: Frame | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 57 | yundi-li-sonata-world-tour | Yundi Li 2018 Australia Tour: Touch of Chopin | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 57 | yundi-li-sonata-world-tour | Yundi Li 2018 Australia Tour: Touch of Chopin | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 57 | yundi-li-sonata-world-tour | Yundi Li 2018 Australia Tour: Touch of Chopin | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 58 | maksim-mrvica-new-silk-road | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 58 | maksim-mrvica-new-silk-road | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 58 | maksim-mrvica-new-silk-road | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 59 | lisa-ono-la-vie-en-rose | Lisa Ono Australia Tour: La Vie En Rose | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 59 | lisa-ono-la-vie-en-rose | Lisa Ono Australia Tour: La Vie En Rose | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 59 | lisa-ono-la-vie-en-rose | Lisa Ono Australia Tour: La Vie En Rose | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 60 | peter-bence | Peter Bence | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 60 | peter-bence | Peter Bence | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 60 | peter-bence | Peter Bence | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 61 | yiruma-oceania-tour | Yiruma Piano 2017 Oceania Tour: Autumn Rain | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 61 | yiruma-oceania-tour | Yiruma Piano 2017 Oceania Tour: Autumn Rain | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 61 | yiruma-oceania-tour | Yiruma Piano 2017 Oceania Tour: Autumn Rain | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 62 | shi-jin-melody-of-the-night | Shi Jin Piano Concert: Melody of the Night | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 62 | shi-jin-melody-of-the-night | Shi Jin Piano Concert: Melody of the Night | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 62 | shi-jin-melody-of-the-night | Shi Jin Piano Concert: Melody of the Night | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 63 | lu-siqing-violin-concert-nostalgia | Lu Siqing Violin Concert: Nostalgia | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 63 | lu-siqing-violin-concert-nostalgia | Lu Siqing Violin Concert: Nostalgia | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 63 | lu-siqing-violin-concert-nostalgia | Lu Siqing Violin Concert: Nostalgia | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 64 | yiruma-piano-australia-tour-2016 | Yiruma Piano 2016 Australia Tour: Kiss the Rain | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 64 | yiruma-piano-australia-tour-2016 | Yiruma Piano 2016 Australia Tour: Kiss the Rain | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 64 | yiruma-piano-australia-tour-2016 | Yiruma Piano 2016 Australia Tour: Kiss the Rain | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 65 | sheng-zhongguo | Sheng Zhongguo Violin Concert | slug | slug placeholder cleared | add final CMS slug before publishing |
| Events | 65 | sheng-zhongguo | Sheng Zhongguo Violin Concert | sourceUrl | sourceUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add sourceUrl |
| Events | 65 | sheng-zhongguo | Sheng Zhongguo Violin Concert | ticketPrimaryUrl | ticketPrimaryUrl placeholder cleared | leave blank only if unavailable/not needed, otherwise add ticketPrimaryUrl |
| Events | 2 | mischa-maisky-recital | Mischa Maisky in Recital | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 3 | naruto-symphonic-experience | NARUTO: The Symphonic Experience | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 4 | lucid-chang-cheng-yue-2026 | Chang Cheng-Yue | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 5 | attack-on-titan-world-tour | "Attack on Titan" - Beyond the Walls World Tour - The Official Concert | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 6 | one-piece-piano-symphony-2026 | ONE PIECE Piano Symphony | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 7 | lucid-enno-cheng-2026 | Enno Cheng | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 8 | lucid-sunset-rollercoaster-2026 | Sunset Rollercoaster | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 9 | lucid-moon-tang-2026 | moon tang | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 10 | lucid-the-landlords-cat-2026 | The Landlord's Cat | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 11 | oddshapes-music-festival-2026 | Oddshapes Music Festival | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 12 | christmas-at-cruden-farm-silvie-paladino | Christmas at Cruden Farm with Silvie Paladino | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 13 | lucid-crowd-lu-2025 | Crowd Lu | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 14 | juan-diego-florez-2025 | Juan Diego Flórez in Recital | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 15 | demon-slayer-in-concert | Demon Slayer:Kimetsu no Yaiba In Concert | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 16 | lucid-virgin-vacation-2025 | Virgin Vacation | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 17 | lucid-waa-wei-2025 | waa wei | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 18 | ray-chen-recital-2025 | Ray Chen in Recital | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 19 | lucid-lala-hsu-2025 | LaLa Hsu | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 20 | lucid-skai-isyourgod-2025 | SKAI ISYOURGOD - SG | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 21 | lucid-9m88-2025 | 9m88 - SG | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 22 | lucid-nmixx-2025 | NMIXX 2ND FAN CONCERT CHANGE UP: MIXX LAB IN AUSTRALIA | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 23 | game-on-australia-premiere-tour-2025 | GAME ON! Australia Premiere Tour 2025 | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 24 | lucid-gareth-t-na-2025 | Gareth.T - NA | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 25 | lucid-wannasleep-2025 | wannasleep | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 26 | final-fantasy-piano-concert | Crystalline Resonance FINAL FANTASY Piano Concert | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 27 | lucid-831-2024 | 831 | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 28 | lucid-bestards-2024 | BESTARDS | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 29 | oddshapes-music-festival-2024 | Oddshapes Music Festival | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 30 | nobuo-uematsu-contiki-show | Nobuo Uematsu conTIKI SHOW | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 31 | lucid-gareth-t-asia-au-2024 | Gareth.T - ASIA&AU | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 32 | maxim-vengerov | Maxim Vengerov | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 33 | one-piece-music-symphony-2024 | ONE PIECE Music Symphony | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 34 | one-piece-piano-symphony-2024 | ONE PIECE Piano Symphony | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 35 | lucid-fish-leong-2024 | Fish Leong | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 36 | lucid-comz-2023-2024 | COM'Z | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 37 | milos-classical-guitar | MILOŠ: The Classical Guitar Hero | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 38 | juan-diego-florez-2023 | Juan Diego Flórez in Recital | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 39 | lucid-kanho-yakushiji-2023 | Kanho Yakushiji | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 40 | lucid-cicada-2023 | Cicada | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 41 | lucid-showlo-2023 | ShowLo | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 42 | lucid-xiaoxia-2023 | XiaoXia | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 43 | lucid-a-mei-2023 | A-Mei | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 44 | marilyn-the-woman-behind-the-icon | Marilyn - The Woman Behind the Icon | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 45 | lucid-weibird-2023 | WeiBird | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 46 | lucid-neongarden-2023 | NeonGarden | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 47 | lucid-the-chairs-2023 | The Chairs | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 48 | lucid-crowd-lu-2023 | Crowd Lu | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 49 | sonica-music-festival-2023 | Sonica Music Festival | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 50 | lucid-sunset-rollercoaster-2022 | Sunset Rollercoaster | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 51 | leonardo-da-vinci-taipei | The Man Behind the Myth - Leonardo Da Vinci TAIPEI | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 52 | ray-chen-recital-2022 | Ray Chen: In Recital | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 53 | mai-fujisawa-melody-of-japan | Mai Fujisawa: Melody of Japan | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 54 | lisa-ono-music-journey | Lisa Ono: Music Journey | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 55 | piano-battle | Piano Battle | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 56 | yiruma-2019-frame | Yiruma 2019: Frame | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 57 | yundi-li-sonata-world-tour | Yundi Li 2018 Australia Tour: Touch of Chopin | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 58 | maksim-mrvica-new-silk-road | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 59 | lisa-ono-la-vie-en-rose | Lisa Ono Australia Tour: La Vie En Rose | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 60 | peter-bence | Peter Bence | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 61 | yiruma-oceania-tour | Yiruma Piano 2017 Oceania Tour: Autumn Rain | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 62 | shi-jin-melody-of-the-night | Shi Jin Piano Concert: Melody of the Night | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 63 | lu-siqing-violin-concert-nostalgia | Lu Siqing Violin Concert: Nostalgia | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 64 | yiruma-piano-australia-tour-2016 | Yiruma Piano 2016 Australia Tour: Kiss the Rain | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Events | 65 | sheng-zhongguo | Sheng Zhongguo Violin Concert | manualNotes | note contains placeholder wording but also useful instructions | review note after final assets/URLs are confirmed |
| Programs | 2 | program-anime-gaming-concerts | Anime & Gaming Concerts | heroImage | heroImage asset placeholder cleared | upload/select final Wix media asset |
| Programs | 3 | program-classical-concert-theatre | Classical Concerts & Theatre | heroImage | heroImage asset placeholder cleared | upload/select final Wix media asset |
| Programs | 4 | program-live-music-festival | Live Music & Festivals | heroImage | heroImage asset placeholder cleared | upload/select final Wix media asset |
| Programs | 5 | program-touring-exhibition | Touring Exhibitions | heroImage | heroImage asset placeholder cleared | upload/select final Wix media asset |

## Confirmation

- Original CSV files were read only and not overwritten.
- Cleaned files preserve all original columns.
- Cleaned files preserve original row counts.
- Literal placeholder values were removed only when the entire cell was exactly `OPTIONAL`, `MANUAL`, or `UPLOAD TO WIX`.
- Longer notes containing useful instructions were retained.
