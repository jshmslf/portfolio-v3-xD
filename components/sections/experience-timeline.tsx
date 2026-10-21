"use client";

import { useEffect, useRef } from "react";
import type { ExperienceItem } from "@/lib/experience";

// One step per entry: its content fades in and the dashed line draws down
// to the next dot, which appears as the line arrives. Matches the
// .timeline-segment transition (150ms delay + 550ms draw) in globals.css.
const STEP_MS = 700;

/**
 * Entries reveal strictly in order, each once it has scrolled into view and
 * the previous step has finished: a single cascade when the whole timeline
 * fits on screen, one entry at a time while scrolling on phones. Like
 * <Reveal>, nothing is hidden until hydration, and a timeline that is
 * already on screen (or reduced motion) simply stays visible.
 */
export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (list.getBoundingClientRect().top < window.innerHeight) return;

    const rows = Array.from(list.children) as HTMLElement[];
    const seen = rows.map(() => false);
    let shown = 0;
    let timer: number | undefined;

    function advance() {
      if (timer !== undefined || shown >= rows.length || !seen[shown]) return;
      rows[shown].dataset.shown = "";
      shown += 1;
      timer = window.setTimeout(() => {
        timer = undefined;
        advance();
      }, STEP_MS);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          seen[rows.indexOf(entry.target as HTMLElement)] = true;
          observer.unobserve(entry.target);
        }
        advance();
      },
      { rootMargin: "0px 0px -15% 0px" }
    );

    list.dataset.timeline = "ready";
    rows.forEach((row) => observer.observe(row));
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <ol ref={listRef} className="timeline mt-6 space-y-8">
      {items.map((item, index) => (
        <li key={`${index}-${item.org}`} className="relative pl-8">
          {/* Dashed line from this dot's centre to the next one's: the item's
              height plus the 2rem gap. The last entry ends the line. */}
          {index < items.length - 1 && (
            <span
              aria-hidden="true"
              className="timeline-segment absolute left-[5.5px] top-2.5 h-[calc(100%+2rem)] w-px"
            />
          )}
          {/* Drawn over the line, so the line runs straight through it. */}
          <span aria-hidden="true" className="timeline-dot absolute left-0 top-1 z-10 flex size-3">
            {index === 0 && (
              <span
                className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-60"
                style={{ borderRadius: "var(--radius)" }}
              />
            )}
            <span
              className={`relative inline-flex size-3 ${index === 0 ? "bg-accent" : "timeline-dot-past"}`}
              style={{ borderRadius: "var(--radius)" }}
            />
          </span>
          <div className="timeline-body">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {item.period}
            </p>
            <h3 className="mt-1 text-base font-semibold">
              {item.role}
              {/* nbsp keeps the dot with the role, so a wrapped line never starts with "·". */}
              <span className="font-normal text-muted">&nbsp;&middot; {item.org}</span>
            </h3>
            <p className="mt-2 leading-relaxed text-foreground/80">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
