import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getRequestIpHash } from "@/lib/likes";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  const ipHash = await getRequestIpHash();

  const { error: insertError } = await supabaseAdmin
    .from("blog_likes")
    .insert({ post_id: postId, ip_hash: ipHash });

  if (insertError) {
    if (insertError.code === "23505") {
      const { data } = await supabaseAdmin
        .from("blog_posts")
        .select("likes_count")
        .eq("id", postId)
        .single();
      return NextResponse.json({ liked: true, likesCount: data?.likes_count ?? 0 });
    }
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // Atomic increment; falls back to read-then-write if the function is missing.
  const { data: rpcCount, error: rpcError } = await supabaseAdmin.rpc("increment_blog_likes", {
    p_post_id: postId,
  });

  if (!rpcError && typeof rpcCount === "number") {
    return NextResponse.json({ liked: true, likesCount: rpcCount });
  }

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("likes_count")
    .eq("id", postId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const nextCount = (data?.likes_count ?? 0) + 1;
  await supabaseAdmin.from("blog_posts").update({ likes_count: nextCount }).eq("id", postId);

  return NextResponse.json({ liked: true, likesCount: nextCount });
}
