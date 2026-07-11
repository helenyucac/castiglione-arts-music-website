import assert from "node:assert/strict";

const { getTourHrefFromSlug, normalizeTourSlug } = await import("../lib/tourSlug.ts");

const expectedSlug = "the-man-behind-the-myth-leonardo-da-vinci-taipei";
const expectedHref = `/tours/${expectedSlug}`;
const cases = [
  "The Man Behind the Myth - Leonardo Da Vinci TAIPEI",
  "the-man-behind-the-myth-leonardo-da-vinci-taipei",
  "the-man-behind-the-myth- leonardo-da-vinci-taipei",
  "the-man-behind-the-myth - leonardo-da-vinci-taipei",
];

for (const value of cases) {
  const slug = normalizeTourSlug(value);
  const href = getTourHrefFromSlug(value);

  assert.equal(slug, expectedSlug);
  assert.equal(href, expectedHref);
  assert.equal(href.includes("%20"), false);
  assert.equal(/\s/.test(href), false);
  assert.equal(href.includes("--"), false);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      cases: cases.length,
      expectedHref,
    },
    null,
    2,
  ),
);
