"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { displayName, type Testimonial } from "@/lib/testimonials";

export function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md border border-border bg-surface p-6 shadow-lg"
        style={{ borderRadius: "var(--radius)" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <FontAwesomeIcon
                key={value}
                icon={faStar}
                className={value <= testimonial.rating ? "text-accent" : "text-border"}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted hover:text-accent"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <p className="mt-4 leading-relaxed text-foreground/80">
          &ldquo;{testimonial.message}&rdquo;
        </p>
        <p className="mt-4 font-semibold">{displayName(testimonial)}</p>
        {(testimonial.position || testimonial.company) && (
          <p className="text-sm font-semibold text-muted">
            {[testimonial.position, testimonial.company].filter(Boolean).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
