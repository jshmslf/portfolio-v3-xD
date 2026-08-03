import Image from "next/image";
import type { TechStackItem } from "@/lib/site-config";

export function TechItem({ tech }: { tech: TechStackItem }) {
  return (
    <div
      className="flex items-center gap-3 border border-border p-3"
      style={{ borderRadius: "var(--radius)" }}
    >
      <Image
        src={`/icons/devicon/${tech.icon}.svg`}
        alt={tech.name}
        width={20}
        height={20}
        className="h-6 w-6 shrink-0"
        unoptimized
      />
      <span className="text-sm text-foreground/80">{tech.name}</span>
    </div>
  );
}
