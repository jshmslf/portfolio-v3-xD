"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function HireMeModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

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
          <h2 className="text-lg font-semibold">Hire me</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted hover:text-accent"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {submitted ? (
          <p className="mt-6 leading-relaxed text-foreground/80">
            Thanks for reaching out. This form is a placeholder for now, wire
            it up to your email service or an API route to receive
            submissions.
          </p>
        ) : (
          <form
            className="mt-4 flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm">
              Name
              <input
                required
                type="text"
                className="border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                style={{ borderRadius: "var(--radius)" }}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Email
              <input
                required
                type="email"
                className="border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                style={{ borderRadius: "var(--radius)" }}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Message
              <textarea
                required
                rows={4}
                className="border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                style={{ borderRadius: "var(--radius)" }}
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 border border-accent bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-opacity hover:opacity-90"
              style={{ borderRadius: "var(--radius)" }}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
