import { NextResponse } from "next/server";
import { getRequestIpHash } from "@/lib/likes";
import { recordVisit } from "@/lib/visitors";

// Counts this visitor (once per IP hash) and returns the total.
export async function POST() {
  const ipHash = await getRequestIpHash();
  const total = await recordVisit(ipHash);

  if (total === null) {
    return NextResponse.json({ error: "Couldn't record the visit." }, { status: 500 });
  }
  return NextResponse.json({ total });
}
