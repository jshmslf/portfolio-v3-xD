"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { HireMeModal } from "@/components/layout/hire-me-modal";

export function ContactFormButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-opacity hover:opacity-90"
        style={{ borderRadius: "var(--radius)" }}
      >
        <FontAwesomeIcon icon={faEnvelope} />
        Send me an email
      </button>

      {open && createPortal(<HireMeModal onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}
