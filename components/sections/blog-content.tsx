import type { BlogBlock, BlogImageSize } from "@/lib/blog";

const IMAGE_SIZE_CLASS: Record<BlogImageSize, string> = {
  small: "w-60 max-w-full",
  medium: "w-[480px] max-w-full",
  large: "w-[720px] max-w-full",
  full: "w-full",
};

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="leading-relaxed text-foreground/80 [&_a]:text-accent [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: block.html ?? "" }}
              />
            );
          case "heading": {
            const Heading = block.level === 2 ? "h2" : "h3";
            return (
              <Heading
                key={index}
                className={
                  block.level === 2
                    ? "text-2xl font-semibold tracking-tight"
                    : "text-xl font-semibold tracking-tight"
                }
              >
                {block.text}
              </Heading>
            );
          }
          case "list": {
            const ListTag = block.style === "numbered" ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={
                  block.style === "numbered"
                    ? "list-decimal space-y-2 pl-6 text-foreground/80"
                    : "list-disc space-y-2 pl-6 text-foreground/80"
                }
              >
                {(block.items ?? []).map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`[&_a]:text-accent [&_a]:underline ${item.indent === 1 ? "ml-6" : ""}`}
                    dangerouslySetInnerHTML={{ __html: item.html ?? "" }}
                  />
                ))}
              </ListTag>
            );
          }
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-accent pl-4 italic text-foreground/80 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: block.html ?? "" }}
              />
            );
          case "image":
            if (!block.url) return null;
            return (
              // Arbitrary https URL from the CMS (not always Cloudinary), so
              // next/image's remotePatterns allowlist can't cover it.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={block.url}
                alt={block.alt ?? ""}
                loading="lazy"
                className={`h-auto ${IMAGE_SIZE_CLASS[block.size ?? "full"] ?? IMAGE_SIZE_CLASS.full}`}
                style={{ borderRadius: "var(--radius)" }}
              />
            );
        }
      })}
    </div>
  );
}
