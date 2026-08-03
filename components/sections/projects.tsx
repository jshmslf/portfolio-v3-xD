import { siteConfig } from "@/lib/site-config";
import { ProjectCard } from "@/components/sections/project-card";
import { SectionHeader } from "@/components/ui/section-header";

export function Projects() {
  const featured = siteConfig.projects.filter((project) => project.featured);

  return (
    <section id="projects">
      <SectionHeader
        title="Projects"
        viewAllHref="/projects"
        viewAllLabel="View all projects"
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
