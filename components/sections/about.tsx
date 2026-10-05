import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/section-header";

export function About() {
  return (
    <section>
      <SectionHeader title="About" />
      <div className="mt-6 space-y-4 text-lg">
        {siteConfig.about.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-foreground/80">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
