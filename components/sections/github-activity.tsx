import { getGithubContributions } from "@/lib/github";
import { SectionHeader } from "@/components/ui/section-header";

// Color is the only intensity signal; every day is the same size square.
const COLOR_CLASSES = ["bg-border", "bg-accent/20", "bg-accent/45", "bg-accent/70", "bg-accent"];
// Fixed small radius (not --radius) so the "pill" theme preset doesn't turn squares into dots.
const CELL_CLASS = "h-2.5 w-2.5 rounded-[2px]";

export async function GithubActivity() {
  const data = await getGithubContributions();
  if (!data) return null;

  const total = data.totalContributions.toLocaleString();

  return (
    <section>
      <SectionHeader title="GitHub Activity" />
      <div className="mt-4 flex flex-col gap-3">
        <div className="w-full overflow-x-auto pb-2">
          <div
            role="img"
            aria-label={`${total} GitHub contributions in the last year`}
            className="mx-auto flex w-fit gap-[3px]"
          >
            {data.weeks.map((week, index) => (
              <div key={index} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    className={`${CELL_CLASS} ${COLOR_CLASSES[day.level]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <p>{total} contributions in the last year</p>
          <div aria-hidden="true" className="flex items-center gap-1.5 text-xs">
            Less
            {COLOR_CLASSES.map((color) => (
              <span key={color} className={`${CELL_CLASS} ${color}`} />
            ))}
            More
          </div>
        </div>
      </div>
    </section>
  );
}
