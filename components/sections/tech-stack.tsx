import { getTechStack } from "@/lib/tech-stack";
import { SectionHeader } from "@/components/ui/section-header";
import { TechItem } from "@/components/sections/tech-item";

export async function TechStack() {
  const items = await getTechStack();
  const featured = items.filter((item) => item.featured);

  return (
    <section id="tech-stack">
      <SectionHeader
        title="Tech Stack"
        viewAllHref={items.length > 3 ? "/tech-stack" : undefined}
        viewAllLabel="View all tech stack"
      />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {featured.map((tech) => (
          <TechItem key={tech.id} tech={tech} />
        ))}
      </div>
    </section>
  );
}
