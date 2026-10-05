"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const INPUT_CLASS =
  "w-full border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 hover:border-foreground/20 focus:border-accent";
const LABEL_CLASS = "flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wide text-muted";

/**
 * Contact form posting to /api/hire-me. `split` puts name and email side by
 * side when the form itself is wide enough (inline on the homepage);
 * `stacked` suits modals.
 */
export function ContactForm({ layout = "stacked" }: { layout?: "stacked" | "split" }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-xl text-accent">
          <FontAwesomeIcon icon={faCircleCheck} />
        </span>
        <p className="font-semibold">Message sent</p>
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      className="@container flex flex-col gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("sending");

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
          const response = await fetch("/api/hire-me", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.get("name"),
              email: formData.get("email"),
              message: formData.get("message"),
            }),
          });

          if (!response.ok) throw new Error("Request failed");
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
    >
      {/* Split on the form's own width, not the viewport: the homepage column is narrow on desktop. */}
      <div className={`grid gap-4 ${layout === "split" ? "@sm:grid-cols-2" : ""}`}>
        <label className={LABEL_CLASS}>
          Name
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Juan Dela Cruz"
            className={INPUT_CLASS}
            style={{ borderRadius: "var(--radius)" }}
          />
        </label>
        <label className={LABEL_CLASS}>
          Email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={INPUT_CLASS}
            style={{ borderRadius: "var(--radius)" }}
          />
        </label>
      </div>
      <label className={LABEL_CLASS}>
        Message
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Tell me about your project, timeline, or role..."
          className={`${INPUT_CLASS} resize-y`}
          style={{ borderRadius: "var(--radius)" }}
        />
      </label>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-500">
          Something went wrong sending your message. Please try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-1 inline-flex w-full items-center justify-center gap-2 border border-accent bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:opacity-90 disabled:opacity-60"
        style={{ borderRadius: "var(--radius)" }}
      >
        {status === "sending" ? "Sending..." : "Send message"}
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
    </form>
  );
}
