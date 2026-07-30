import assert from "node:assert/strict";

import {
  getRichContentBlocks,
  getRichContentField,
  hasVisibleRichContent,
  normalizeRichEventDescription,
} from "../lib/wix/richContent.ts";

const mockWixRichContent = {
  nodes: [
    {
      type: "HEADING",
      headingData: { level: 2 },
      nodes: [
        {
          type: "TEXT",
          textData: {
            text: "A cinematic concert experience",
            decorations: [{ type: "BOLD" }],
          },
        },
      ],
    },
    {
      type: "PARAGRAPH",
      nodes: [
        {
          type: "TEXT",
          textData: {
            text: "Featuring ",
            decorations: [],
          },
        },
        {
          type: "TEXT",
          textData: {
            text: "orchestral",
            decorations: [{ type: "ITALIC" }, { type: "UNDERLINE" }],
          },
        },
        {
          type: "TEXT",
          textData: {
            text: " arrangements.",
            decorations: [
              {
                type: "LINK",
                linkData: {
                  link: {
                    url: "https://example.com/event",
                  },
                },
              },
            ],
          },
        },
      ],
    },
    {
      type: "BULLETED_LIST",
      nodes: [
        {
          type: "LIST_ITEM",
          nodes: [{ type: "PARAGRAPH", nodes: [{ type: "TEXT", textData: { text: "Live orchestra" } }] }],
        },
        {
          type: "LIST_ITEM",
          nodes: [{ type: "PARAGRAPH", nodes: [{ type: "TEXT", textData: { text: "Original visuals" } }] }],
        },
      ],
    },
    {
      type: "ORDERED_LIST",
      nodes: [
        {
          type: "LIST_ITEM",
          nodes: [{ type: "PARAGRAPH", nodes: [{ type: "TEXT", textData: { text: "Act one" } }] }],
        },
      ],
    },
    {
      type: "BLOCKQUOTE",
      nodes: [{ type: "TEXT", textData: { text: "A quote from the production." } }],
    },
    {
      type: "HORIZONTAL_RULE",
    },
    {
      type: "IMAGE",
      imageData: {
        image: "wix:image://v1/mock-rich-image.jpg/file.jpg#originWidth=1920&originHeight=1080",
        altText: "Concert rehearsal",
        caption: {
          nodes: [{ type: "TEXT", textData: { text: "Rehearsal image caption" } }],
        },
      },
    },
    {
      type: "VIDEO",
      videoData: {
        video: "wix:video://v1/mock-rich-video/1080p/mp4/file.mp4",
        caption: {
          nodes: [{ type: "TEXT", textData: { text: "Production video caption" } }],
        },
      },
    },
  ],
};

const fieldsWithRichContent = {
  EventDescription: mockWixRichContent,
  description: "<p>Legacy description should not be duplicated.</p>",
};
const fieldsWithLowercaseKey = {
  eventDescription: JSON.stringify(mockWixRichContent),
};
const fieldsWithoutRichContent = {
  description: "<p>Legacy description stays in the existing renderer.</p>",
};
const malformedFields = {
  EventDescription: { nodes: [{ type: "UNSUPPORTED_NODE", data: { value: "hidden" } }] },
  description: "<p>Legacy fallback should be used.</p>",
};

assert.equal(getRichContentField(fieldsWithRichContent), mockWixRichContent);
assert.deepEqual(
  getRichContentBlocks(getRichContentField(fieldsWithRichContent)),
  normalizeRichEventDescription(fieldsWithRichContent),
);
assert.equal(normalizeRichEventDescription(fieldsWithRichContent)?.[0]?.type, "heading");
assert.equal(normalizeRichEventDescription(fieldsWithRichContent)?.some((block) => block.type === "image"), true);
assert.equal(normalizeRichEventDescription(fieldsWithRichContent)?.some((block) => block.type === "video"), true);
assert.equal(normalizeRichEventDescription(fieldsWithRichContent)?.some((block) => block.type === "list"), true);
assert.equal(normalizeRichEventDescription(fieldsWithLowercaseKey)?.length, 8);
assert.equal(normalizeRichEventDescription(fieldsWithoutRichContent), undefined);
assert.equal(normalizeRichEventDescription(malformedFields), undefined);
assert.equal(hasVisibleRichContent(normalizeRichEventDescription(fieldsWithRichContent)), true);

const imageBlock = normalizeRichEventDescription(fieldsWithRichContent)?.find((block) => block.type === "image");
const videoBlock = normalizeRichEventDescription(fieldsWithRichContent)?.find((block) => block.type === "video");
assert.equal(imageBlock?.src, "https://static.wixstatic.com/media/mock-rich-image.jpg");
assert.equal(imageBlock?.alt, "Concert rehearsal");
assert.equal(imageBlock?.caption, "Rehearsal image caption");
assert.equal(videoBlock?.src, "https://video.wixstatic.com/video/mock-rich-video/1080p/mp4/file.mp4");

console.log(
  JSON.stringify(
    {
      ok: true,
      richFieldKeysSupported: ["EventDescription", "eventDescription", "richEventDescription", "eventRichDescription"],
      blocks: normalizeRichEventDescription(fieldsWithRichContent)?.map((block) => block.type),
      fallbackWhenMissing: normalizeRichEventDescription(fieldsWithoutRichContent) === undefined,
      fallbackWhenMalformed: normalizeRichEventDescription(malformedFields) === undefined,
      imageSrc: imageBlock?.src,
      imageCaption: imageBlock?.caption,
      videoSrc: videoBlock?.src,
    },
    null,
    2,
  ),
);
