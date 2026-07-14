import assert from "node:assert/strict";
import { getEventCardHref } from "../lib/eventCardHref.ts";
import {
  resolveUpcomingRelatedEventsForRuntime,
} from "../lib/wix/eventDetailContent.ts";
import {
  getTicketCtaLabel,
  getValidTicketHref,
  isDisabledTicketCtaState,
  isRelatedEventStatusEligible,
} from "../lib/ticketCta.ts";
import { normalizeEvent } from "../lib/wix/normalizers.ts";
import { resolveCmsListingEventsForRuntime } from "../lib/wix/listingData.ts";

const cmsChang = normalizeEvent({
  _id: "cms-chang",
  fieldData: {
    title: "Chang Cheng-Yue",
    slug: "chang-cheng-yue",
    program: "Live Music & Festivals",
    categoryLabel: "Live Music & Festivals",
    programCategory: "LUCID LIVE",
    status: "upcoming",
    sortDate: "2026-12-01",
    eventCardDate: "DEC 2026",
    eventCardCities: "Melbourne",
    isVisible: true,
    isFeaturedHome: true,
    cardImageAsset:
      "wix:image://v1/chang-card.jpg/chang-card.jpg#originWidth=1080&originHeight=1350",
    cardImage: "/media/naruto-poster.jpg",
    externalEventUrl: "https://lucidlivemusic.com/event/chang-cheng-yue/",
  },
});

assert.equal(cmsChang.image, "https://static.wixstatic.com/media/chang-card.jpg");
assert.notEqual(cmsChang.image, "/media/naruto-poster.jpg");
assert.equal(getEventCardHref(cmsChang), "https://lucidlivemusic.com/event/chang-cheng-yue/");

const cmsNaruto = normalizeEvent({
  _id: "cms-naruto",
  fieldData: {
    title: "NARUTO: The Symphonic Experience",
    slug: "naruto-the-symphonic-experience",
    program: "Anime & Gaming Concerts",
    categoryLabel: "Anime & Gaming Concerts",
    status: "on-sale",
    sortDate: "2026-10-03",
    eventCardDate: "03–04 OCT 2026",
    eventCardCities: "Sydney · Melbourne",
    isVisible: true,
    isFeaturedHome: true,
    cardImageAsset:
      "wix:image://v1/naruto-card.jpg/naruto-card.jpg#originWidth=1080&originHeight=1350",
  },
});

assert.equal(getEventCardHref(cmsNaruto), "/tours/naruto-the-symphonic-experience");

const cmsTypoSlug = normalizeEvent({
  _id: "cms-da-vinci",
  fieldData: {
    title: "The Man Behind the Myth - Leonardo Da Vinci TAIPEI",
    slug: "the-man-behind-the-myth- leonardo-da-vinci-taipei",
    program: "Touring Exhibitions",
    categoryLabel: "Touring Exhibitions",
    status: "upcoming",
    sortDate: "2026-08-01",
    eventCardDate: "AUG 2026",
    eventCardCities: "Taipei",
    isVisible: true,
    cardImageAsset:
      "wix:image://v1/davinci-card.jpg/davinci-card.jpg#originWidth=1080&originHeight=1350",
  },
});

assert.equal(
  getEventCardHref(cmsTypoSlug),
  "/tours/the-man-behind-the-myth-leonardo-da-vinci-taipei",
);
assert.equal(getEventCardHref(cmsTypoSlug).includes("%20"), false);

const runtimeEvents = resolveCmsListingEventsForRuntime([cmsChang, cmsNaruto]);
assert.equal(runtimeEvents.length, 2);
assert.equal(runtimeEvents[0].title, "Chang Cheng-Yue");
assert.equal(runtimeEvents.some((event) => event.image === "/media/naruto-poster.jpg"), false);
assert.equal(
  runtimeEvents.some((event) => event.title === "Symphonic Stories: Anime Worlds Live"),
  false,
);

const cmsDongpo = normalizeEvent({
  _id: "cms-dongpo",
  fieldData: {
    title: "Dongpo: Life in Poems",
    slug: "dongpo-life-in-poems",
    program: "Classical Concerts & Theatre",
    categoryLabel: "Classical Concerts & Theatre",
    status: "coming-soon",
    sortDate: "2026-11-01",
    eventCardDate: "NOV 2026",
    eventCardCities: "Melbourne",
    isVisible: true,
    isFeaturedHome: true,
    isFeaturedProgram: true,
    cardImageAsset:
      "wix:image://v1/dongpo-card.jpg/dongpo-card.jpg#originWidth=1080&originHeight=1350",
    ticketPrimaryUrl: "",
    ticketPrimaryLabel: "COMING SOON",
  },
});

assert.equal(cmsDongpo.status, "coming-soon");
assert.equal(isRelatedEventStatusEligible(cmsDongpo.status), true);
assert.equal(getValidTicketHref(""), undefined);
assert.equal(getTicketCtaLabel("coming_soon", "BUY TICKETS", ""), "COMING SOON");
assert.equal(isDisabledTicketCtaState("coming soon", ""), true);
assert.equal(getTicketCtaLabel("event-ended", "BUY TICKETS", "https://example.com"), "EVENT ENDED");
assert.equal(isDisabledTicketCtaState("past", "https://example.com"), true);

const relatedEvents = await resolveUpcomingRelatedEventsForRuntime(
  [cmsNaruto, cmsDongpo, cmsChang],
  [cmsNaruto.id, cmsNaruto.slug],
  async (event) => (event.slug === "dongpo-life-in-poems" ? 1 : 2),
);

assert.equal(relatedEvents.some((event) => event.slug === "naruto-the-symphonic-experience"), false);
assert.equal(relatedEvents.some((event) => event.slug === "dongpo-life-in-poems"), true);
assert.equal(relatedEvents[0].slug, "dongpo-life-in-poems");

console.log(
  "CMS event regression verification passed",
  {
    changImage: cmsChang.image,
    changHref: getEventCardHref(cmsChang),
    narutoHref: getEventCardHref(cmsNaruto),
    daVinciHref: getEventCardHref(cmsTypoSlug),
    dongpoStatus: cmsDongpo.status,
    dongpoTopCtaLabel: getTicketCtaLabel("coming-soon", "BUY TICKETS", ""),
    dongpoTopCtaHref: getValidTicketHref(""),
    relatedEventSlugs: relatedEvents.map((event) => event.slug),
    runtimeEventCount: runtimeEvents.length,
  },
);
