"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function HireMeModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

        {status === "sent" ? (
          <p className="mt-6 leading-relaxed text-foreground/80">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
        ) : (
          <form
            className="mt-4 flex flex-col gap-4"
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
            <label className="flex flex-col gap-1.5 text-sm">
              Name
              <input
                required
                name="name"
                type="text"
                className="border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                style={{ borderRadius: "var(--radius)" }}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Email
              <input
                required
                name="email"
                type="email"
                className="border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                style={{ borderRadius: "var(--radius)" }}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Message
              <textarea
                required
                name="message"
                rows={4}
                className="border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                style={{ borderRadius: "var(--radius)" }}
              />
            </label>
            {status === "error" && (
              <p className="text-sm text-red-500">
                Something went wrong sending your message. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex items-center justify-center gap-2 border border-accent bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ borderRadius: "var(--radius)" }}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
