# Events CMS Cleanup Report

Generated draft reporting only. Original `wix-import/Events.csv` was not modified. `wix-import/Events.cleaned.csv` remains the cleaned draft import file.

## Summary

- Total rows: 64
- Ready-to-import rows: 2
- Manual-review rows: 62
- Slugs changed safely: 62
- eventCardDate values normalized safely: 30
- OPTIONAL values cleared safely: 118
- Missing cardImage values: 0
- Suspicious cardImage values: 60
- Missing ticketPrimaryUrl for active/future events: 2
- Missing sourceUrl for active/future events: 2
- Invalid or missing sortDate values: 0
- Duplicate slugs: 0
- Duplicate-title rows: 10
- Legacy or inconsistent categoryLabel rows: 62
- Status/date inconsistency rows: 1

## Validation

| Check | Result |
| --- | --- |
| same_row_count | PASS |
| same_column_count | PASS |
| same_columns | PASS |
| no_manual_slugs | PASS |
| no_duplicate_slugs | PASS |
| no_invalid_slugs | PASS |

## Manual Review Reasons

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
| title is very short/numeric; confirm editorial display title | 1 |
| slug is technically valid but editorially suspicious | 1 |

## Rows Needing Manual Review

| Row | ID | Title | Slug | Program | Category Label | Status | sortDate | Reasons |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | `mischa-maisky-recital` | Mischa Maisky in Recital | `mischa-maisky-in-recital` | Classical Concerts & Theatre | Classical Concerts | upcoming | 2026-11-15 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts<br>missing ticketPrimaryUrl for active/future event<br>missing sourceUrl for active/future event verification |
| 3 | `naruto-symphonic-experience` | NARUTO: The Symphonic Experience | `naruto-the-symphonic-experience` | Anime & Gaming Concerts | Anime Concerts | on-sale | 2026-10-04 | legacy/fine-grained categoryLabel: Anime Concerts |
| 4 | `lucid-chang-cheng-yue-2026` | Chang Cheng-Yue | `chang-cheng-yue` | Live Music & Festivals | Lucid Live | upcoming | 2026-08-07 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live<br>missing ticketPrimaryUrl for active/future event<br>missing sourceUrl for active/future event verification |
| 5 | `attack-on-titan-world-tour` | "Attack on Titan" - Beyond the Walls World Tour - The Official Concert | `attack-on-titan-beyond-the-walls-world-tour` | Anime & Gaming Concerts | Anime Concerts | on-sale | 2026-07-07 | legacy/fine-grained categoryLabel: Anime Concerts |
| 6 | `one-piece-piano-symphony-2026` | ONE PIECE Piano Symphony | `one-piece-piano-symphony` | Anime & Gaming Concerts | Anime Concerts | past | 2026-04-26 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Anime Concerts<br>duplicate title; confirm this is a distinct event/year |
| 7 | `lucid-enno-cheng-2026` | Enno Cheng | `enno-cheng` | Live Music & Festivals | Lucid Live | past | 2026-04-24 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 8 | `lucid-sunset-rollercoaster-2026` | Sunset Rollercoaster | `sunset-rollercoaster` | Live Music & Festivals | Lucid Live | past | 2026-04-17 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live<br>duplicate title; confirm this is a distinct event/year |
| 9 | `lucid-moon-tang-2026` | moon tang | `moon-tang` | Live Music & Festivals | Lucid Live | past | 2026-03-29 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 10 | `lucid-the-landlords-cat-2026` | The Landlord's Cat | `the-landlord-s-cat` | Live Music & Festivals | Lucid Live | past | 2026-03-27 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 11 | `oddshapes-music-festival-2026` | Oddshapes Music Festival | `oddshapes-music-festival` | Live Music & Festivals | Music Festival | upcoming | 2026-03-01 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Music Festival<br>status is upcoming but sortDate is before 2026-06-29<br>duplicate title; confirm this is a distinct event/year |
| 12 | `christmas-at-cruden-farm-silvie-paladino` | Christmas at Cruden Farm with Silvie Paladino | `christmas-at-cruden-farm-with-silvie-paladino` | Classical Concerts & Theatre | Classical Concerts | past | 2025-12-13 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 13 | `lucid-crowd-lu-2025` | Crowd Lu | `crowd-lu` | Live Music & Festivals | Lucid Live | past | 2025-12-06 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live<br>duplicate title; confirm this is a distinct event/year |
| 14 | `juan-diego-florez-2025` | Juan Diego Flórez in Recital | `juan-diego-florez-in-recital` | Classical Concerts & Theatre | Classical Concerts | past | 2025-12-03 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts<br>duplicate title; confirm this is a distinct event/year |
| 15 | `demon-slayer-in-concert` | Demon Slayer:Kimetsu no Yaiba In Concert | `demon-slayer-kimetsu-no-yaiba-in-concert` | Anime & Gaming Concerts | Anime Concerts | past | 2025-10-31 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Anime Concerts |
| 16 | `lucid-virgin-vacation-2025` | Virgin Vacation | `virgin-vacation` | Live Music & Festivals | Lucid Live | past | 2025-10-10 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 17 | `lucid-waa-wei-2025` | waa wei | `waa-wei` | Live Music & Festivals | Lucid Live | past | 2025-09-18 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 18 | `ray-chen-recital-2025` | Ray Chen in Recital | `ray-chen-in-recital` | Classical Concerts & Theatre | Classical Concerts | past | 2025-09-14 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 19 | `lucid-lala-hsu-2025` | LaLa Hsu | `lala-hsu` | Live Music & Festivals | Lucid Live | past | 2025-08-28 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 20 | `lucid-skai-isyourgod-2025` | SKAI ISYOURGOD - SG | `skai-isyourgod-sg` | Live Music & Festivals | Lucid Live | past | 2025-08-23 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 21 | `lucid-9m88-2025` | 9m88 - SG | `9m88-sg` | Live Music & Festivals | Lucid Live | past | 2025-06-10 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 22 | `lucid-nmixx-2025` | NMIXX 2ND FAN CONCERT CHANGE UP: MIXX LAB IN AUSTRALIA | `nmixx-2nd-fan-concert-change-up-mixx-lab-in-australia` | Live Music & Festivals | Lucid Live | past | 2025-06-06 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 23 | `game-on-australia-premiere-tour-2025` | GAME ON! Australia Premiere Tour 2025 | `game-on-australia-premiere-tour-2025` | Anime & Gaming Concerts | Gaming Concerts | past | 2025-05-10 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Gaming Concerts |
| 24 | `lucid-gareth-t-na-2025` | Gareth.T - NA | `gareth-t-na` | Live Music & Festivals | Lucid Live | past | 2025-04-10 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 25 | `lucid-wannasleep-2025` | wannasleep | `wannasleep` | Live Music & Festivals | Lucid Live | past | 2025-03-18 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 26 | `final-fantasy-piano-concert` | Crystalline Resonance FINAL FANTASY Piano Concert | `crystalline-resonance-final-fantasy-piano-concert` | Anime & Gaming Concerts | Gaming Concerts | past | 2025-03-05 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Gaming Concerts |
| 27 | `lucid-831-2024` | 831 | `831` | Live Music & Festivals | Lucid Live | past | 2024-10-25 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live<br>title is very short/numeric; confirm editorial display title<br>slug is technically valid but editorially suspicious |
| 28 | `lucid-bestards-2024` | BESTARDS | `bestards` | Live Music & Festivals | Lucid Live | past | 2024-10-24 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 29 | `oddshapes-music-festival-2024` | Oddshapes Music Festival | `oddshapes-music-festival-2024` | Live Music & Festivals | Music Festival | past | 2024-10-01 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Music Festival<br>duplicate title; confirm this is a distinct event/year |
| 30 | `nobuo-uematsu-contiki-show` | Nobuo Uematsu conTIKI SHOW | `nobuo-uematsu-contiki-show` | Anime & Gaming Concerts | Gaming Concerts | past | 2024-09-08 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Gaming Concerts |
| 31 | `lucid-gareth-t-asia-au-2024` | Gareth.T - ASIA&AU | `gareth-t-asia-and-au` | Live Music & Festivals | Lucid Live | past | 2024-09-01 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 32 | `maxim-vengerov` | Maxim Vengerov | `maxim-vengerov` | Classical Concerts & Theatre | Classical Concerts | past | 2024-08-10 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 33 | `one-piece-music-symphony-2024` | ONE PIECE Music Symphony | `one-piece-music-symphony` | Anime & Gaming Concerts | Anime Concerts | past | 2024-07-27 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Anime Concerts |
| 34 | `one-piece-piano-symphony-2024` | ONE PIECE Piano Symphony | `one-piece-piano-symphony-2024` | Anime & Gaming Concerts | Anime Concerts | past | 2024-07-25 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Anime Concerts<br>duplicate title; confirm this is a distinct event/year |
| 35 | `lucid-fish-leong-2024` | Fish Leong | `fish-leong` | Live Music & Festivals | Lucid Live | past | 2024-01-25 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 36 | `lucid-comz-2023-2024` | COM'Z | `com-z` | Live Music & Festivals | Lucid Live | past | 2023-12-07 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 37 | `milos-classical-guitar` | MILOŠ: The Classical Guitar Hero | `milos-the-classical-guitar-hero` | Classical Concerts & Theatre | Classical Concerts | past | 2023-11-12 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 38 | `juan-diego-florez-2023` | Juan Diego Flórez in Recital | `juan-diego-florez-in-recital-2023` | Classical Concerts & Theatre | Classical Concerts | past | 2023-11-07 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts<br>duplicate title; confirm this is a distinct event/year |
| 39 | `lucid-kanho-yakushiji-2023` | Kanho Yakushiji | `kanho-yakushiji` | Live Music & Festivals | Lucid Live | past | 2023-10-19 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 40 | `lucid-cicada-2023` | Cicada | `cicada` | Live Music & Festivals | Lucid Live | past | 2023-09-21 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 41 | `lucid-showlo-2023` | ShowLo | `showlo` | Live Music & Festivals | Lucid Live | past | 2023-09-09 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 42 | `lucid-xiaoxia-2023` | XiaoXia | `xiaoxia` | Live Music & Festivals | Lucid Live | past | 2023-08-17 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 43 | `lucid-a-mei-2023` | A-Mei | `a-mei` | Live Music & Festivals | Lucid Live | past | 2023-07-28 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 45 | `lucid-weibird-2023` | WeiBird | `weibird` | Live Music & Festivals | Lucid Live | past | 2023-06-09 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 46 | `lucid-neongarden-2023` | NeonGarden | `neongarden` | Live Music & Festivals | Lucid Live | past | 2023-05-30 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 47 | `lucid-the-chairs-2023` | The Chairs | `the-chairs` | Live Music & Festivals | Lucid Live | past | 2023-05-27 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live |
| 48 | `lucid-crowd-lu-2023` | Crowd Lu | `crowd-lu-2023` | Live Music & Festivals | Lucid Live | past | 2023-04-12 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live<br>duplicate title; confirm this is a distinct event/year |
| 49 | `sonica-music-festival-2023` | Sonica Music Festival | `sonica-music-festival` | Live Music & Festivals | Music Festival | past | 2023-03-01 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Music Festival |
| 50 | `lucid-sunset-rollercoaster-2022` | Sunset Rollercoaster | `sunset-rollercoaster-2022` | Live Music & Festivals | Lucid Live | past | 2022-12-12 | reused Naruto hero image appears to be placeholder<br>legacy/fine-grained categoryLabel: Lucid Live<br>duplicate title; confirm this is a distinct event/year |
| 52 | `ray-chen-recital-2022` | Ray Chen: In Recital | `ray-chen-in-recital-2022` | Classical Concerts & Theatre | Classical Concerts | past | 2022-08-13 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 53 | `mai-fujisawa-melody-of-japan` | Mai Fujisawa: Melody of Japan | `mai-fujisawa-melody-of-japan` | Classical Concerts & Theatre | Classical Concerts | past | 2019-11-16 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 54 | `lisa-ono-music-journey` | Lisa Ono: Music Journey | `lisa-ono-music-journey` | Classical Concerts & Theatre | Classical Concerts | past | 2019-09-22 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 55 | `piano-battle` | Piano Battle | `piano-battle` | Classical Concerts & Theatre | Classical Concerts | past | 2019-09-01 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 56 | `yiruma-2019-frame` | Yiruma 2019: Frame | `yiruma-2019-frame` | Classical Concerts & Theatre | Classical Concerts | past | 2019-05-18 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 57 | `yundi-li-sonata-world-tour` | Yundi Li 2018 Australia Tour: Touch of Chopin | `yundi-li-2018-australia-tour-touch-of-chopin` | Classical Concerts & Theatre | Classical Concerts | past | 2018-11-06 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 58 | `maksim-mrvica-new-silk-road` | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | `maksim-mrvica-2018-australia-tour-croatian-rhapsody` | Classical Concerts & Theatre | Classical Concerts | past | 2018-09-30 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 59 | `lisa-ono-la-vie-en-rose` | Lisa Ono Australia Tour: La Vie En Rose | `lisa-ono-australia-tour-la-vie-en-rose` | Classical Concerts & Theatre | Classical Concerts | past | 2018-05-20 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 60 | `peter-bence` | Peter Bence | `peter-bence` | Classical Concerts & Theatre | Classical Concerts | past | 2018-04-22 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 61 | `yiruma-oceania-tour` | Yiruma Piano 2017 Oceania Tour: Autumn Rain | `yiruma-piano-2017-oceania-tour-autumn-rain` | Classical Concerts & Theatre | Classical Concerts | past | 2017-12-14 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 62 | `shi-jin-melody-of-the-night` | Shi Jin Piano Concert: Melody of the Night | `shi-jin-piano-concert-melody-of-the-night` | Classical Concerts & Theatre | Classical Concerts | past | 2017-11-14 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 63 | `lu-siqing-violin-concert-nostalgia` | Lu Siqing Violin Concert: Nostalgia | `lu-siqing-violin-concert-nostalgia` | Classical Concerts & Theatre | Classical Concerts | past | 2016-08-17 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 64 | `yiruma-piano-australia-tour-2016` | Yiruma Piano 2016 Australia Tour: Kiss the Rain | `yiruma-piano-2016-australia-tour-kiss-the-rain` | Classical Concerts & Theatre | Classical Concerts | past | 2016-07-31 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |
| 65 | `sheng-zhongguo` | Sheng Zhongguo Violin Concert | `sheng-zhongguo-violin-concert` | Classical Concerts & Theatre | Classical Concerts | past | 2015-07-04 | external/remote cardImage should be replaced with Wix media asset<br>Unsplash placeholder image<br>legacy/fine-grained categoryLabel: Classical Concerts |

