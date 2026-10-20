"use client";

import { useEffect } from "react";
import { IntroLoader } from "@/components/ui/intro-loader";
import { INTRO_SEEN_KEY } from "@/components/sections/intro-script";

// Long enough for the loader to read as intentional, short enough not to
// annoy; capped so a slow third-party asset can't hold the page hostage.
const MIN_VISIBLE_MS = 1300;
const MAX_VISIBLE_MS = 4000;
const EXIT_MS = 900;

/**
 * Landing intro loader, shown once per session. The <head> intro script
 * decides whether it plays (data-intro="play") before first paint; this
 * component lifts it once the page has loaded.
 */
export function IntroSplash({ name, role }: { name: string; role: string }) {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;

    const timers: number[] = [];
    let left = false;

    function leave() {
      if (left) return;
      left = true;
      root.dataset.intro = "leaving";
      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {}
      // Deliberately not cleared on unmount: a leftover "leaving" would replay
      // the curtain the next time the landing page mounts.
      window.setTimeout(() => delete root.dataset.intro, EXIT_MS);
    }

    // performance.now() counts from navigation start, so these are measured
    // from when the visitor started waiting, not from hydration.
    function onLoad() {
      timers.push(window.setTimeout(leave, Math.max(0, MIN_VISIBLE_MS - performance.now())));
    }

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    timers.push(window.setTimeout(leave, Math.max(0, MAX_VISIBLE_MS - performance.now())));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="intro-splash" aria-hidden="true">
      <IntroLoader name={name} role={role} />
    </div>
  );
}
