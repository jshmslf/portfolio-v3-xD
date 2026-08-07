import { supabaseAdmin } from "@/lib/supabase/admin";

const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 16 * 60 * 60 * 1000;

export async function canSendHireMeEmail(ipHash: string): Promise<boolean> {
  const { data: row } = await supabaseAdmin
    .from("hire_me_rate_limits")
    .select("count, window_start")
    .eq("ip_hash", ipHash)
    .maybeSingle();

  if (!row) {
    await supabaseAdmin
      .from("hire_me_rate_limits")
      .insert({ ip_hash: ipHash, count: 1, window_start: new Date().toISOString() });
    return true;
  }

  const windowStart = new Date(row.window_start).getTime();
  const cooldownExpired = Date.now() - windowStart >= COOLDOWN_MS;

  if (cooldownExpired) {
    await supabaseAdmin
      .from("hire_me_rate_limits")
      .update({ count: 1, window_start: new Date().toISOString() })
      .eq("ip_hash", ipHash);
    return true;
  }

  if (row.count >= MAX_ATTEMPTS) {
    return false;
  }

  await supabaseAdmin
    .from("hire_me_rate_limits")
    .update({ count: row.count + 1 })
    .eq("ip_hash", ipHash);
  return true;
}
