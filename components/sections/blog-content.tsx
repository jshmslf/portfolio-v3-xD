import type { BlogBlock } from "@/lib/blog";

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
        }
      })}
    </div>
  );
}
