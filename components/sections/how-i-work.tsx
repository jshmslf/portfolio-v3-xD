"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";

// `share` sizes each step's segment in the phase bar: roughly how a typical
// project's time splits. Support has no end, so its segment fades out.
const STEPS = [
  {
    title: "Research",
    share: 20,
    description:
      "Before any code, I learn what you're trying to achieve, who it's for and what already exists. We agree on scope, pages and the stack before work starts.",
    deliverables: ["Project brief", "Sitemap", "Tech plan"],
  },
  {
    title: "Development",
    share: 45,
    description:
      "I build in small pieces and share a preview link as I go, so you can click through real pages and give feedback while changes are still cheap.",
    deliverables: ["Live preview link", "Responsive build", "Weekly updates"],
  },
  {
    title: "Deployment",
    share: 15,
    description:
      "I launch on fast hosting, connect your domain, and check performance, SEO and accessibility before anyone else sees it.",
    deliverables: ["Domain & hosting", "SEO setup", "Analytics"],
  },
  {
    title: "Support",
    share: 20,
    ongoing: true,
    description:
      "After launch I keep the site healthy and help it grow, whether that's a quick fix or a whole new section.",
    deliverables: ["Fixes", "Content updates", "New features"],
  },
];

function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function HowIWork() {
  // The hovered row lights up its segment in the phase bar and dims the rest.
  const [active, setActive] = useState<number | null>(null);

  return (
    <section>
      <SectionHeader title="How I Work" />

      {/* Visual summary only; the list below carries the same steps. */}
      <div aria-hidden="true" className="mt-6">
        <div className="flex gap-1.5">
          {STEPS.map((step, index) => (
            <div key={step.title} className="min-w-0" style={{ flex: `${step.share} 1 0` }}>
              <span
                className="block h-2 transition-opacity duration-200 motion-reduce:transition-none"
                style={{
                  background: step.ongoing
                    ? "linear-gradient(to right, var(--accent) 35%, transparent)"
                    : "var(--accent)",
                  borderRadius: "min(var(--radius), 4px)",
                  opacity: active === null || active === index ? 1 : 0.2,
                }}
              />
              <p
                className={`mt-2 truncate text-xs tabular-nums transition-colors duration-200 ${
                  active === index ? "text-accent-text" : "text-muted"
                }`}
              >
                {stepNumber(index)}
                <span className="hidden sm:inline">&nbsp;&nbsp;{step.title}</span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">
          How a typical project&apos;s time splits. Support carries on after launch.
        </p>
      </div>

      <ol className="mt-8 border-t border-border">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-border py-6 sm:grid-cols-[2.5rem_9rem_1fr] sm:gap-x-4"
          >
            <span
              className={`pt-0.5 text-sm tabular-nums transition-colors duration-200 ${
                active === index ? "text-accent-text" : "text-muted"
              }`}
            >
              {stepNumber(index)}
            </span>
            <h3 className="font-semibold">{step.title}</h3>
            <div className="col-start-2 mt-2 sm:col-start-3 sm:mt-0">
              <p className="leading-relaxed text-foreground/80">{step.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="What you get">
                {step.deliverables.map((item) => (
                  <li
                    key={item}
                    className="border border-border bg-background px-2 py-0.5 text-xs text-muted"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
