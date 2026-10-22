"use client";

import { useEffect, useRef, useState } from "react";
import { Press_Start_2P } from "next/font/google";

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] });

// Taps are counted on screen instantly and sent in batches: the first tap
// after a quiet spell starts this timer, and everything tapped until it fires
// goes out as one request. Only one request is in flight at a time.
const FLUSH_DELAY_MS = 600;
// Matches MAX_TAPS_PER_REQUEST in lib/taps.ts; bigger backlogs go in chunks.
const MAX_BATCH = 100;
const MAX_RETRY_DELAY_MS = 30_000;
// "+1"s on screen at once; older ones are dropped while spamming.
const MAX_POPS = 24;

const numberFormat = new Intl.NumberFormat("en-US");

type TapResponse = { total: number; mine: number };
type Pop = { id: number; x: number; y: number; rotate: number };

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * A shared, never-ending tap counter. The number never waits on the network,
 * so spamming the button stays smooth; the server's answers are merged in as
 * they arrive (and also pick up everyone else's taps). If saving fails, the
 * taps stay on screen and are retried with backoff.
 */
export function TapCounter({ initialTotal }: { initialTotal: number }) {
  const [serverTotal, setServerTotal] = useState(initialTotal);
  const [serverMine, setServerMine] = useState<number | null>(null);
  // Taps the server hasn't confirmed yet: queued plus in flight.
  const [unsaved, setUnsaved] = useState(0);
  const [pops, setPops] = useState<Pop[]>([]);
  const popId = useRef(0);

  const numberRef = useRef<HTMLParagraphElement>(null);
  const pending = useRef(0);
  const inFlight = useRef(0);
  const posted = useRef(false);
  const failures = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const flushRef = useRef<() => void>(() => {});

  // Totals only ever grow, so a late or out-of-order answer never makes the
  // number jump backwards.
  function applyServer(data: TapResponse) {
    setServerTotal((current) => Math.max(current, data.total));
    setServerMine((current) => Math.max(current ?? 0, data.mine));
  }

  function schedule(delay = FLUSH_DELAY_MS) {
    if (timer.current !== undefined) return;
    timer.current = window.setTimeout(() => {
      timer.current = undefined;
      flushRef.current();
    }, delay);
  }

  async function flush() {
    if (inFlight.current > 0 || pending.current === 0) return;

    const count = Math.min(pending.current, MAX_BATCH);
    pending.current -= count;
    inFlight.current = count;
    posted.current = true;

    try {
      const res = await fetch("/api/taps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count }),
        keepalive: true,
      });
      if (!res.ok) throw new Error("Failed");
      const data: TapResponse = await res.json();
      inFlight.current = 0;
      failures.current = 0;
      applyServer(data);
    } catch {
      pending.current += inFlight.current;
      inFlight.current = 0;
      failures.current += 1;
    }

    setUnsaved(pending.current);
    if (pending.current > 0) {
      schedule(
        failures.current > 0
          ? Math.min(MAX_RETRY_DELAY_MS, 1000 * 2 ** failures.current)
          : FLUSH_DELAY_MS,
      );
    }
  }

  useEffect(() => {
    flushRef.current = flush;
  });

  useEffect(() => {
    let cancelled = false;

    // This visitor's own count isn't in the cached page, so it's fetched
    // here. Skipped if a batch has already gone out: that answer is newer.
    fetch("/api/taps")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: TapResponse | null) => {
        if (data && !cancelled && !posted.current) applyServer(data);
      })
      .catch(() => {});

    // Send whatever is still queued when the tab is hidden or closed.
    function sendQueued() {
      if (document.visibilityState !== "hidden" || pending.current === 0) return;
      const count = Math.min(pending.current, MAX_BATCH);
      const sent = navigator.sendBeacon("/api/taps", JSON.stringify({ count }));
      if (!sent) return;
      pending.current -= count;
      posted.current = true;
      setServerTotal((current) => current + count);
      setServerMine((current) => (current ?? 0) + count);
      setUnsaved(pending.current + inFlight.current);
    }

    document.addEventListener("visibilitychange", sendQueued);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", sendQueued);
      window.clearTimeout(timer.current);
    };
  }, []);

  function handleTap() {
    pending.current += 1;
    setUnsaved((current) => current + 1);
    schedule();

    // A "+1" somewhere random in the card, as a percentage of its size.
    const pop = {
      id: popId.current++,
      x: randomBetween(10, 90),
      y: randomBetween(10, 90),
      rotate: randomBetween(-15, 15),
    };
    setPops((current) => [...current.slice(-(MAX_POPS - 1)), pop]);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      numberRef.current?.animate(
        [{ transform: "scale(1.08)" }, { transform: "scale(1)" }],
        { duration: 160, easing: "ease-out" },
      );
    }
  }

  const total = serverTotal + unsaved;
  const mine = serverMine === null ? null : serverMine + unsaved;

  return (
    <section aria-label="Tap counter" className="flex h-full flex-col">
      <div
        className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden border border-border bg-surface px-4 py-8 text-center"
        style={{ borderRadius: "var(--radius)" }}
      >
        <p
          ref={numberRef}
          className={`tap-score relative z-10 max-w-full text-3xl leading-tight break-all sm:text-4xl ${pixelFont.className}`}
        >
          {numberFormat.format(total)}
        </p>

        <button
          type="button"
          onClick={handleTap}
          onPointerDown={(event) => (event.currentTarget.dataset.pressed = "")}
          onPointerUp={(event) => delete event.currentTarget.dataset.pressed}
          onPointerLeave={(event) => delete event.currentTarget.dataset.pressed}
          onPointerCancel={(event) => delete event.currentTarget.dataset.pressed}
          className={`arcade-button relative z-10 touch-manipulation select-none px-6 py-3 text-xs ${pixelFont.className}`}
        >
          TAP
        </button>

        {/* Kept in the layout while loading so the card doesn't shift. */}
        <p className={`relative z-10 text-xs text-muted tabular-nums ${mine === null ? "invisible" : ""}`}>
          You tapped {numberFormat.format(mine ?? 0)} {mine === 1 ? "time" : "times"}
        </p>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {pops.map((pop) => (
            <span
              key={pop.id}
              onAnimationEnd={() => setPops((current) => current.filter((p) => p.id !== pop.id))}
              className={`tap-pop absolute text-sm text-accent-text ${pixelFont.className}`}
              style={
                {
                  left: `${pop.x}%`,
                  top: `${pop.y}%`,
                  "--pop-rotate": `${pop.rotate}deg`,
                } as React.CSSProperties
              }
            >
              +1
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
