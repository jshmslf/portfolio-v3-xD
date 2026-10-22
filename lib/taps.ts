import { cache } from "react";
import { supabase } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type HomepageCard = "tap" | "dodgers";

// Most taps one request may add. A person can't tap anywhere near this fast
// between the client's flushes; it only bounds what a script can add at once.
export const MAX_TAPS_PER_REQUEST = 100;

/**
 * Which card sits next to Testimonials, chosen in the CMS. Falls back to the
 * tap counter when the column (migration 014) is missing or the query fails.
 */
export const getHomepageCard = cache(async (): Promise<HomepageCard> => {
  const { data } = await supabase
    .from("profile")
    .select("homepage_card")
    .eq("id", 1)
    .maybeSingle<{ homepage_card: string | null }>();

  return data?.homepage_card === "dodgers" ? "dodgers" : "tap";
});

export async function getTapTotal(): Promise<number> {
  const { data } = await supabaseAdmin
    .from("tap_counter")
    .select("total")
    .eq("id", 1)
    .maybeSingle<{ total: number }>();

  return Number(data?.total ?? 0);
}

export async function getVisitorTaps(ipHash: string): Promise<number> {
  const { data } = await supabaseAdmin
    .from("site_taps")
    .select("taps")
    .eq("ip_hash", ipHash)
    .maybeSingle<{ taps: number }>();

  return Number(data?.taps ?? 0);
}

export async function recordTaps(
  ipHash: string,
  count: number,
): Promise<{ total: number; mine: number } | null> {
  const { data, error } = await supabaseAdmin
    .rpc("record_taps", { p_ip_hash: ipHash, p_count: count })
    .single<{ total: number; mine: number }>();

  if (error || !data) return null;
  return { total: Number(data.total), mine: Number(data.mine) };
}
