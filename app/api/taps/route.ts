import { NextResponse } from "next/server";
import { getRequestIpHash } from "@/lib/likes";
import { getTapTotal, getVisitorTaps, MAX_TAPS_PER_REQUEST, recordTaps } from "@/lib/taps";

// The all-time total plus this visitor's own count.
export async function GET() {
  const ipHash = await getRequestIpHash();
  const [total, mine] = await Promise.all([getTapTotal(), getVisitorTaps(ipHash)]);
  return NextResponse.json({ total, mine });
}

// Adds a batch of taps. The client groups rapid taps into one request, so
// `count` is how many happened since its last flush.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const count = Number(body?.count);

  if (!Number.isInteger(count) || count < 1) {
    return NextResponse.json({ error: "count must be a positive integer." }, { status: 400 });
  }

  const ipHash = await getRequestIpHash();
  const result = await recordTaps(ipHash, Math.min(count, MAX_TAPS_PER_REQUEST));

  if (!result) {
    return NextResponse.json({ error: "Couldn't save your taps." }, { status: 500 });
  }
  return NextResponse.json(result);
}
