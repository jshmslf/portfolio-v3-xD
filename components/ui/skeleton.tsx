const radius = { borderRadius: "var(--radius)" };

/** A single shimmering placeholder block; size it with className. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton ${className}`} style={radius} />;
}

/**
 * Wraps a route's loading UI so screen readers hear one "Loading" announcement
 * instead of a pile of empty boxes.
 */
export function LoadingShell({
  label,
  className = "flex-1 pt-20 pb-24",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <main className={className} aria-busy="true">
      <p role="status" className="sr-only">
        Loading {label}…
      </p>
      {children}
    </main>
  );
}

export function PageHeaderSkeleton({ withDescription = true }: { withDescription?: boolean }) {
  return (
    <div>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-9 w-56 sm:h-10" />
      {withDescription && (
        <div className="mt-4 flex max-w-2xl flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}
    </div>
  );
}

export function SectionHeaderSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
      <Skeleton className="h-3.5 w-28" />
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden border border-border" style={radius}>
      <div className="skeleton aspect-video w-full border-b border-border" />
      <div className="flex flex-col gap-2 p-5">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="mt-1 h-3.5 w-full" />
        <Skeleton className="h-3.5 w-4/5" />
        <div className="mt-3 flex gap-1.5">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
      <div className="flex items-center justify-between px-5 pb-5">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-3.5 w-12" />
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="border border-border p-5" style={radius}>
      <Skeleton className="h-3 w-36" />
      <Skeleton className="mt-3 h-5 w-3/4" />
      <Skeleton className="mt-3 h-3.5 w-full" />
      <Skeleton className="mt-2 h-3.5 w-2/3" />
      <Skeleton className="mt-4 h-3 w-16" />
    </div>
  );
}

export function TechItemSkeleton() {
  return (
    <div className="flex items-center gap-3 border border-border p-3" style={radius}>
      <Skeleton className="h-6 w-6 shrink-0" />
      <Skeleton className="h-3.5 w-20" />
    </div>
  );
}