## Safe Automatic Fixes

These changes are treated as safe cleanup and do not, by themselves, require manual review.

### Slugs Generated or Cleaned

| Row | ID | Title | Old Slug | New Slug |
| --- | --- | --- | --- | --- |
| 2 | `mischa-maisky-recital` | Mischa Maisky in Recital | `MANUAL` | `mischa-maisky-in-recital` |
| 4 | `lucid-chang-cheng-yue-2026` | Chang Cheng-Yue | `MANUAL` | `chang-cheng-yue` |
| 6 | `one-piece-piano-symphony-2026` | ONE PIECE Piano Symphony | `MANUAL` | `one-piece-piano-symphony` |
| 7 | `lucid-enno-cheng-2026` | Enno Cheng | `MANUAL` | `enno-cheng` |
| 8 | `lucid-sunset-rollercoaster-2026` | Sunset Rollercoaster | `MANUAL` | `sunset-rollercoaster` |
| 9 | `lucid-moon-tang-2026` | moon tang | `MANUAL` | `moon-tang` |
| 10 | `lucid-the-landlords-cat-2026` | The Landlord's Cat | `MANUAL` | `the-landlord-s-cat` |
| 11 | `oddshapes-music-festival-2026` | Oddshapes Music Festival | `MANUAL` | `oddshapes-music-festival` |
| 12 | `christmas-at-cruden-farm-silvie-paladino` | Christmas at Cruden Farm with Silvie Paladino | `MANUAL` | `christmas-at-cruden-farm-with-silvie-paladino` |
| 13 | `lucid-crowd-lu-2025` | Crowd Lu | `MANUAL` | `crowd-lu` |
| 14 | `juan-diego-florez-2025` | Juan Diego Flórez in Recital | `MANUAL` | `juan-diego-florez-in-recital` |
| 15 | `demon-slayer-in-concert` | Demon Slayer:Kimetsu no Yaiba In Concert | `MANUAL` | `demon-slayer-kimetsu-no-yaiba-in-concert` |
| 16 | `lucid-virgin-vacation-2025` | Virgin Vacation | `MANUAL` | `virgin-vacation` |
| 17 | `lucid-waa-wei-2025` | waa wei | `MANUAL` | `waa-wei` |
| 18 | `ray-chen-recital-2025` | Ray Chen in Recital | `MANUAL` | `ray-chen-in-recital` |
| 19 | `lucid-lala-hsu-2025` | LaLa Hsu | `MANUAL` | `lala-hsu` |
| 20 | `lucid-skai-isyourgod-2025` | SKAI ISYOURGOD - SG | `MANUAL` | `skai-isyourgod-sg` |
| 21 | `lucid-9m88-2025` | 9m88 - SG | `MANUAL` | `9m88-sg` |
| 22 | `lucid-nmixx-2025` | NMIXX 2ND FAN CONCERT CHANGE UP: MIXX LAB IN AUSTRALIA | `MANUAL` | `nmixx-2nd-fan-concert-change-up-mixx-lab-in-australia` |
| 23 | `game-on-australia-premiere-tour-2025` | GAME ON! Australia Premiere Tour 2025 | `MANUAL` | `game-on-australia-premiere-tour-2025` |
| 24 | `lucid-gareth-t-na-2025` | Gareth.T - NA | `MANUAL` | `gareth-t-na` |
| 25 | `lucid-wannasleep-2025` | wannasleep | `MANUAL` | `wannasleep` |
| 26 | `final-fantasy-piano-concert` | Crystalline Resonance FINAL FANTASY Piano Concert | `MANUAL` | `crystalline-resonance-final-fantasy-piano-concert` |
| 27 | `lucid-831-2024` | 831 | `MANUAL` | `831` |
| 28 | `lucid-bestards-2024` | BESTARDS | `MANUAL` | `bestards` |
| 29 | `oddshapes-music-festival-2024` | Oddshapes Music Festival | `MANUAL` | `oddshapes-music-festival-2024` |
| 30 | `nobuo-uematsu-contiki-show` | Nobuo Uematsu conTIKI SHOW | `MANUAL` | `nobuo-uematsu-contiki-show` |
| 31 | `lucid-gareth-t-asia-au-2024` | Gareth.T - ASIA&AU | `MANUAL` | `gareth-t-asia-and-au` |
| 32 | `maxim-vengerov` | Maxim Vengerov | `MANUAL` | `maxim-vengerov` |
| 33 | `one-piece-music-symphony-2024` | ONE PIECE Music Symphony | `MANUAL` | `one-piece-music-symphony` |
| 34 | `one-piece-piano-symphony-2024` | ONE PIECE Piano Symphony | `MANUAL` | `one-piece-piano-symphony-2024` |
| 35 | `lucid-fish-leong-2024` | Fish Leong | `MANUAL` | `fish-leong` |
| 36 | `lucid-comz-2023-2024` | COM'Z | `MANUAL` | `com-z` |
| 37 | `milos-classical-guitar` | MILOŠ: The Classical Guitar Hero | `MANUAL` | `milos-the-classical-guitar-hero` |
| 38 | `juan-diego-florez-2023` | Juan Diego Flórez in Recital | `MANUAL` | `juan-diego-florez-in-recital-2023` |
| 39 | `lucid-kanho-yakushiji-2023` | Kanho Yakushiji | `MANUAL` | `kanho-yakushiji` |
| 40 | `lucid-cicada-2023` | Cicada | `MANUAL` | `cicada` |
| 41 | `lucid-showlo-2023` | ShowLo | `MANUAL` | `showlo` |
| 42 | `lucid-xiaoxia-2023` | XiaoXia | `MANUAL` | `xiaoxia` |
| 43 | `lucid-a-mei-2023` | A-Mei | `MANUAL` | `a-mei` |
| 44 | `marilyn-the-woman-behind-the-icon` | Marilyn - The Woman Behind the Icon | `MANUAL` | `marilyn-the-woman-behind-the-icon` |
| 45 | `lucid-weibird-2023` | WeiBird | `MANUAL` | `weibird` |
| 46 | `lucid-neongarden-2023` | NeonGarden | `MANUAL` | `neongarden` |
| 47 | `lucid-the-chairs-2023` | The Chairs | `MANUAL` | `the-chairs` |
| 48 | `lucid-crowd-lu-2023` | Crowd Lu | `MANUAL` | `crowd-lu-2023` |
| 49 | `sonica-music-festival-2023` | Sonica Music Festival | `MANUAL` | `sonica-music-festival` |
| 50 | `lucid-sunset-rollercoaster-2022` | Sunset Rollercoaster | `MANUAL` | `sunset-rollercoaster-2022` |
| 51 | `leonardo-da-vinci-taipei` | The Man Behind the Myth - Leonardo Da Vinci TAIPEI | `MANUAL` | `the-man-behind-the-myth-leonardo-da-vinci-taipei` |
| 52 | `ray-chen-recital-2022` | Ray Chen: In Recital | `MANUAL` | `ray-chen-in-recital-2022` |
| 53 | `mai-fujisawa-melody-of-japan` | Mai Fujisawa: Melody of Japan | `MANUAL` | `mai-fujisawa-melody-of-japan` |
| 54 | `lisa-ono-music-journey` | Lisa Ono: Music Journey | `MANUAL` | `lisa-ono-music-journey` |
| 55 | `piano-battle` | Piano Battle | `MANUAL` | `piano-battle` |
| 56 | `yiruma-2019-frame` | Yiruma 2019: Frame | `MANUAL` | `yiruma-2019-frame` |
| 57 | `yundi-li-sonata-world-tour` | Yundi Li 2018 Australia Tour: Touch of Chopin | `MANUAL` | `yundi-li-2018-australia-tour-touch-of-chopin` |
| 58 | `maksim-mrvica-new-silk-road` | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | `MANUAL` | `maksim-mrvica-2018-australia-tour-croatian-rhapsody` |
| 59 | `lisa-ono-la-vie-en-rose` | Lisa Ono Australia Tour: La Vie En Rose | `MANUAL` | `lisa-ono-australia-tour-la-vie-en-rose` |
| 60 | `peter-bence` | Peter Bence | `MANUAL` | `peter-bence` |
| 61 | `yiruma-oceania-tour` | Yiruma Piano 2017 Oceania Tour: Autumn Rain | `MANUAL` | `yiruma-piano-2017-oceania-tour-autumn-rain` |
| 62 | `shi-jin-melody-of-the-night` | Shi Jin Piano Concert: Melody of the Night | `MANUAL` | `shi-jin-piano-concert-melody-of-the-night` |
| 63 | `lu-siqing-violin-concert-nostalgia` | Lu Siqing Violin Concert: Nostalgia | `MANUAL` | `lu-siqing-violin-concert-nostalgia` |
| 64 | `yiruma-piano-australia-tour-2016` | Yiruma Piano 2016 Australia Tour: Kiss the Rain | `MANUAL` | `yiruma-piano-2016-australia-tour-kiss-the-rain` |
| 65 | `sheng-zhongguo` | Sheng Zhongguo Violin Concert | `MANUAL` | `sheng-zhongguo-violin-concert` |

