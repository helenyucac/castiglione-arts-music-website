# Events Import-Ready Draft Report

Generated `Events.import-ready-draft.csv` from `Events.cleaned.csv` while preserving the original `Events.csv` schema. Original CSV files were not overwritten.

## Summary

- Rows processed: 64
- Columns preserved: 16
- Slugs imported from cleaned file: 62
- eventCardDate values imported from cleaned file: 30
- OPTIONAL values cleared in source/ticket URL fields: 118
- Remaining manual-review rows: 62
- Highest-priority issues before Wix import: 3

## Validation

| Check | Result |
| --- | --- |
| same_headers_as_events_csv | PASS |
| same_row_count_as_events_csv | PASS |
| no_manual_slug | PASS |
| no_empty_slug | PASS |
| no_duplicate_slug | PASS |
| no_invalid_slug | PASS |
| no_literal_optional_in_source_or_ticket | PASS |

## Imported Safe Cleanup

### Slugs Imported from Cleaned File

| Row | ID | Title | Original Slug | Import-Ready Slug |
| --- | --- | --- | --- | --- |
| 2 | mischa-maisky-recital | Mischa Maisky in Recital | MANUAL | mischa-maisky-in-recital |
| 4 | lucid-chang-cheng-yue-2026 | Chang Cheng-Yue | MANUAL | chang-cheng-yue |
| 6 | one-piece-piano-symphony-2026 | ONE PIECE Piano Symphony | MANUAL | one-piece-piano-symphony |
| 7 | lucid-enno-cheng-2026 | Enno Cheng | MANUAL | enno-cheng |
| 8 | lucid-sunset-rollercoaster-2026 | Sunset Rollercoaster | MANUAL | sunset-rollercoaster |
| 9 | lucid-moon-tang-2026 | moon tang | MANUAL | moon-tang |
| 10 | lucid-the-landlords-cat-2026 | The Landlord's Cat | MANUAL | the-landlord-s-cat |
| 11 | oddshapes-music-festival-2026 | Oddshapes Music Festival | MANUAL | oddshapes-music-festival |
| 12 | christmas-at-cruden-farm-silvie-paladino | Christmas at Cruden Farm with Silvie Paladino | MANUAL | christmas-at-cruden-farm-with-silvie-paladino |
| 13 | lucid-crowd-lu-2025 | Crowd Lu | MANUAL | crowd-lu |
| 14 | juan-diego-florez-2025 | Juan Diego Flórez in Recital | MANUAL | juan-diego-florez-in-recital |
| 15 | demon-slayer-in-concert | Demon Slayer:Kimetsu no Yaiba In Concert | MANUAL | demon-slayer-kimetsu-no-yaiba-in-concert |
| 16 | lucid-virgin-vacation-2025 | Virgin Vacation | MANUAL | virgin-vacation |
| 17 | lucid-waa-wei-2025 | waa wei | MANUAL | waa-wei |
| 18 | ray-chen-recital-2025 | Ray Chen in Recital | MANUAL | ray-chen-in-recital |
| 19 | lucid-lala-hsu-2025 | LaLa Hsu | MANUAL | lala-hsu |
| 20 | lucid-skai-isyourgod-2025 | SKAI ISYOURGOD - SG | MANUAL | skai-isyourgod-sg |
| 21 | lucid-9m88-2025 | 9m88 - SG | MANUAL | 9m88-sg |
| 22 | lucid-nmixx-2025 | NMIXX 2ND FAN CONCERT CHANGE UP: MIXX LAB IN AUSTRALIA | MANUAL | nmixx-2nd-fan-concert-change-up-mixx-lab-in-australia |
| 23 | game-on-australia-premiere-tour-2025 | GAME ON! Australia Premiere Tour 2025 | MANUAL | game-on-australia-premiere-tour-2025 |
| 24 | lucid-gareth-t-na-2025 | Gareth.T - NA | MANUAL | gareth-t-na |
| 25 | lucid-wannasleep-2025 | wannasleep | MANUAL | wannasleep |
| 26 | final-fantasy-piano-concert | Crystalline Resonance FINAL FANTASY Piano Concert | MANUAL | crystalline-resonance-final-fantasy-piano-concert |
| 27 | lucid-831-2024 | 831 | MANUAL | 831 |
| 28 | lucid-bestards-2024 | BESTARDS | MANUAL | bestards |
| 29 | oddshapes-music-festival-2024 | Oddshapes Music Festival | MANUAL | oddshapes-music-festival-2024 |
| 30 | nobuo-uematsu-contiki-show | Nobuo Uematsu conTIKI SHOW | MANUAL | nobuo-uematsu-contiki-show |
| 31 | lucid-gareth-t-asia-au-2024 | Gareth.T - ASIA&AU | MANUAL | gareth-t-asia-and-au |
| 32 | maxim-vengerov | Maxim Vengerov | MANUAL | maxim-vengerov |
| 33 | one-piece-music-symphony-2024 | ONE PIECE Music Symphony | MANUAL | one-piece-music-symphony |
| 34 | one-piece-piano-symphony-2024 | ONE PIECE Piano Symphony | MANUAL | one-piece-piano-symphony-2024 |
| 35 | lucid-fish-leong-2024 | Fish Leong | MANUAL | fish-leong |
| 36 | lucid-comz-2023-2024 | COM'Z | MANUAL | com-z |
| 37 | milos-classical-guitar | MILOŠ: The Classical Guitar Hero | MANUAL | milos-the-classical-guitar-hero |
| 38 | juan-diego-florez-2023 | Juan Diego Flórez in Recital | MANUAL | juan-diego-florez-in-recital-2023 |
| 39 | lucid-kanho-yakushiji-2023 | Kanho Yakushiji | MANUAL | kanho-yakushiji |
| 40 | lucid-cicada-2023 | Cicada | MANUAL | cicada |
| 41 | lucid-showlo-2023 | ShowLo | MANUAL | showlo |
| 42 | lucid-xiaoxia-2023 | XiaoXia | MANUAL | xiaoxia |
| 43 | lucid-a-mei-2023 | A-Mei | MANUAL | a-mei |
| 44 | marilyn-the-woman-behind-the-icon | Marilyn - The Woman Behind the Icon | MANUAL | marilyn-the-woman-behind-the-icon |
| 45 | lucid-weibird-2023 | WeiBird | MANUAL | weibird |
| 46 | lucid-neongarden-2023 | NeonGarden | MANUAL | neongarden |
| 47 | lucid-the-chairs-2023 | The Chairs | MANUAL | the-chairs |
| 48 | lucid-crowd-lu-2023 | Crowd Lu | MANUAL | crowd-lu-2023 |
| 49 | sonica-music-festival-2023 | Sonica Music Festival | MANUAL | sonica-music-festival |
| 50 | lucid-sunset-rollercoaster-2022 | Sunset Rollercoaster | MANUAL | sunset-rollercoaster-2022 |
| 51 | leonardo-da-vinci-taipei | The Man Behind the Myth - Leonardo Da Vinci TAIPEI | MANUAL | the-man-behind-the-myth-leonardo-da-vinci-taipei |
| 52 | ray-chen-recital-2022 | Ray Chen: In Recital | MANUAL | ray-chen-in-recital-2022 |
| 53 | mai-fujisawa-melody-of-japan | Mai Fujisawa: Melody of Japan | MANUAL | mai-fujisawa-melody-of-japan |
| 54 | lisa-ono-music-journey | Lisa Ono: Music Journey | MANUAL | lisa-ono-music-journey |
| 55 | piano-battle | Piano Battle | MANUAL | piano-battle |
| 56 | yiruma-2019-frame | Yiruma 2019: Frame | MANUAL | yiruma-2019-frame |
| 57 | yundi-li-sonata-world-tour | Yundi Li 2018 Australia Tour: Touch of Chopin | MANUAL | yundi-li-2018-australia-tour-touch-of-chopin |
| 58 | maksim-mrvica-new-silk-road | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | MANUAL | maksim-mrvica-2018-australia-tour-croatian-rhapsody |
| 59 | lisa-ono-la-vie-en-rose | Lisa Ono Australia Tour: La Vie En Rose | MANUAL | lisa-ono-australia-tour-la-vie-en-rose |
| 60 | peter-bence | Peter Bence | MANUAL | peter-bence |
| 61 | yiruma-oceania-tour | Yiruma Piano 2017 Oceania Tour: Autumn Rain | MANUAL | yiruma-piano-2017-oceania-tour-autumn-rain |
| 62 | shi-jin-melody-of-the-night | Shi Jin Piano Concert: Melody of the Night | MANUAL | shi-jin-piano-concert-melody-of-the-night |
| 63 | lu-siqing-violin-concert-nostalgia | Lu Siqing Violin Concert: Nostalgia | MANUAL | lu-siqing-violin-concert-nostalgia |
| 64 | yiruma-piano-australia-tour-2016 | Yiruma Piano 2016 Australia Tour: Kiss the Rain | MANUAL | yiruma-piano-2016-australia-tour-kiss-the-rain |
| 65 | sheng-zhongguo | Sheng Zhongguo Violin Concert | MANUAL | sheng-zhongguo-violin-concert |

