import type { Project } from "@/lib/site-config";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group border border-border p-5 transition-colors hover:border-accent"
      style={{ borderRadius: "var(--radius)" }}
    >
      <h3 className="font-semibold group-hover:text-accent">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="border border-border px-2 py-0.5 text-xs text-muted"
            style={{ borderRadius: "var(--radius)" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