### eventCardDate Normalized

| Row | ID | Title | Old Date | New Date |
| --- | --- | --- | --- | --- |
| 2 | `mischa-maisky-recital` | Mischa Maisky in Recital | 06-15 NOV 2026 | 06–15 NOV 2026 |
| 3 | `naruto-symphonic-experience` | NARUTO: The Symphonic Experience | 03-04 OCT 2026 | 03–04 OCT 2026 |
| 5 | `attack-on-titan-world-tour` | "Attack on Titan" - Beyond the Walls World Tour - The Official Concert | 05-07 JUL 2026 | 05–07 JUL 2026 |
| 6 | `one-piece-piano-symphony-2026` | ONE PIECE Piano Symphony | 24-26 APR 2026 | 24–26 APR 2026 |
| 14 | `juan-diego-florez-2025` | Juan Diego Flórez in Recital | 29 NOV-03 DEC 2025 | 29 NOV–03 DEC 2025 |
| 15 | `demon-slayer-in-concert` | Demon Slayer:Kimetsu no Yaiba In Concert | 17-31 OCT 2025 | 17–31 OCT 2025 |
| 18 | `ray-chen-recital-2025` | Ray Chen in Recital | 08-14 SEP 2025 | 08–14 SEP 2025 |
| 26 | `final-fantasy-piano-concert` | Crystalline Resonance FINAL FANTASY Piano Concert | 21 FEB-05 MAR 2025 | 21 FEB–05 MAR 2025 |
| 27 | `lucid-831-2024` | 831 | FEB / OCT 2024 | FEB–OCT 2024 |
| 30 | `nobuo-uematsu-contiki-show` | Nobuo Uematsu conTIKI SHOW | 05-08 SEP 2024 | 05–08 SEP 2024 |
| 32 | `maxim-vengerov` | Maxim Vengerov | 05-10 AUG 2024 | 05–10 AUG 2024 |
| 33 | `one-piece-music-symphony-2024` | ONE PIECE Music Symphony | 19-27 JUL 2024 | 19–27 JUL 2024 |
| 34 | `one-piece-piano-symphony-2024` | ONE PIECE Piano Symphony | 23-25 JUL 2024 | 23–25 JUL 2024 |
| 36 | `lucid-comz-2023-2024` | COM'Z | DEC 2023 / JAN 2024 | DEC 2023–JAN 2024 |
| 37 | `milos-classical-guitar` | MILOŠ: The Classical Guitar Hero | 05-12 NOV 2023 | 05–12 NOV 2023 |
| 38 | `juan-diego-florez-2023` | Juan Diego Flórez in Recital | 02-07 NOV 2023 | 02–07 NOV 2023 |
| 46 | `lucid-neongarden-2023` | NeonGarden | MAY / JUN 2023 | MAY–JUN 2023 |
| 52 | `ray-chen-recital-2022` | Ray Chen: In Recital | 06-13 AUG 2022 | 06–13 AUG 2022 |
| 53 | `mai-fujisawa-melody-of-japan` | Mai Fujisawa: Melody of Japan | 14-16 NOV 2019 | 14–16 NOV 2019 |
| 54 | `lisa-ono-music-journey` | Lisa Ono: Music Journey | 17-22 SEP 2019 | 17–22 SEP 2019 |
| 55 | `piano-battle` | Piano Battle | 25 AUG-01 SEP 2019 | 25 AUG–01 SEP 2019 |
| 56 | `yiruma-2019-frame` | Yiruma 2019: Frame | 10-18 MAY 2019 | 10–18 MAY 2019 |
| 57 | `yundi-li-sonata-world-tour` | Yundi Li 2018 Australia Tour: Touch of Chopin | 03-06 NOV 2018 | 03–06 NOV 2018 |
| 58 | `maksim-mrvica-new-silk-road` | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | 26-30 SEP 2018 | 26–30 SEP 2018 |
| 59 | `lisa-ono-la-vie-en-rose` | Lisa Ono Australia Tour: La Vie En Rose | 17-20 MAY 2018 | 17–20 MAY 2018 |
| 61 | `yiruma-oceania-tour` | Yiruma Piano 2017 Oceania Tour: Autumn Rain | MAY / DEC 2017 | MAY–DEC 2017 |
| 62 | `shi-jin-melody-of-the-night` | Shi Jin Piano Concert: Melody of the Night | 12-14 NOV 2017 | 12–14 NOV 2017 |
| 63 | `lu-siqing-violin-concert-nostalgia` | Lu Siqing Violin Concert: Nostalgia | 16-17 AUG 2016 | 16–17 AUG 2016 |
| 64 | `yiruma-piano-australia-tour-2016` | Yiruma Piano 2016 Australia Tour: Kiss the Rain | 26-31 JUL 2016 | 26–31 JUL 2016 |
| 65 | `sheng-zhongguo` | Sheng Zhongguo Violin Concert | 03-04 JUL 2015 | 03–04 JUL 2015 |

