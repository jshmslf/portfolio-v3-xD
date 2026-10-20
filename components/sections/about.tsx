import { getSiteProfile } from "@/lib/site-profile";
import { SectionHeader } from "@/components/ui/section-header";

export async function About() {
  const { about } = await getSiteProfile();

  return (
    <section>
      <SectionHeader title="About" />
      <div className="mt-6 space-y-4 text-lg">
        {about.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-foreground/80">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
