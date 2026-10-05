"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import type { Project } from "@/lib/projects";
import type { TechStackItem } from "@/lib/tech-stack";
import { BlogContent } from "@/components/sections/blog-content";
import { TechIcon } from "@/components/sections/tech-icon";
import { Modal } from "@/components/ui/modal";

export function ProjectModal({
  project,
  techStack,
  onClose,
}: {
  project: Project;
  techStack: TechStackItem[];
  onClose: () => void;
}) {
  const canGoLive = project.isLive && project.liveUrl;
  const titleId = `project-${project.id}`;

  return (
    <Modal onClose={onClose} labelledBy={titleId} size="lg">
      <h2 id={titleId} className="pr-8 text-xl font-semibold">
        {project.title}
      </h2>

      {project.thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.thumbnailUrl}
          alt={`${project.title} screenshot`}
          width={1280}
          height={720}
          decoding="async"
          className="mt-4 aspect-video w-full border border-border object-cover"
          style={{ borderRadius: "var(--radius)" }}
        />
      ) : (
        <div
          className="mt-4 flex aspect-video w-full flex-col items-center justify-center gap-2 border border-border bg-background text-muted"
          style={{ borderRadius: "var(--radius)" }}
        >
          <FontAwesomeIcon icon={faImage} className="text-2xl" />
          <span className="text-xs">No preview</span>
        </div>
      )}

      <p className="mt-4 leading-relaxed text-foreground/80">{project.shortDescription}</p>

      {techStack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
          {techStack.map((tech) => (
            <li
              key={tech.id}
              className="flex items-center gap-1.5 border border-border px-2 py-1 text-xs text-muted"
              style={{ borderRadius: "var(--radius)" }}
            >
              <TechIcon tech={tech} size="0.875rem" />
              {tech.name}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5">
        {canGoLive ? (
          <a
            href={project.liveUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            style={{ borderRadius: "var(--radius)" }}
          >
            View live
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
          </a>
        ) : (
          <span
            className="inline-block border border-border px-4 py-2 text-sm font-medium text-muted"
            style={{ borderRadius: "var(--radius)" }}
          >
            Not live
          </span>
        )}
      </div>

      {project.content?.length > 0 && (
        <div className="mt-6 border-t border-border pt-6">
          <BlogContent blocks={project.content} />
        </div>
      )}
    </Modal>
  );
}
