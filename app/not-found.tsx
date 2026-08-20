import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "404 – Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Error
      </p>
      <h1
        data-text="404"
        className="glitch mt-4 text-7xl font-bold tracking-tight text-foreground sm:text-9xl"
      >
        404
      </h1>
      <div
        className="mt-8 w-full max-w-md border border-border bg-surface p-4 text-left font-mono text-sm text-muted"
        style={{ borderRadius: "var(--radius)" }}
      >
        <p>
          <span className="text-accent">$</span> curl {"{"}your-page{"}"}
        </p>
        <p className="mt-1 text-foreground">
          404: resource not found
          <span className="terminal-cursor">_</span>
        </p>
      </div>
      <Link
        href="/"
        className="mt-10 inline-flex items-center border border-accent bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        style={{ borderRadius: "var(--radius)" }}
      >
        Return home
      </Link>
    </Container>
  );
}