### OPTIONAL Values Cleared

| Field | Count |
| --- | --- |
| sourceUrl | 58 |
| ticketPrimaryUrl | 60 |

### First 10 Rows With Safe Automatic Fixes

| Row | ID | Title | Safe Fixes |
| --- | --- | --- | --- |
| 2 | `mischa-maisky-recital` | Mischa Maisky in Recital | slug generated/cleaned<br>eventCardDate normalized<br>ticketPrimaryUrl OPTIONAL cleared<br>sourceUrl OPTIONAL cleared |
| 3 | `naruto-symphonic-experience` | NARUTO: The Symphonic Experience | eventCardDate normalized |
| 4 | `lucid-chang-cheng-yue-2026` | Chang Cheng-Yue | slug generated/cleaned<br>ticketPrimaryUrl OPTIONAL cleared<br>sourceUrl OPTIONAL cleared |
| 5 | `attack-on-titan-world-tour` | "Attack on Titan" - Beyond the Walls World Tour - The Official Concert | eventCardDate normalized |
| 6 | `one-piece-piano-symphony-2026` | ONE PIECE Piano Symphony | slug generated/cleaned<br>eventCardDate normalized |
| 7 | `lucid-enno-cheng-2026` | Enno Cheng | slug generated/cleaned<br>ticketPrimaryUrl OPTIONAL cleared<br>sourceUrl OPTIONAL cleared |
| 8 | `lucid-sunset-rollercoaster-2026` | Sunset Rollercoaster | slug generated/cleaned<br>ticketPrimaryUrl OPTIONAL cleared<br>sourceUrl OPTIONAL cleared |
| 9 | `lucid-moon-tang-2026` | moon tang | slug generated/cleaned<br>ticketPrimaryUrl OPTIONAL cleared<br>sourceUrl OPTIONAL cleared |
| 10 | `lucid-the-landlords-cat-2026` | The Landlord's Cat | slug generated/cleaned<br>ticketPrimaryUrl OPTIONAL cleared<br>sourceUrl OPTIONAL cleared |
| 11 | `oddshapes-music-festival-2026` | Oddshapes Music Festival | slug generated/cleaned<br>ticketPrimaryUrl OPTIONAL cleared<br>sourceUrl OPTIONAL cleared |

## Notes

- Generated slugs, normalized dates, and cleared `OPTIONAL` placeholders are not counted as manual-review issues unless another content issue is present.
- `sourceUrl` and `ticketPrimaryUrl` are only treated as blocking manual-review issues for active/future events.
- Category labels are flagged when they still use legacy/fine-grained labels instead of the current finalized public labels.
- Remote Unsplash images and reused Naruto hero images are flagged as suspicious assets for editorial/Wix media review.
