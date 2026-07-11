# Events Manual Review

Focused editorial review sheet generated from `Events.csv` and `Events.cleaned.csv`. Safe automatic cleanup items, such as generated slugs, normalized dates, and cleared `OPTIONAL` placeholders, are not included unless another real content issue exists.

## Summary

- Rows in Events.csv: 64
- Rows in Events.cleaned.csv: 64
- Rows in manual review sheet: 62
- Highest-priority rows before Wix import: 3

## Top Review Reasons

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

These rows have active/future URL gaps, status/date conflicts, missing images, invalid dates, or unknown categories.

| Row | Title | Status | sortDate | Review Reason | Recommended Action |
| --- | --- | --- | --- | --- | --- |
| 2 | Mischa Maisky in Recital | upcoming | 2026-11-15 | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; active/future event missing ticketPrimaryUrl; active/future event missing sourceUrl | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre; add ticketPrimaryUrl; add official event sourceUrl |
| 4 | Chang Cheng-Yue | upcoming | 2026-08-07 | reused Naruto placeholder image; active/future event missing ticketPrimaryUrl; active/future event missing sourceUrl | replace reused Naruto placeholder; add ticketPrimaryUrl; add official event sourceUrl |
| 11 | Oddshapes Music Festival | upcoming | 2026-03-01 | reused Naruto placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; status conflicts with sortDate; duplicate title | replace reused Naruto placeholder; normalize categoryLabel to Live Music & Festivals; confirm status or update sortDate; confirm this is a distinct event/year |

## Manual Review Rows

