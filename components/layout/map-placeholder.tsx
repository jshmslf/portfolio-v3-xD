import { getPangasinanMapUrl } from "@/lib/mapbox";
import { PhClock } from "@/components/layout/ph-clock";

export function MapPlaceholder() {
  return (
    <div
      className="relative h-52 w-full overflow-hidden border border-border bg-background"
      style={{ borderRadius: "var(--radius)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getPangasinanMapUrl(600, 560)}
        alt="Map of Pangasinan, Philippines"
        className="h-full w-full object-cover"
      />
      <PhClock />
    </div>
  );
}
