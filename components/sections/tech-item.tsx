import type { TechStackItem } from "@/lib/tech-stack";
import { TechIcon } from "@/components/sections/tech-icon";

export function TechItem({ tech }: { tech: TechStackItem }) {
  return (
    <div
      className="flex items-center gap-3 border border-border p-3 transition-colors hover:border-accent hover:bg-surface"
      style={{ borderRadius: "var(--radius)" }}
    >
      <TechIcon tech={tech} size="1.5rem" />
      <span className="text-sm text-foreground/80">{tech.name}</span>
    </div>
  );
}
