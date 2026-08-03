import { siteConfig } from "@/lib/site-config";

export function About() {
  return (
    <section id="about">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
        About
      </h2>
      <div className="mt-4 space-y-4">
        {siteConfig.about.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-foreground/80">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
