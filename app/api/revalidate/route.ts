import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Called by the CMS (portfolio-cms/lib/site-revalidate.ts) after every
// content save. Invalidating the root layout marks every page — including
// sitemap.xml and llms.txt — stale, so the next visit renders fresh data.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 503 });
  }

  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
  if (!safeEqual(token, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
