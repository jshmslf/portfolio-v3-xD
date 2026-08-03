import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/section-header";
import { TechItem } from "@/components/sections/tech-item";

const HOMEPAGE_LIMIT = 6;

export function TechStack() {
  const featured = siteConfig.techStack.slice(0, HOMEPAGE_LIMIT);

  return (
    <section id="tech-stack">
      <SectionHeader
        title="Tech Stack"
        viewAllHref="/tech-stack"
        viewAllLabel="View all tech stack"
      />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {featured.map((tech) => (
          <TechItem key={tech.name} tech={tech} />
        ))}
      </div>
    </section>
  );
}
