import { getExperience } from "@/lib/experience";
import { SectionHeader } from "@/components/ui/section-header";

export async function Experience() {
  const experience = await getExperience();

  return (
    <section>
      <SectionHeader title="Experience" />
      <ol className="mt-6 space-y-8 border-l border-border pl-6">
        {experience.map((item, index) => (
          <li key={`${index}-${item.org}`} className="relative">
            {/* Centered on the 1px timeline: -(24px padding + 1px border) - 6px half-dot + 0.5px */}
            <span
              aria-hidden="true"
              className="absolute -left-[30.5px] top-1 flex h-3 w-3"
            >
              {index === 0 && (
                <span
                  className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-60"
                  style={{ borderRadius: "var(--radius)" }}
                />
              )}
              <span
                className={`relative inline-flex h-3 w-3 ring-4 ring-background ${
                  index === 0 ? "bg-accent" : "bg-border"
                }`}
                style={{ borderRadius: "var(--radius)" }}
              />
            </span>
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
