import { getGithubContributions } from "@/lib/github";
import { SectionHeader } from "@/components/ui/section-header";

const COLOR_CLASSES = ["bg-border", "bg-accent/25", "bg-accent/50", "bg-accent/75", "bg-accent"];
const SIZE_CLASSES = ["h-0.5 w-0.5", "h-1 w-1", "h-1.5 w-1.5", "h-2 w-2", "h-2.5 w-2.5"];

export async function GithubActivity() {
  const data = await getGithubContributions();
  if (!data) return null;

  return (
    <section id="github-activity">
      <SectionHeader title="GitHub Activity" />
      <div className="mt-4 flex flex-col gap-3">
        <div className="w-full overflow-x-auto pb-2">
          <div className="mx-auto flex w-fit gap-0.5">
            {data.weeks.map((week, index) => (
              <div key={index} className="flex w-2.5 flex-col gap-0.5">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    className="flex h-2.5 w-2.5 items-center justify-center"
                  >
                    <div className={`rounded-full ${SIZE_CLASSES[day.level]} ${COLOR_CLASSES[day.level]}`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted">
          {data.totalContributions.toLocaleString()} contributions in the last year
        </p>
      </div>
    </section>
  );
}
