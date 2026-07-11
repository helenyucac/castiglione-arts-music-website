import assert from "node:assert/strict";

const {
  firstProgramCategoryForProgram,
  normalizeProgramCategoryValue,
  programCategoryToTourCategory,
  resolveLiveMusicFestivalSubcategory,
} = await import("../lib/liveMusicFestivalSubcategory.ts");
const {
  resolveProgramPageEyebrow,
  resolveProgramPageHeading,
  resolveProgramPrimaryFilterLabel,
  resolveProgramSecondaryFilterLabel,
  resolveProgramViewAllLabel,
} = await import("../lib/programPageText.ts");

function normalizeLiveMusicCategory(title, programCategory, legacySubcategory) {
  const resolvedProgramCategory =
    firstProgramCategoryForProgram("live-music-festival", [programCategory]) ??
    firstProgramCategoryForProgram("live-music-festival", [legacySubcategory]) ??
    resolveLiveMusicFestivalSubcategory(title);

  return programCategoryToTourCategory(resolvedProgramCategory);
}

function normalizeConcertCategory(programCategory, legacySubcategory) {
  const resolvedProgramCategory =
    firstProgramCategoryForProgram("anime-gaming-concerts", [programCategory]) ??
    firstProgramCategoryForProgram("anime-gaming-concerts", [legacySubcategory]);

  return resolvedProgramCategory ? programCategoryToTourCategory(resolvedProgramCategory) : null;
}

const categoryCases = [
  {
    title: "Oddshapes Music Festival",
    programCategory: undefined,
    legacySubcategory: undefined,
    expectedSubcategory: "music-festivals",
    expectedCategory: "music-festival",
  },
  {
    title: "Sonica Music Festival",
    programCategory: "LUCID LIVE",
    legacySubcategory: undefined,
    expectedSubcategory: "lucid-live",
    expectedCategory: "lucid",
  },
  {
    title: "Chang Cheng-Yue",
    programCategory: "LUCID LIVE",
    legacySubcategory: undefined,
    expectedSubcategory: "lucid-live",
    expectedCategory: "lucid",
  },
  {
    title: "Enno Cheng",
    programCategory: undefined,
    legacySubcategory: undefined,
    expectedSubcategory: "lucid-live",
    expectedCategory: "lucid",
  },
  {
    title: "Sunset Rollercoaster",
    programCategory: "MUSIC FESTIVALS",
    legacySubcategory: undefined,
    expectedSubcategory: "music-festivals",
    expectedCategory: "music-festival",
  },
];

assert.equal(normalizeProgramCategoryValue("LUCID LIVE"), "lucid-live");
assert.equal(normalizeProgramCategoryValue("MUSIC FESTIVALS"), "music-festivals");
assert.equal(normalizeProgramCategoryValue("ANIME & GAMING CONCERTS"), "anime-gaming-concerts");
assert.equal(
  normalizeProgramCategoryValue("CLASSICAL CONCERTS & THEATRE"),
  "classical-concerts-theatre",
);
assert.equal(normalizeProgramCategoryValue("CLASSICAL CONCERTS AND THEATRE"), "classical-concerts-theatre");
assert.equal(normalizeProgramCategoryValue(" anime   &   gaming__concerts "), "anime-gaming-concerts");
assert.equal(firstProgramCategoryForProgram("live-music-festival", ["ANIME & GAMING CONCERTS"]), null);
assert.equal(firstProgramCategoryForProgram("anime-gaming-concerts", ["LUCID LIVE"]), null);
assert.equal(normalizeConcertCategory("ANIME & GAMING CONCERTS"), "anime-concert");
assert.equal(normalizeConcertCategory("CLASSICAL CONCERTS & THEATRE"), "classical-recital");
assert.equal(normalizeConcertCategory(undefined, "CLASSICAL CONCERTS & THEATRE"), "classical-recital");

for (const categoryCase of categoryCases) {
  const subcategory =
    firstProgramCategoryForProgram("live-music-festival", [categoryCase.programCategory]) ??
    firstProgramCategoryForProgram("live-music-festival", [categoryCase.legacySubcategory]) ??
    resolveLiveMusicFestivalSubcategory(categoryCase.title);
  const category = normalizeLiveMusicCategory(
    categoryCase.title,
    categoryCase.programCategory,
    categoryCase.legacySubcategory,
  );

  assert.equal(subcategory, categoryCase.expectedSubcategory);
  assert.equal(category, categoryCase.expectedCategory);
}

const normalizedEvents = categoryCases.map((categoryCase, index) => ({
  id: `event-${index + 1}`,
  title: categoryCase.title,
  category: normalizeLiveMusicCategory(
    categoryCase.title,
    categoryCase.programCategory,
    categoryCase.legacySubcategory,
  ),
}));

const lucidLiveEvents = normalizedEvents.filter((event) => event.category === "lucid");
const musicFestivalEvents = normalizedEvents.filter((event) => event.category === "music-festival");
const overlap = lucidLiveEvents.filter((lucidEvent) =>
  musicFestivalEvents.some((festivalEvent) => festivalEvent.id === lucidEvent.id),
);

assert.equal(musicFestivalEvents.length, 2);
assert.equal(lucidLiveEvents.length, 3);
assert.equal(overlap.length, 0);
assert.equal(normalizedEvents.length, lucidLiveEvents.length + musicFestivalEvents.length);

