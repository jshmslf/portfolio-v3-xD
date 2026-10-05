"use client";

import { useState } from "react";
import { HireMeModal } from "@/components/layout/hire-me-modal";

const VARIANT_CLASS = {
  primary:
    "border border-accent bg-accent text-accent-foreground hover:opacity-90",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent hover:text-accent",
} as const;

export function HireMeButton({
  children = "Hire me",
  variant = "primary",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: keyof typeof VARIANT_CLASS;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`inline-flex items-center justify-center gap-2 font-medium transition-all ${VARIANT_CLASS[variant]} ${className}`}
        style={{ borderRadius: "var(--radius)" }}
      >
        {children}
      </button>

      {open && <HireMeModal onClose={() => setOpen(false)} />}
    </>
  );
}
