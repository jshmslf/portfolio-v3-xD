"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import type { Company } from "@/lib/companies";

const CELLS = 3;
const ROTATE_EVERY_MS = 3000;

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Three logo cells at every screen size. With more than three companies, one
 * cell at a time swaps to a company that isn't already showing, so no logo
 * ever appears twice. The first three in CMS order show first, which also
 * keeps the server HTML and hydration identical.
 */
export function Companies({ companies }: { companies: Company[] }) {
  const [slots, setSlots] = useState(() =>
    Array.from({ length: Math.min(CELLS, companies.length) }, (_, i) => i),
  );
  const slotsRef = useRef(slots);
  const paused = useRef(false);
  const lastCell = useRef(-1);

  useEffect(() => {
    if (companies.length <= CELLS) return;
    const timer = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      const current = slotsRef.current;
      // Never the cell that just changed, and only companies not on screen.
      const cell = randomItem(current.map((_, i) => i).filter((i) => i !== lastCell.current));
      const offScreen = companies.map((_, i) => i).filter((i) => !current.includes(i));
      const next = [...current];
      next[cell] = randomItem(offScreen);
      lastCell.current = cell;
      slotsRef.current = next;
      setSlots(next);
    }, ROTATE_EVERY_MS);
    return () => window.clearInterval(timer);
  }, [companies]);

  if (companies.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Companies I've worked with" />

      {/* Screen readers and crawlers get the full, stable list; the rotating
          grid below is visual only. */}
      <ul className="sr-only">
        {companies.map((company) => (
          <li key={company.name}>
            {company.websiteUrl ? (
              <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer">
                {company.name}
              </a>
            ) : (
              company.name
            )}
          </li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="mt-6 grid grid-cols-3 gap-6 sm:gap-10"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        {slots.map((active, cell) => {
          const company = companies[active];
          return (
            <div
              key={cell}
              title={company.name}
              className="relative aspect-[5/2] opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            >
              {/* Every logo is stacked in every cell and only the active one is
                  opaque, so a swap is a crossfade between already-loaded images. */}
              {companies.map((c, index) => (
                <Image
                  key={c.logoUrl + index}
                  src={c.logoUrl}
                  alt={index === active ? c.alt : ""}
                  fill
                  sizes="(min-width: 1024px) 220px, 33vw"
                  className={`object-contain transition-opacity duration-700 ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              {/* An overlay link (not a wrapper) so the cell never remounts
                  when it swaps between companies with and without a site. */}
              {company.websiteUrl && (
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  className="absolute inset-0"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
