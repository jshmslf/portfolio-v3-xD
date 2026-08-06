"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFolder,
  faBriefcase,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { profile } from "@/lib/profile";
import { experience } from "@/lib/experience";
import { getSocialIcon } from "@/lib/icons";
import { MapPlaceholder } from "@/components/layout/map-placeholder";
import { HireMeModal } from "@/components/layout/hire-me-modal";
import type { SocialLink } from "@/lib/social-links";

export function Sidebar({
  socialLinks = [],
  projectCount = 0,
}: {
  socialLinks?: SocialLink[];
  projectCount?: number;
}) {
  const currentRole = experience[0];
  const [hireMeOpen, setHireMeOpen] = useState(false);

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-col gap-4">
        <div
          className="border border-border bg-surface p-6"
          style={{ borderRadius: "var(--radius)" }}
        >
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faBriefcase} className="mt-1 text-accent" />
            <div>
              <p className="font-medium">{currentRole.role}</p>
              <p className="text-sm text-muted">
                {currentRole.org}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <FontAwesomeIcon icon={faFolder} className="text-accent" />
            <p className="text-sm text-muted">
              {projectCount} projects
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-accent" />
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-muted hover:text-accent"
            >
              {profile.email}
            </a>
          </div>

          <div className="mt-6 flex gap-4 border-t border-border pt-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted transition-colors hover:text-accent"
              >
                <FontAwesomeIcon icon={getSocialIcon(link.iconKey)} size="lg" />
              </a>
            ))}
          </div>
        </div>

        <div
          className="border border-border bg-surface p-4"
          style={{ borderRadius: "var(--radius)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Currently based in
          </p>
          <div className="mt-3 flex items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot} className="text-accent" />
            <p className="text-xs font-medium">{profile.address}</p>
          </div>
          <div className="mt-2">
            <MapPlaceholder />
          </div>
        </div>

        <div
          className="border border-border bg-surface p-6"
          style={{ borderRadius: "var(--radius)" }}
        >
          <p className="font-medium">Open to work</p>
          <p className="mt-1 text-sm text-muted">
            Have a role or project in mind? Let&apos;s talk.
          </p>
          <button
            type="button"
            onClick={() => setHireMeOpen(true)}
            className="mt-4 w-full border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            style={{ borderRadius: "var(--radius)" }}
          >
            Hire me
          </button>
        </div>
      </div>

      {hireMeOpen && (
        <HireMeModal onClose={() => setHireMeOpen(false)} />
      )}
    </aside>
  );
}
