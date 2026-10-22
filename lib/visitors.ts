import { supabaseAdmin } from "@/lib/supabase/admin";

/** Unique visitors so far, or null when the table (migration 015) is missing. */
export async function getVisitorTotal(): Promise<number | null> {
  const { data, error } = await supabaseAdmin
    .from("visitor_counter")
    .select("total")
    .eq("id", 1)
    .maybeSingle<{ total: number }>();

  if (error || !data) return null;
  return Number(data.total);
}

/** Records this visitor (counted once per IP hash) and returns the new total. */
export async function recordVisit(ipHash: string): Promise<number | null> {
  const { data, error } = await supabaseAdmin.rpc("record_visit", { p_ip_hash: ipHash });

  if (error || data == null) return null;
  return Number(data);
}
