import { createHash } from "crypto";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getRequestIpHash(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

  return createHash("sha256")
    .update(`${ip}:${process.env.LIKE_IP_SALT}`)
    .digest("hex");
}

export async function hasLiked(postId: string, ipHash: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("blog_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("ip_hash", ipHash)
    .maybeSingle();

  return Boolean(data);
}
