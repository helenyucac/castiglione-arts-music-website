import type { EventRichContentBlock, EventRichTextSpan } from "@/data/eventDetails";

type EventRichContentProps = {
  blocks: EventRichContentBlock[];
};

type EventHeadingBlock = {
  type: "heading";
  level?: number;
  children: EventRichTextSpan[];
};

type EventParagraphBlock = {
  type: "paragraph";
  level?: number;
  children: EventRichTextSpan[];
};

type EventTextBlock = EventHeadingBlock | EventParagraphBlock;

const richContentClass =
  "w-full max-w-[1200px] text-[17px] font-normal leading-[27.625px] text-[rgba(17,17,17,0.8)] antialiased";

const orchestraCityLabels = new Set([
  "SYDNEY",
  "MELBOURNE",
  "BRISBANE",
  "PERTH",
  "ADELAIDE",
  "CANBERRA",
]);

function getSpanText(spans: EventRichTextSpan[]) {
  return spans.map((span) => span.text).join("").trim();
}

function getNormalizedBlockText(block: EventRichContentBlock) {
  if (block.type !== "heading" && block.type !== "paragraph") {
    return "";
  }

  return getSpanText(block.children).toUpperCase();
}

function isTextBlock(block: EventRichContentBlock): block is EventTextBlock {
  return block.type === "heading" || block.type === "paragraph";
}

function isOrchestraHeadingBlock(block: EventRichContentBlock) {
  return (
    isTextBlock(block) &&
    getNormalizedBlockText(block) === "MEET THE ORCHESTRA"
  );
}

function isOrchestraCityBlock(block: EventRichContentBlock) {
  return isTextBlock(block) && orchestraCityLabels.has(getNormalizedBlockText(block));
}

function RichTextSpans({ spans }: { spans: EventRichTextSpan[] }) {
  return (
    <>
      {spans.map((span, index) => {
        const content = span.text.split("\n").map((line, lineIndex) => (
          <span key={`${index}-${lineIndex}`}>
            {lineIndex > 0 ? <br /> : null}
            {line}
          </span>
        ));
        const decorated = (
          <>
            {span.bold ? <strong className="font-semibold">{content}</strong> : content}
          </>
        );
        const italicized = span.italic ? <em className="italic">{decorated}</em> : decorated;
        const underlined = span.underline ? (
          <span className="underline underline-offset-4">{italicized}</span>
        ) : (
          italicized
        );

        return span.href ? (
          <a
            key={`${span.text}-${index}`}
            href={span.href}
            className="underline underline-offset-4"
            target={span.href.startsWith("/") ? undefined : "_blank"}
            rel={span.href.startsWith("/") ? undefined : "noopener noreferrer"}
          >
            {underlined}
          </a>
        ) : (
          <span key={`${span.text}-${index}`}>{underlined}</span>
        );
      })}
    </>
  );
}

