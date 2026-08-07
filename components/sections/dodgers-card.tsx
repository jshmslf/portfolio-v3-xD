import Image from "next/image";
import { getDodgersStanding } from "@/lib/dodgers";
import { SectionHeader } from "@/components/ui/section-header";

const DODGER_BLUE = "#005A9C";

function ordinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  return `${n}${suffixes[(remainder - 20) % 10] ?? suffixes[remainder] ?? suffixes[0]}`;
}

export async function DodgersCard() {
  const standing = await getDodgersStanding();

  return (
    <section className="flex h-full flex-col">
      <SectionHeader title="LA Dodgers" />
      <div
        className="relative mt-6 flex h-full flex-1 items-center justify-center overflow-hidden border border-border bg-surface p-4 transition-colors"
        style={{ borderRadius: "var(--radius)" }}
      >
        <Image
          src="https://www.mlbstatic.com/team-logos/119.svg"
          alt=""
          aria-hidden="true"
          width={160}
          height={160}
          className="pointer-events-none absolute h-40 w-40 opacity-10"
        />
        {standing ? (
          <div className="relative z-10 flex flex-col items-center gap-1 text-center">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-3xl font-bold" style={{ color: DODGER_BLUE }}>
                  {standing.wins}
                </p>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Wins</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground/80">{standing.losses}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Losses</p>
              </div>
            </div>
            <p className="mt-2 text-sm font-semibold" style={{ color: DODGER_BLUE }}>
              {ordinal(standing.leagueRank)} in the National League
            </p>
            <p className="mt-1 text-sm text-muted">{standing.season} regular season</p>
          </div>
        ) : (
          <p className="relative z-10 text-sm text-muted">Stats unavailable</p>
        )}
      </div>
    </section>
  );
}
