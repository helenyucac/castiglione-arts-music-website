import type { EventRichContentBlock, EventRichTextSpan } from "@/data/eventDetails";

type EventRichContentProps = {
  blocks: EventRichContentBlock[];
};

const richContentClass =
  "w-full max-w-[1200px] text-[17px] font-normal leading-[27.625px] text-[rgba(17,17,17,0.8)] antialiased";

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

export function EventRichContent({ blocks }: EventRichContentProps) {
  return (
    <div className={richContentClass}>
      {blocks.map((block, index) => {
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
      })}
    </div>
  );
}
