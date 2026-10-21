import { getExperience } from "@/lib/experience";
import { SectionHeader } from "@/components/ui/section-header";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";

export async function Experience() {
  const experience = await getExperience();

  return (
    <section>
      <SectionHeader title="Experience" />
      <ExperienceTimeline items={experience} />
    </section>
  );
}
