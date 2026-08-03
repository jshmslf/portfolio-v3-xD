import { experience } from "@/lib/experience";

export function Experience() {
  return (
    <section id="experience">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
        Experience
      </h2>
      <ol className="mt-6 space-y-8 border-l border-border pl-6">
        {experience.map((item) => (
          <li key={`${item.org}-${item.period}`} className="relative">
            <span
              className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 bg-accent"
              style={{ borderRadius: "var(--radius)" }}
            />
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {item.period}
            </p>
            <h3 className="mt-1 text-base font-semibold">
              {item.role}
              <span className="font-normal text-muted"> &middot; {item.org}</span>
            </h3>
            <p className="mt-2 leading-relaxed text-foreground/80">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
