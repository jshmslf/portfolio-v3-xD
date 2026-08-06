"use client";

import { useEffect, useState } from "react";

export function PhClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Time can only be known client-side; setting it here (rather than during
    // render) avoids a server/client hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  });

  return (
    <p className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1 text-xs font-mono tabular-nums text-white">
      {time}
    </p>
  );
}
