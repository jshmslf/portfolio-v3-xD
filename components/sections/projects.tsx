import { getProjects } from "@/lib/projects";
import { getTechStack } from "@/lib/tech-stack";
import { ProjectCard } from "@/components/sections/project-card";
import { SectionHeader } from "@/components/ui/section-header";

export async function Projects() {
  const [projects, techStack] = await Promise.all([getProjects(), getTechStack()]);
  const techById = new Map(techStack.map((tech) => [tech.id, tech]));
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects">
      <SectionHeader
        title="Projects"
        viewAllHref={projects.length > 3 ? "/projects" : undefined}
        viewAllLabel="View all projects"
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            techStack={project.techStackIds.map((id) => techById.get(id)).filter(Boolean) as typeof techStack}
          />
        ))}
      </div>
    </section>
  );
}
