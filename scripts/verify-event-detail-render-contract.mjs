import assert from "node:assert/strict";

const mockMergedEventDetail = {
  slug: "naruto-the-symphonic-experience",
  title: "NARUTO: The Symphonic Experience",
  trailerEyebrow: "TRAILER VIDEO",
  trailerVideoSrc: undefined,
  trailerPosterSrc: undefined,
  galleryImages: [],
  tourDates: [
    {
      date: "03 OCT 2026",
      city: "Sydney",
      venue: "ICC Darling Harbour Theatre",
      ticketLabel: "BUY TICKETS",
      ticketHref: "https://example.com/tickets",
    },
  ],
};

const mockNormalizedVideo = {
  title: "TRAILER VIDEO",
  src: "https://video.wixstatic.com/video/mock-naruto-trailer/1080p/mp4/file.mp4",
  posterImage: "https://static.wixstatic.com/media/mock-naruto-poster.jpg",
};

const mockNormalizedGallery = [
  {
    src: "https://static.wixstatic.com/media/mock-gallery-01.jpg",
    alt: "Naruto gallery image 1",
    caption: "Gallery image 1",
  },
  {
    src: "https://static.wixstatic.com/media/mock-gallery-02.jpg",
    alt: "Naruto gallery image 2",
    caption: "Gallery image 2",
  },
];

function getEventVideoSource(video) {
  return video.src ?? video.videoUrl;
}

function mapResolverMediaToEventDetail({ mergedEvent, cmsTrailerVideo, cmsGalleryImages }) {
  const resolvedGalleryImages = cmsGalleryImages
    ? cmsGalleryImages.map((image) => ({
        src: image.src,
        alt: image.alt,
        caption: image.caption,
      }))
    : mergedEvent.galleryImages;

  return {
    ...mergedEvent,
    trailerEyebrow: cmsTrailerVideo
      ? cmsTrailerVideo.title ?? mergedEvent.trailerEyebrow
      : mergedEvent.trailerEyebrow,
    trailerVideoSrc: cmsTrailerVideo
      ? getEventVideoSource(cmsTrailerVideo)
      : mergedEvent.trailerVideoSrc,
    trailerPosterSrc: cmsTrailerVideo?.posterImage ?? mergedEvent.trailerPosterSrc,
    galleryImages: resolvedGalleryImages,
  };
}

const finalEventDetailData = mapResolverMediaToEventDetail({
  mergedEvent: mockMergedEventDetail,
  cmsTrailerVideo: mockNormalizedVideo,
  cmsGalleryImages: mockNormalizedGallery,
});

assert.ok(finalEventDetailData.trailerVideoSrc, "trailerVideoSrc should be populated");
assert.equal(
  finalEventDetailData.trailerVideoSrc,
  "https://video.wixstatic.com/video/mock-naruto-trailer/1080p/mp4/file.mp4",
);
assert.ok(finalEventDetailData.trailerPosterSrc, "trailerPosterSrc should be populated");
assert.equal(
  finalEventDetailData.trailerPosterSrc,
  "https://static.wixstatic.com/media/mock-naruto-poster.jpg",
);
assert.equal(finalEventDetailData.galleryImages.length, 2);
assert.deepEqual(
  finalEventDetailData.galleryImages.map((image) => image.src),
  [
    "https://static.wixstatic.com/media/mock-gallery-01.jpg",
    "https://static.wixstatic.com/media/mock-gallery-02.jpg",
  ],
);
assert.equal(Boolean(finalEventDetailData.trailerVideoSrc), true);
assert.equal(finalEventDetailData.galleryImages.length > 0, true);
assert.equal(finalEventDetailData.tourDates.length, 1);

console.log(
  JSON.stringify(
    {
      ok: true,
      trailerVideoSrc: finalEventDetailData.trailerVideoSrc,
      trailerPosterSrc: finalEventDetailData.trailerPosterSrc,
      galleryImagesLength: finalEventDetailData.galleryImages.length,
      wouldRenderTrailer: Boolean(finalEventDetailData.trailerVideoSrc),
      wouldRenderGallery: finalEventDetailData.galleryImages.length > 0,
      tourDatesLength: finalEventDetailData.tourDates.length,
    },
    null,
    2,
  ),
);