### Dates Imported from Cleaned File

| Row | ID | Title | Original Date | Import-Ready Date |
| --- | --- | --- | --- | --- |
| 2 | mischa-maisky-recital | Mischa Maisky in Recital | 06-15 NOV 2026 | 06–15 NOV 2026 |
| 3 | naruto-symphonic-experience | NARUTO: The Symphonic Experience | 03-04 OCT 2026 | 03–04 OCT 2026 |
| 5 | attack-on-titan-world-tour | "Attack on Titan" - Beyond the Walls World Tour - The Official Concert | 05-07 JUL 2026 | 05–07 JUL 2026 |
| 6 | one-piece-piano-symphony-2026 | ONE PIECE Piano Symphony | 24-26 APR 2026 | 24–26 APR 2026 |
| 14 | juan-diego-florez-2025 | Juan Diego Flórez in Recital | 29 NOV-03 DEC 2025 | 29 NOV–03 DEC 2025 |
| 15 | demon-slayer-in-concert | Demon Slayer:Kimetsu no Yaiba In Concert | 17-31 OCT 2025 | 17–31 OCT 2025 |
| 18 | ray-chen-recital-2025 | Ray Chen in Recital | 08-14 SEP 2025 | 08–14 SEP 2025 |
| 26 | final-fantasy-piano-concert | Crystalline Resonance FINAL FANTASY Piano Concert | 21 FEB-05 MAR 2025 | 21 FEB–05 MAR 2025 |
| 27 | lucid-831-2024 | 831 | FEB / OCT 2024 | FEB–OCT 2024 |
| 30 | nobuo-uematsu-contiki-show | Nobuo Uematsu conTIKI SHOW | 05-08 SEP 2024 | 05–08 SEP 2024 |
| 32 | maxim-vengerov | Maxim Vengerov | 05-10 AUG 2024 | 05–10 AUG 2024 |
| 33 | one-piece-music-symphony-2024 | ONE PIECE Music Symphony | 19-27 JUL 2024 | 19–27 JUL 2024 |
| 34 | one-piece-piano-symphony-2024 | ONE PIECE Piano Symphony | 23-25 JUL 2024 | 23–25 JUL 2024 |
| 36 | lucid-comz-2023-2024 | COM'Z | DEC 2023 / JAN 2024 | DEC 2023–JAN 2024 |
| 37 | milos-classical-guitar | MILOŠ: The Classical Guitar Hero | 05-12 NOV 2023 | 05–12 NOV 2023 |
| 38 | juan-diego-florez-2023 | Juan Diego Flórez in Recital | 02-07 NOV 2023 | 02–07 NOV 2023 |
| 46 | lucid-neongarden-2023 | NeonGarden | MAY / JUN 2023 | MAY–JUN 2023 |
| 52 | ray-chen-recital-2022 | Ray Chen: In Recital | 06-13 AUG 2022 | 06–13 AUG 2022 |
| 53 | mai-fujisawa-melody-of-japan | Mai Fujisawa: Melody of Japan | 14-16 NOV 2019 | 14–16 NOV 2019 |
| 54 | lisa-ono-music-journey | Lisa Ono: Music Journey | 17-22 SEP 2019 | 17–22 SEP 2019 |
| 55 | piano-battle | Piano Battle | 25 AUG-01 SEP 2019 | 25 AUG–01 SEP 2019 |
| 56 | yiruma-2019-frame | Yiruma 2019: Frame | 10-18 MAY 2019 | 10–18 MAY 2019 |
| 57 | yundi-li-sonata-world-tour | Yundi Li 2018 Australia Tour: Touch of Chopin | 03-06 NOV 2018 | 03–06 NOV 2018 |
| 58 | maksim-mrvica-new-silk-road | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | 26-30 SEP 2018 | 26–30 SEP 2018 |
| 59 | lisa-ono-la-vie-en-rose | Lisa Ono Australia Tour: La Vie En Rose | 17-20 MAY 2018 | 17–20 MAY 2018 |
| 61 | yiruma-oceania-tour | Yiruma Piano 2017 Oceania Tour: Autumn Rain | MAY / DEC 2017 | MAY–DEC 2017 |
| 62 | shi-jin-melody-of-the-night | Shi Jin Piano Concert: Melody of the Night | 12-14 NOV 2017 | 12–14 NOV 2017 |
| 63 | lu-siqing-violin-concert-nostalgia | Lu Siqing Violin Concert: Nostalgia | 16-17 AUG 2016 | 16–17 AUG 2016 |
| 64 | yiruma-piano-australia-tour-2016 | Yiruma Piano 2016 Australia Tour: Kiss the Rain | 26-31 JUL 2016 | 26–31 JUL 2016 |
| 65 | sheng-zhongguo | Sheng Zhongguo Violin Concert | 03-04 JUL 2015 | 03–04 JUL 2015 |

