import { supabase } from "@/lib/supabase/server";

export type PortfolioVersion = {
  id: string;
  label: string;
  url: string;
};

export async function getPortfolioVersions(): Promise<PortfolioVersion[]> {
  const { data } = await supabase
    .from("portfolio_versions")
    .select("id, label, url")
    .order("sort_order", { ascending: true });

  return data ?? [];
}
