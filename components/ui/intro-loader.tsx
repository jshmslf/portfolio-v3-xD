function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Monogram with a spinning accent ring and an indeterminate progress bar.
 * Shared by the landing intro splash and the landing route's loading state.
 */
export function IntroLoader({ name, role }: { name?: string; role?: string }) {
  return (
    <div className="intro-loader flex flex-col items-center text-center">
      <div className="intro-mark relative flex h-20 w-20 items-center justify-center">
        <svg aria-hidden="true" viewBox="0 0 80 80" className="intro-ring absolute inset-0 h-full w-full">
          <circle cx="40" cy="40" r="38" fill="none" stroke="var(--border)" strokeWidth="2" />
          <circle
            cx="40"
            cy="40"
            r="38"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="60 239"
          />
        </svg>
        <span className="text-xl font-semibold tracking-tight">
          {name ? initialsOf(name) : <span className="block h-2 w-2 rounded-full bg-accent" />}
        </span>
      </div>
      {name && <p className="intro-name mt-6 text-lg font-semibold tracking-tight">{name}</p>}
      {role && (
        <p className="intro-role mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted">
          {role}
        </p>
      )}
      <div className="mt-6 h-0.5 w-40 overflow-hidden rounded-full bg-border">
        <span className="intro-bar-fill block h-full w-1/3 rounded-full bg-accent" />
      </div>
    </div>
  );
}
