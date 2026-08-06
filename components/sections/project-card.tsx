"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import type { TechStackItem } from "@/lib/tech-stack";
import { getDeviconClassName, isIconUrl } from "@/lib/devicon";
import { ProjectModal } from "@/components/sections/project-modal";

const DESCRIPTION_LENGTH = 120;
const MAX_TECH_ICONS = 3;

function excerpt(text: string): string {
  return text.length > DESCRIPTION_LENGTH ? `${text.slice(0, DESCRIPTION_LENGTH).trimEnd()}...` : text;
}

function TechIcon({ tech }: { tech: TechStackItem }) {
  return isIconUrl(tech.iconSlug) ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={tech.iconSlug} alt={tech.name} title={tech.name} className="h-4 w-4" />
  ) : (
    <i
      className={getDeviconClassName(tech.iconSlug)}
      title={tech.name}
      style={{ fontSize: "1rem" }}
    />
  );
}

export function ProjectCard({
  project,
  techStack,
}: {
  project: Project;
  techStack: TechStackItem[];
}) {
  const [open, setOpen] = useState(false);
  const visibleTech = techStack.slice(0, MAX_TECH_ICONS);
  const remaining = techStack.length - MAX_TECH_ICONS;
  const canGoLive = project.isLive && project.liveUrl;

  return (
    <>
      <div
        className="group flex flex-col overflow-hidden border border-border transition-colors hover:border-accent"
        style={{ borderRadius: "var(--radius)" }}
      >
        <button type="button" onClick={() => setOpen(true)} className="flex flex-col text-left">
          {project.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="h-40 w-full object-cover"
            />
          ) : (
            <div className="h-40 w-full bg-surface" />
          )}
          <div className="p-5 pb-0">
            <h3 className="font-semibold group-hover:text-accent">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {excerpt(project.shortDescription)}
            </p>
            {techStack.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                {visibleTech.map((tech) => (
                  <TechIcon key={tech.id} tech={tech} />
                ))}
                {remaining > 0 && <span className="text-xs text-muted">+{remaining} more</span>}
              </div>
            )}
          </div>
        </button>
        <div className="p-5 pt-4">
          {canGoLive ? (
            <a
              href={project.liveUrl!}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block border border-accent bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90"
              style={{ borderRadius: "var(--radius)" }}
            >
              View live
            </a>
          ) : (
            <button
              type="button"
              disabled
              onClick={(e) => e.stopPropagation()}
              className="cursor-not-allowed border border-border px-3 py-1.5 text-xs font-medium text-muted opacity-60"
              style={{ borderRadius: "var(--radius)" }}
            >
              Not live
            </button>
          )}
        </div>
      </div>

      {open && (
        <ProjectModal project={project} techStack={techStack} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
