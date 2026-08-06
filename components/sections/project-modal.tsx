"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import type { Project } from "@/lib/projects";
import type { TechStackItem } from "@/lib/tech-stack";
import { getDeviconClassName, isIconUrl } from "@/lib/devicon";
import { BlogContent } from "@/components/sections/blog-content";

function TechIcon({ tech }: { tech: TechStackItem }) {
  return isIconUrl(tech.iconSlug) ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={tech.iconSlug} alt="" className="h-3.5 w-3.5" />
  ) : (
    <i className={getDeviconClassName(tech.iconSlug)} style={{ fontSize: "0.875rem" }} />
  );
}

export function ProjectModal({
  project,
  techStack,
  onClose,
}: {
  project: Project;
  techStack: TechStackItem[];
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const canGoLive = project.isLive && project.liveUrl;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-surface p-6 shadow-lg"
        style={{ borderRadius: "var(--radius)" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-muted hover:text-accent"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {project.thumbnailUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="mt-4 w-full object-cover"
            style={{ borderRadius: "var(--radius)" }}
          />
        )}

        {techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech.id}
                className="flex items-center gap-1.5 border border-border px-2 py-1 text-xs text-muted"
                style={{ borderRadius: "var(--radius)" }}
              >
                <TechIcon tech={tech} />
                {tech.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4">
          {canGoLive ? (
            <a
              href={project.liveUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              style={{ borderRadius: "var(--radius)" }}
            >
              View live
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed border border-border px-4 py-2 text-sm font-medium text-muted opacity-60"
              style={{ borderRadius: "var(--radius)" }}
            >
              Not live
            </button>
          )}
        </div>

        <div className="mt-6">
          <BlogContent blocks={project.content} />
        </div>
      </div>
    </div>
  );
}