| Row | Title | Cleaned Slug | Program | Category Label | Suggested Category | Review Reason | Recommended Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | Mischa Maisky in Recital | mischa-maisky-in-recital | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; active/future event missing ticketPrimaryUrl; active/future event missing sourceUrl | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre; add ticketPrimaryUrl; add official event sourceUrl |
| 3 | NARUTO: The Symphonic Experience | naruto-the-symphonic-experience | Anime & Gaming Concerts | Anime Concerts | Anime & Gaming Concerts | legacy categoryLabel needs editorial taxonomy confirmation | normalize categoryLabel to Anime & Gaming Concerts |
| 4 | Chang Cheng-Yue | chang-cheng-yue | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image; active/future event missing ticketPrimaryUrl; active/future event missing sourceUrl | replace reused Naruto placeholder; add ticketPrimaryUrl; add official event sourceUrl |
| 5 | "Attack on Titan" - Beyond the Walls World Tour - The Official Concert | attack-on-titan-beyond-the-walls-world-tour | Anime & Gaming Concerts | Anime Concerts | Anime & Gaming Concerts | legacy categoryLabel needs editorial taxonomy confirmation | normalize categoryLabel to Anime & Gaming Concerts |
| 6 | ONE PIECE Piano Symphony | one-piece-piano-symphony | Anime & Gaming Concerts | Anime Concerts | Anime & Gaming Concerts | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; duplicate title | replace Unsplash placeholder; normalize categoryLabel to Anime & Gaming Concerts; confirm this is a distinct event/year |
| 7 | Enno Cheng | enno-cheng | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 8 | Sunset Rollercoaster | sunset-rollercoaster | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image; duplicate title | replace reused Naruto placeholder; confirm this is a distinct event/year |
| 9 | moon tang | moon-tang | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 10 | The Landlord's Cat | the-landlord-s-cat | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 11 | Oddshapes Music Festival | oddshapes-music-festival | Live Music & Festivals | Music Festival | Live Music & Festivals | reused Naruto placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; status conflicts with sortDate; duplicate title | replace reused Naruto placeholder; normalize categoryLabel to Live Music & Festivals; confirm status or update sortDate; confirm this is a distinct event/year |
| 12 | Christmas at Cruden Farm with Silvie Paladino | christmas-at-cruden-farm-with-silvie-paladino | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 13 | Crowd Lu | crowd-lu | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image; duplicate title | replace reused Naruto placeholder; confirm this is a distinct event/year |
| 14 | Juan Diego Flórez in Recital | juan-diego-florez-in-recital | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; duplicate title | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre; confirm this is a distinct event/year |
| 15 | Demon Slayer:Kimetsu no Yaiba In Concert | demon-slayer-kimetsu-no-yaiba-in-concert | Anime & Gaming Concerts | Anime Concerts | Anime & Gaming Concerts | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Anime & Gaming Concerts |
| 16 | Virgin Vacation | virgin-vacation | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 17 | waa wei | waa-wei | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 18 | Ray Chen in Recital | ray-chen-in-recital | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 19 | LaLa Hsu | lala-hsu | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 20 | SKAI ISYOURGOD - SG | skai-isyourgod-sg | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 21 | 9m88 - SG | 9m88-sg | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 22 | NMIXX 2ND FAN CONCERT CHANGE UP: MIXX LAB IN AUSTRALIA | nmixx-2nd-fan-concert-change-up-mixx-lab-in-australia | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 23 | GAME ON! Australia Premiere Tour 2025 | game-on-australia-premiere-tour-2025 | Anime & Gaming Concerts | Gaming Concerts | Anime & Gaming Concerts | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Anime & Gaming Concerts |
| 24 | Gareth.T - NA | gareth-t-na | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 25 | wannasleep | wannasleep | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 26 | Crystalline Resonance FINAL FANTASY Piano Concert | crystalline-resonance-final-fantasy-piano-concert | Anime & Gaming Concerts | Gaming Concerts | Anime & Gaming Concerts | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Anime & Gaming Concerts |
| 27 | 831 | 831 | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image; title too vague or numeric-only | replace reused Naruto placeholder; confirm editorial display title |
| 28 | BESTARDS | bestards | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 29 | Oddshapes Music Festival | oddshapes-music-festival-2024 | Live Music & Festivals | Music Festival | Live Music & Festivals | reused Naruto placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; duplicate title | replace reused Naruto placeholder; normalize categoryLabel to Live Music & Festivals; confirm this is a distinct event/year |
| 30 | Nobuo Uematsu conTIKI SHOW | nobuo-uematsu-contiki-show | Anime & Gaming Concerts | Gaming Concerts | Anime & Gaming Concerts | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Anime & Gaming Concerts |
| 31 | Gareth.T - ASIA&AU | gareth-t-asia-and-au | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 32 | Maxim Vengerov | maxim-vengerov | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 33 | ONE PIECE Music Symphony | one-piece-music-symphony | Anime & Gaming Concerts | Anime Concerts | Anime & Gaming Concerts | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Anime & Gaming Concerts |
| 34 | ONE PIECE Piano Symphony | one-piece-piano-symphony-2024 | Anime & Gaming Concerts | Anime Concerts | Anime & Gaming Concerts | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; duplicate title | replace Unsplash placeholder; normalize categoryLabel to Anime & Gaming Concerts; confirm this is a distinct event/year |
| 35 | Fish Leong | fish-leong | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 36 | COM'Z | com-z | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 37 | MILOŠ: The Classical Guitar Hero | milos-the-classical-guitar-hero | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 38 | Juan Diego Flórez in Recital | juan-diego-florez-in-recital-2023 | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation; duplicate title | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre; confirm this is a distinct event/year |
| 39 | Kanho Yakushiji | kanho-yakushiji | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 40 | Cicada | cicada | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 41 | ShowLo | showlo | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 42 | XiaoXia | xiaoxia | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 43 | A-Mei | a-mei | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 45 | WeiBird | weibird | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 46 | NeonGarden | neongarden | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 47 | The Chairs | the-chairs | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image | replace reused Naruto placeholder |
| 48 | Crowd Lu | crowd-lu-2023 | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image; duplicate title | replace reused Naruto placeholder; confirm this is a distinct event/year |
| 49 | Sonica Music Festival | sonica-music-festival | Live Music & Festivals | Music Festival | Live Music & Festivals | reused Naruto placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace reused Naruto placeholder; normalize categoryLabel to Live Music & Festivals |
| 50 | Sunset Rollercoaster | sunset-rollercoaster-2022 | Live Music & Festivals | Lucid Live | Lucid Live | reused Naruto placeholder image; duplicate title | replace reused Naruto placeholder; confirm this is a distinct event/year |
| 52 | Ray Chen: In Recital | ray-chen-in-recital-2022 | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 53 | Mai Fujisawa: Melody of Japan | mai-fujisawa-melody-of-japan | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 54 | Lisa Ono: Music Journey | lisa-ono-music-journey | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 55 | Piano Battle | piano-battle | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 56 | Yiruma 2019: Frame | yiruma-2019-frame | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 57 | Yundi Li 2018 Australia Tour: Touch of Chopin | yundi-li-2018-australia-tour-touch-of-chopin | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 58 | Maksim Mrvica 2018 Australia Tour: Croatian Rhapsody | maksim-mrvica-2018-australia-tour-croatian-rhapsody | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 59 | Lisa Ono Australia Tour: La Vie En Rose | lisa-ono-australia-tour-la-vie-en-rose | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 60 | Peter Bence | peter-bence | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 61 | Yiruma Piano 2017 Oceania Tour: Autumn Rain | yiruma-piano-2017-oceania-tour-autumn-rain | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 62 | Shi Jin Piano Concert: Melody of the Night | shi-jin-piano-concert-melody-of-the-night | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 63 | Lu Siqing Violin Concert: Nostalgia | lu-siqing-violin-concert-nostalgia | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 64 | Yiruma Piano 2016 Australia Tour: Kiss the Rain | yiruma-piano-2016-australia-tour-kiss-the-rain | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |
| 65 | Sheng Zhongguo Violin Concert | sheng-zhongguo-violin-concert | Classical Concerts & Theatre | Classical Concerts | Classical Concerts & Theatre | Unsplash placeholder image; legacy categoryLabel needs editorial taxonomy confirmation | replace Unsplash placeholder; normalize categoryLabel to Classical Concerts & Theatre |

## Notes

- Rows are not included solely because a slug was generated.
- Rows are not included solely because `OPTIONAL` was cleared.
- Rows are not included solely because `eventCardDate` was normalized.
- Past events with blank ticket/source URLs are not treated as URL-blocking issues.
- Image review focuses on placeholder, reused, missing, or remote/generic images.