function EventRichContentBlockRenderer({
  block,
  index,
}: {
  block: EventRichContentBlock;
  index: number;
}) {
  if (block.type === "heading") {
    const HeadingTag = `h${Math.min(Math.max(block.level ?? 2, 2), 4)}` as "h2" | "h3" | "h4";
    return (
      <HeadingTag
        key={`heading-${index}`}
        className="mb-4 mt-8 font-semibold first:mt-0"
      >
        <RichTextSpans spans={block.children} />
      </HeadingTag>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={`quote-${index}`}
        className="mb-6 border-l border-[rgba(217,74,40,0.5)] pl-5 italic last:mb-0"
      >
        <RichTextSpans spans={block.children} />
      </blockquote>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p key={`paragraph-${index}`} className="mb-6 last:mb-0">
        <RichTextSpans spans={block.children} />
      </p>
    );
  }

  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul";

    return (
      <ListTag
        key={`list-${index}`}
        className={`mb-6 pl-6 last:mb-0 ${block.ordered ? "list-decimal" : "list-disc"}`}
      >
        {block.items.map((item, itemIndex) => (
          <li key={`item-${index}-${itemIndex}`} className="mb-2 last:mb-0">
            <RichTextSpans spans={item} />
          </li>
        ))}
      </ListTag>
    );
  }

  if (block.type === "image") {
    return (
      <figure key={`image-${index}`} className="my-8 first:mt-0 last:mb-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={block.src}
          alt={block.alt ?? block.caption ?? ""}
          width={block.width}
          height={block.height}
          className="block h-auto w-full max-w-full"
          loading="lazy"
        />
        {block.caption ? (
          <figcaption className="mt-3 text-[13px] leading-[21px] text-[rgba(17,17,17,0.58)]">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === "video") {
    return (
      <figure key={`video-${index}`} className="my-8 first:mt-0 last:mb-0">
        <video
          controls
          playsInline
          preload="metadata"
          poster={block.poster}
          className="aspect-video w-full max-w-full bg-black"
        >
          <source src={block.src} />
        </video>
        {block.caption ? (
          <figcaption className="mt-3 text-[13px] leading-[21px] text-[rgba(17,17,17,0.58)]">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return <hr key={`divider-${index}`} className="my-8 border-[rgba(17,17,17,0.12)]" />;
}

function OrchestraGrid({
  heading,
  groups,
  index,
}: {
  heading: EventTextBlock;
  groups: OrchestraGroup[];
  index: number;
}) {
  const HeadingTag =
    heading.type === "heading"
      ? (`h${Math.min(Math.max(heading.level ?? 2, 2), 4)}` as "h2" | "h3" | "h4")
      : "h2";

  return (
    <div key={`orchestra-${index}`} className="mb-6 last:mb-0">
      <HeadingTag className="mb-6 mt-8 font-semibold first:mt-0">
        <RichTextSpans spans={heading.children} />
      </HeadingTag>
      {groups.map((group, groupIndex) => (
        <div
          key={`orchestra-group-${index}-${group.label ?? groupIndex}`}
          className="mt-8 first:mt-0"
        >
          {group.label ? (
            <h3 className="mb-4 text-[13px] font-semibold uppercase leading-[18px] tracking-[2.2px] text-[rgba(17,17,17,0.52)]">
              {group.label}
            </h3>
          ) : null}
          <div className="orchestra-grid grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {group.entries.map((entry, entryIndex) => (
              <div
                className="orchestra-entry"
                key={`orchestra-entry-${index}-${groupIndex}-${entryIndex}`}
              >
                <p className="mb-1 font-semibold text-[rgba(17,17,17,0.88)]">
                  <RichTextSpans spans={entry.role.children} />
                </p>
                {entry.name ? (
                  <p className="text-[rgba(17,17,17,0.72)]">
                    <RichTextSpans spans={entry.name.children} />
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

type OrchestraEntry = {
  role: EventParagraphBlock;
  name?: EventParagraphBlock;
};

type OrchestraGroup = {
  label?: string;
  entries: OrchestraEntry[];
};

function parseOrchestraGroups(blocks: EventTextBlock[]) {
  const groups: OrchestraGroup[] = [];
  let currentGroup: OrchestraGroup = { entries: [] };

  const ensureCurrentGroup = () => {
    if (!groups.includes(currentGroup)) {
      groups.push(currentGroup);
    }
  };

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (isOrchestraCityBlock(block)) {
      currentGroup = { label: getNormalizedBlockText(block), entries: [] };
      groups.push(currentGroup);
      continue;
    }

    if (block.type !== "paragraph") {
      continue;
    }

    const nextBlock = blocks[index + 1];
    let name: EventParagraphBlock | undefined;

    if (nextBlock?.type === "paragraph" && !isOrchestraCityBlock(nextBlock)) {
      name = nextBlock;
    }

    ensureCurrentGroup();
    currentGroup.entries.push({ role: block, name });

    if (name) {
      index += 1;
    }
  }

  return groups.filter((group) => group.entries.length > 0);
}

export function EventRichContent({ blocks }: EventRichContentProps) {
  const renderedBlocks = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (isTextBlock(block) && isOrchestraHeadingBlock(block)) {
      const sectionBlocks: EventTextBlock[] = [];
      let nextIndex = index + 1;

      while (nextIndex < blocks.length) {
        const nextBlock = blocks[nextIndex];

        if (
          nextBlock &&
          isTextBlock(nextBlock) &&
          (nextBlock.type === "paragraph" || isOrchestraCityBlock(nextBlock))
        ) {
          sectionBlocks.push(nextBlock);
          nextIndex += 1;
          continue;
        }

        break;
      }

      const groups = parseOrchestraGroups(sectionBlocks);
      const entryCount = groups.reduce((total, group) => total + group.entries.length, 0);

      if (entryCount >= 2) {
        renderedBlocks.push(
          <OrchestraGrid
            key={`orchestra-grid-${index}`}
            heading={block}
            groups={groups}
            index={index}
          />,
        );
        index = nextIndex - 1;
        continue;
      }

      if (sectionBlocks.length > 0) {
        renderedBlocks.push(
          <EventRichContentBlockRenderer key={`rich-content-block-${index}`} block={block} index={index} />,
        );

        for (let sectionIndex = 0; sectionIndex < sectionBlocks.length; sectionIndex += 1) {
          renderedBlocks.push(
            <EventRichContentBlockRenderer
              key={`rich-content-block-${index}-${sectionIndex}`}
              block={sectionBlocks[sectionIndex]}
              index={index + sectionIndex + 1}
            />,
          );
        }

        index = nextIndex - 1;
        continue;
      }
    }

    renderedBlocks.push(
      <EventRichContentBlockRenderer key={`rich-content-block-${index}`} block={block} index={index} />,
    );
  }

  return (
    <div className={richContentClass}>
      {renderedBlocks}
    </div>
  );
}
