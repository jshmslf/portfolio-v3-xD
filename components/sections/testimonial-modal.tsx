"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { displayName, type Testimonial } from "@/lib/testimonials";
import { Modal } from "@/components/ui/modal";

export function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) {
  const titleId = `testimonial-${testimonial.id}`;

  return (
    <Modal onClose={onClose} labelledBy={titleId}>
      <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`} role="img">
        {[1, 2, 3, 4, 5].map((value) => (
          <FontAwesomeIcon
            key={value}
            icon={faStar}
            className={value <= testimonial.rating ? "text-accent" : "text-border"}
          />
        ))}
      </div>

      <blockquote className="mt-4 leading-relaxed text-foreground/80">
        &ldquo;{testimonial.message}&rdquo;
      </blockquote>
      <p id={titleId} className="mt-4 font-semibold">
        {displayName(testimonial)}
      </p>
      {(testimonial.position || testimonial.company) && (
        <p className="text-sm font-semibold text-muted">
          {[testimonial.position, testimonial.company].filter(Boolean).join(", ")}
        </p>
      )}
    </Modal>
  );
}