const concertEvents = [
  {
    id: "concert-1",
    title: "NARUTO: The Symphonic Experience",
    category: normalizeConcertCategory("ANIME & GAMING CONCERTS"),
  },
  {
    id: "concert-2",
    title: "Mischa Maisky in Recital",
    category: normalizeConcertCategory("CLASSICAL CONCERTS & THEATRE"),
  },
  {
    id: "concert-3",
    title: "Cross-program value should not classify",
    category: normalizeConcertCategory("LUCID LIVE"),
  },
].filter((event) => event.category);
const animeGamingConcertEvents = concertEvents.filter((event) => event.category === "anime-concert");
const classicalConcertEvents = concertEvents.filter((event) => event.category === "classical-recital");
const concertOverlap = animeGamingConcertEvents.filter((animeEvent) =>
  classicalConcertEvents.some((classicalEvent) => classicalEvent.id === animeEvent.id),
);

assert.equal(animeGamingConcertEvents.length, 1);
assert.equal(classicalConcertEvents.length, 1);
assert.equal(concertOverlap.length, 0);
assert.equal(concertEvents.length, animeGamingConcertEvents.length + classicalConcertEvents.length);

const programWithCmsText = {
  pageEyebrow: resolveProgramPageEyebrow({
    pageEyebrow: "  PROGRAM / LIVE MUSIC & FESTIVAL  ",
  }),
  pageHeading: resolveProgramPageHeading({
    pageHeading: "  CMS editable page heading.  ",
  }),
  viewAllLabel: resolveProgramViewAllLabel({
    viewAllLabel: "  EVERYTHING  ",
  }),
  primaryFilterLabel: resolveProgramPrimaryFilterLabel({
    primaryFilterLabel: "  LUCID LIVE EXPERIENCES  ",
  }),
  secondaryFilterLabel: resolveProgramSecondaryFilterLabel({
    secondaryFilterLabel: "  FESTIVAL PROJECTS  ",
  }),
};
const programWithoutCmsText = {
  pageEyebrow: resolveProgramPageEyebrow({
    pageEyebrow: " ",
  }),
  pageHeading: resolveProgramPageHeading({
    pageHeading: null,
    description: "",
  }),
  viewAllLabel: resolveProgramViewAllLabel({
    viewAllLabel: " ",
  }),
  primaryFilterLabel: resolveProgramPrimaryFilterLabel({
    primaryFilterLabel: null,
  }),
  secondaryFilterLabel: resolveProgramSecondaryFilterLabel({
    secondaryFilterLabel: undefined,
  }),
};

assert.equal(programWithCmsText.pageEyebrow, "PROGRAM / LIVE MUSIC & FESTIVAL");
assert.equal(programWithCmsText.pageHeading, "CMS editable page heading.");
assert.equal(programWithCmsText.viewAllLabel, "EVERYTHING");
assert.equal(programWithCmsText.primaryFilterLabel, "LUCID LIVE EXPERIENCES");
assert.equal(programWithCmsText.secondaryFilterLabel, "FESTIVAL PROJECTS");
assert.equal(programWithoutCmsText.pageEyebrow, undefined);
assert.equal(programWithoutCmsText.pageHeading, undefined);
assert.equal(programWithoutCmsText.viewAllLabel, undefined);
assert.equal(programWithoutCmsText.primaryFilterLabel, undefined);
assert.equal(programWithoutCmsText.secondaryFilterLabel, undefined);

const liveMusicFilters = [
  { label: programWithCmsText.viewAllLabel, value: "all" },
  { label: programWithCmsText.primaryFilterLabel, value: "lucid-live" },
  { label: programWithCmsText.secondaryFilterLabel, value: "music-festivals" },
];
const concertFilters = [
  { label: "EVERY CONCERT", value: "all" },
  { label: "ANIME / GAME", value: "anime-gaming-concerts" },
  { label: "CLASSICAL", value: "classical-concerts-theatre" },
];

assert.deepEqual(
  liveMusicFilters.map((filter) => filter.value),
  ["all", "lucid-live", "music-festivals"],
);
assert.deepEqual(
  concertFilters.map((filter) => filter.value),
  ["all", "anime-gaming-concerts", "classical-concerts-theatre"],
);

console.log(
  JSON.stringify(
    {
      ok: true,
      musicFestivalCount: musicFestivalEvents.length,
      lucidLiveCount: lucidLiveEvents.length,
      viewAllCount: normalizedEvents.length,
      overlapCount: overlap.length,
      animeGamingConcertCount: animeGamingConcertEvents.length,
      classicalConcertCount: classicalConcertEvents.length,
      concertViewAllCount: concertEvents.length,
      concertOverlapCount: concertOverlap.length,
      cmsPageEyebrow: programWithCmsText.pageEyebrow,
      cmsPageHeading: programWithCmsText.pageHeading,
      cmsFilterLabels: {
        viewAllLabel: programWithCmsText.viewAllLabel,
        primaryFilterLabel: programWithCmsText.primaryFilterLabel,
        secondaryFilterLabel: programWithCmsText.secondaryFilterLabel,
      },
      canonicalFilterKeys: liveMusicFilters.map((filter) => filter.value),
      fallbackTextPreservedWhenEmpty:
        !programWithoutCmsText.pageEyebrow &&
        !programWithoutCmsText.pageHeading &&
        !programWithoutCmsText.viewAllLabel &&
        !programWithoutCmsText.primaryFilterLabel &&
        !programWithoutCmsText.secondaryFilterLabel,
    },
    null,
    2,
  ),
);
