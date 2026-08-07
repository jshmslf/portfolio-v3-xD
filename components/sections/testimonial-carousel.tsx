"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { displayName, type Testimonial } from "@/lib/testimonials";
import { TestimonialModal } from "@/components/sections/testimonial-modal";

const ROTATE_MS = 6000;
const EXCERPT_LENGTH = 120;

function excerpt(message: string): string {
  return message.length > EXCERPT_LENGTH
    ? `${message.slice(0, EXCERPT_LENGTH).trimEnd()}...`
    : message;
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<Testimonial | null>(null);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, [paused, testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex h-full flex-1 flex-col items-center gap-4"
    >
      <button
        key={current.id}
        type="button"
        onClick={() => setExpanded(current)}
        className="flex w-full flex-1 flex-col items-center justify-center border border-border bg-surface p-4 text-center transition-colors hover:border-accent"
        style={{ borderRadius: "var(--radius)" }}
      >
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <FontAwesomeIcon
              key={value}
              icon={faStar}
              className={`text-sm ${value <= current.rating ? "text-accent" : "text-border"}`}
            />
          ))}
        </div>
        <p className="mt-3 text-sm text-foreground/80">&ldquo;{excerpt(current.message)}&rdquo;</p>
        <p className="mt-3 font-semibold">{displayName(current)}</p>
        {(current.position || current.company) && (
          <p className="text-xs font-semibold text-muted">
            {[current.position, current.company].filter(Boolean).join(", ")}
          </p>
        )}
      </button>

      {testimonials.length > 1 && (
        <div className="flex gap-2">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.id}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>
      )}

      {expanded && (
        <TestimonialModal testimonial={expanded} onClose={() => setExpanded(null)} />
      )}
    </div>
  );
}
