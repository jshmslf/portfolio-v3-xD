"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faArrowUpRightFromSquare, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Project } from "@/lib/projects";
import type { TechStackItem } from "@/lib/tech-stack";
import { ProjectModal } from "@/components/sections/project-modal";
import { TechIcon } from "@/components/sections/tech-icon";

const DESCRIPTION_LENGTH = 120;
const MAX_TECH_CHIPS = 3;

function excerpt(text: string): string {
  return text.length > DESCRIPTION_LENGTH ? `${text.slice(0, DESCRIPTION_LENGTH).trimEnd()}...` : text;
}

export function ProjectCard({
  project,
  techStack,
}: {
  project: Project;
  techStack: TechStackItem[];
}) {
  const [open, setOpen] = useState(false);
  const visibleTech = techStack.slice(0, MAX_TECH_CHIPS);
  const remaining = techStack.length - MAX_TECH_CHIPS;
  const canGoLive = project.isLive && project.liveUrl;

  return (
    <>
      <article
        className="group flex h-full flex-col overflow-hidden border border-border bg-surface/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-xl hover:shadow-accent/5"
        style={{ borderRadius: "var(--radius)" }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="flex flex-1 flex-col text-left"
        >
          <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-surface">
            {project.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnailUrl}
                alt={`${project.title} screenshot`}
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
                <FontAwesomeIcon icon={faImage} className="text-2xl" />
                <span className="text-xs">No preview</span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5 pb-0">
            <h3 className="font-semibold transition-colors group-hover:text-accent-text">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {excerpt(project.shortDescription)}
            </p>
            {techStack.length > 0 && (
              <ul className="mt-4 flex flex-wrap items-center gap-1.5" aria-label="Built with">
                {visibleTech.map((tech) => (
                  <li
                    key={tech.id}
                    className="flex items-center gap-1.5 border border-border bg-background px-2 py-0.5 text-xs text-muted"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    <TechIcon tech={tech} size="0.75rem" />
                    {tech.name}
                  </li>
                ))}
                {remaining > 0 && <li className="text-xs text-muted">+{remaining} more</li>}
              </ul>
            )}
          </div>
        </button>
        <div className="flex items-center justify-between gap-3 p-5 pt-4">
          {canGoLive ? (
            <a
              href={project.liveUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-accent bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90"
              style={{ borderRadius: "var(--radius)" }}
            >
              View live
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[0.625rem]" />
              <span className="sr-only">(opens {project.title} in a new tab)</span>
            </a>
          ) : (
            <span
              className="border border-border px-3 py-1.5 text-xs font-medium text-muted"
              style={{ borderRadius: "var(--radius)" }}
            >
              Not live
            </span>
          )}
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors group-hover:text-accent-text"
          >
            Details
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[0.625rem] transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </article>

      {open && (
        <ProjectModal project={project} techStack={techStack} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
