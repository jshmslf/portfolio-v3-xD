"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faBriefcase,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import type { ExperienceItem } from "@/lib/experience";
import { getSocialIcon } from "@/lib/icons";
import { MapPlaceholder } from "@/components/layout/map-placeholder";
import { HireMeButton } from "@/components/layout/hire-me-button";
import { StatusDot } from "@/components/ui/status-dot";
import { Reveal } from "@/components/ui/reveal";
import { HERO_STAGE_ID } from "@/components/sections/hero-stage";
import type { SocialLink } from "@/lib/social-links";

// Fallback for pages without the intro hero.
const SCROLL_REVEAL_THRESHOLD = 400;

// The compact card stands in for the hero's profile once the hero is gone.
function isPastHero() {
  const hero = document.getElementById(HERO_STAGE_ID);
  return hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY > SCROLL_REVEAL_THRESHOLD;
}

export function Sidebar({
  socialLinks = [],
  projectCount = 0,
  avatarUrl,
  name,
  address,
  currentRole,
}: {
  socialLinks?: SocialLink[];
  projectCount?: number;
  avatarUrl: string;
  name: string;
  address: string;
  currentRole?: ExperienceItem;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(isPastHero());
        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Desktop only: below lg the page is one column, and visitors should reach
    // the content right after the hero. Socials and contact live in Contact.
    <aside className="hidden lg:sticky lg:top-6 lg:block lg:self-start" aria-label="Profile summary">
      <Reveal className="flex flex-col gap-4">
        <div
          className={`hidden items-center gap-3 overflow-hidden lg:flex border border-border bg-surface transition-all duration-300 ${
            scrolled ? "max-h-20 p-3 opacity-100" : "max-h-0 p-0 opacity-0 border-none"
          }`}
          style={{ borderRadius: "var(--radius)" }}
          aria-hidden={!scrolled}
        >
          <Image
            src={avatarUrl}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 border border-border object-cover"
            style={{ borderRadius: "var(--radius)" }}
          />
          <div className="min-w-0">
            <p className="truncate font-medium">{name}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <StatusDot />
              Open to work
            </p>
          </div>
        </div>

        <div
          className="border border-border bg-surface p-6"
          style={{ borderRadius: "var(--radius)" }}
        >
          {currentRole && (
            <div className="mb-4 flex items-start gap-3">
              <FontAwesomeIcon icon={faBriefcase} className="mt-1 text-accent" />
              <div>
                <p className="font-medium">{currentRole.role}</p>
                <p className="text-sm text-muted">
                  {currentRole.org}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faFolder} className="text-accent" />
            <p className="text-sm text-muted">
              {projectCount} projects
            </p>
          </div>

          <div className="mt-6 flex gap-4 border-t border-border pt-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer me"
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
            <p className="text-xs font-medium">{address}</p>
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
          <HireMeButton className="mt-4 w-full px-4 py-2 text-sm" />
        </div>
      </Reveal>
    </aside>
  );
}
