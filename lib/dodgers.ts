const DODGERS_TEAM_ID = 119;
const NL_LEAGUE_ID = 104;

export async function getDodgersStanding(): Promise<{
  wins: number;
  losses: number;
  leagueRank: number;
  season: number;
} | null> {
  const season = new Date().getFullYear();

  try {
    const response = await fetch(
      `https://statsapi.mlb.com/api/v1/standings?leagueId=${NL_LEAGUE_ID}&season=${season}&standingsTypes=regularSeason`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) return null;

    const data = await response.json();
    const teamRecords = (data?.records ?? []).flatMap(
      (record: { teamRecords?: unknown[] }) => record.teamRecords ?? [],
    );
    const dodgers = teamRecords.find(
      (team: { team?: { id?: number } }) => team.team?.id === DODGERS_TEAM_ID,
    ) as { wins?: number; losses?: number; leagueRank?: string } | undefined;

    const leagueRank = Number(dodgers?.leagueRank);

    if (
      typeof dodgers?.wins !== "number" ||
      typeof dodgers?.losses !== "number" ||
      Number.isNaN(leagueRank)
    ) {
      return null;
    }

    return { wins: dodgers.wins, losses: dodgers.losses, leagueRank, season };
  } catch {
    return null;
  }
}
