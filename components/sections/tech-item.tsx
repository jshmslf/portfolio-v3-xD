import type { TechStackItem } from "@/lib/tech-stack";
import { getDeviconClassName, isIconUrl } from "@/lib/devicon";

export function TechItem({ tech }: { tech: TechStackItem }) {
  return (
    <div
      className="flex items-center gap-3 border border-border p-3"
      style={{ borderRadius: "var(--radius)" }}
    >
      {isIconUrl(tech.iconSlug) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tech.iconSlug} alt={tech.name} className="h-6 w-6 shrink-0" />
      ) : (
        <i className={getDeviconClassName(tech.iconSlug)} style={{ fontSize: "1.5rem" }} />
      )}
      <span className="text-sm text-foreground/80">{tech.name}</span>
    </div>
  );
}