### OPTIONAL Values Cleared

| Field | Count |
| --- | --- |
| sourceUrl | 58 |
| ticketPrimaryUrl | 60 |

## Remaining Manual-Review Issues

| Reason | Rows |
| --- | --- |
| legacy categoryLabel needs editorial taxonomy confirmation | 33 |
| reused Naruto placeholder image | 32 |
| Unsplash placeholder image | 28 |
| duplicate title | 10 |
| active/future event missing ticketPrimaryUrl | 2 |
| active/future event missing sourceUrl | 2 |
| status conflicts with sortDate | 1 |
| title too vague or numeric-only | 1 |

## Highest Priority Before Wix Import

| Row | Title | Status | sortDate | Review Reason | Recommended Action |
| --- | --- | --- | --- | --- | --- |
| 2 | Mischa Maisky in Recital | upcoming | 2026-11-15 | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; active/future event missing ticketPrimaryUrl; active/future event missing sourceUrl | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre; add ticketPrimaryUrl; add official event sourceUrl |
| 4 | Chang Cheng-Yue | upcoming | 2026-08-07 | reused Naruto placeholder image; active/future event missing ticketPrimaryUrl; active/future event missing sourceUrl | replace reused Naruto placeholder; add ticketPrimaryUrl; add official event sourceUrl |
| 11 | Oddshapes Music Festival | upcoming | 2026-03-01 | reused Naruto placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; status conflicts with sortDate; duplicate title | replace reused Naruto placeholder; normalize categoryLabel to Live Music & Festivals; confirm status or update sortDate; confirm this is a distinct event/year |

## Comparison to Events.placeholder-cleaned.csv

This draft is safer for Wix import than `Events.placeholder-cleaned.csv` because it keeps the valid cleaned slugs and normalized dates from `Events.cleaned.csv` instead of merely blanking placeholder slug values. It also guarantees no empty, duplicate, invalid, or `MANUAL` slugs.

## Preserved Fields

- Titles were not changed.
- Program and categoryLabel values were preserved for now.
- cardImage values were preserved, even when suspicious.
- sortDate values were preserved unchanged.
- Original `Events.csv` and `Events.cleaned.csv` were not overwritten.
