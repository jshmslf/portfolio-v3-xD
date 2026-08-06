"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { submitTestimonial } from "@/app/testimonial/[token]/actions";

export function TestimonialForm({ token }: { token: string }) {
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName || !message || rating === 0) {
      setError("Please fill in your name, a rating, and a message.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await submitTestimonial(token, { fullName, position, company, rating, message, anonymous });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-border p-6" style={{ borderRadius: "var(--radius)" }}>
        <p className="font-medium">Thank you!</p>
        <p className="mt-1 text-sm text-muted">Your testimonial has been submitted.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Full name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
          style={{ borderRadius: "var(--radius)" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Position</label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border border-border bg-background px-3 py-2 text-sm"
            style={{ borderRadius: "var(--radius)" }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border border-border bg-background px-3 py-2 text-sm"
            style={{ borderRadius: "var(--radius)" }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setRating(value)}
              className={value <= rating ? "text-accent" : "text-border"}
            >
              <FontAwesomeIcon icon={faStar} size="lg" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="border border-border bg-background px-3 py-2 text-sm"
          style={{ borderRadius: "var(--radius)" }}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
        />
        Submit anonymously (only the first letter of your name will be shown)
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="self-start border border-accent bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ borderRadius: "var(--radius)" }}
      >
        {submitting ? "Submitting..." : "Submit testimonial"}
      </button>
    </form>
  );
}
