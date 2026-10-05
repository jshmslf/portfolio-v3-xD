"use client";

import { Modal } from "@/components/ui/modal";
import { ContactForm } from "@/components/sections/contact-form";

export function HireMeModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} labelledBy="hire-me-title">
      <h2 id="hire-me-title" className="pr-8 text-lg font-semibold">
        Let&apos;s work together
      </h2>
      <p className="mt-1 text-sm text-muted">
        Tell me a bit about your project or role. I usually reply within a day or two.
      </p>
      <div className="mt-5">
        <ContactForm />
      </div>
    </Modal>
  );
}
