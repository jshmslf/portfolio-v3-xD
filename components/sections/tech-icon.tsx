import type { TechStackItem } from "@/lib/tech-stack";
import { getDeviconClassName, isIconUrl } from "@/lib/devicon";

// Decorative: always rendered next to the tech's visible name.
export function TechIcon({ tech, size = "1rem" }: { tech: TechStackItem; size?: string }) {
  return isIconUrl(tech.iconSlug) ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tech.iconSlug}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="shrink-0"
      style={{ width: size, height: size }}
    />
  ) : (
    <i
      className={`${getDeviconClassName(tech.iconSlug)} shrink-0`}
      aria-hidden="true"
      style={{ fontSize: size }}
    />
  );
}
