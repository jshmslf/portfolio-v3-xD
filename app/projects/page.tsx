import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { getProjects } from "@/lib/projects";
import { getTechStack } from "@/lib/tech-stack";
import { getSiteProfile } from "@/lib/site-profile";
import { pageMetadata } from "@/lib/seo/site";

export async function generateMetadata() {
  const profile = await getSiteProfile();
  return pageMetadata({
    title: "Projects",
    description: `Web apps, mobile apps, and tools built by ${profile.name}, a software engineer from Pangasinan, Philippines, with the tech stack behind each one.`,
    path: "/projects",
  });
}

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, techStack] = await Promise.all([getProjects(), getTechStack()]);
  const techById = new Map(techStack.map((tech) => [tech.id, tech]));

  return (
    <main className="flex-1 pt-20 pb-24">
      <Container>
        <PageHeader
          title="Projects"
          description="A collection of things I've designed and built, from client work to side projects. Open any card for the full write-up."
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              techStack={project.techStackIds.map((id) => techById.get(id)).filter(Boolean) as typeof techStack}
            />
          ))}
        </div>
        {projects.length === 0 && <p className="mt-10 text-sm text-muted">No projects yet.</p>}
      </Container>
    </main>
  );
}
