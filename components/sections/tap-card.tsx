import { getTapTotal } from "@/lib/taps";
import { TapCounter } from "@/components/sections/tap-counter";

export async function TapCard() {
  const total = await getTapTotal();
  return <TapCounter initialTotal={total} />;
}
