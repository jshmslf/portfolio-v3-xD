"use client";

import { useLayoutEffect, useRef } from "react";

export const HERO_STAGE_ID = "intro";

// How far the profile is zoomed in on the first screen. Narrow screens get
// less so the wider-than-tall content doesn't spill off the sides.
const MAX_SCALE = 1.2;
const MAX_SCALE_NARROW = 1.06;
const NARROW_BREAKPOINT = 640;

// The scroll indicator only shows while the visitor is still at the top.
const AT_TOP_THRESHOLD = 8;

/**
 * Full-viewport intro: the profile starts zoomed in and centred, then scales
 * back down to its natural size as the visitor scrolls, while the page below
 * rides up underneath it.
 *
 * Layout never changes while scrolling (that is what made it janky): the
 * panel keeps its natural height and is sticky inside a viewport-tall stage,
 * and the zoom is a pure transform. Where supported, a CSS scroll-driven
 * animation runs it on the compositor; otherwise a scroll listener writes the
 * same transform.
 */
export function HeroStage({
  backdrop,
  children,
}: {
  backdrop: React.ReactNode;
  children: React.ReactNode;
}) {
  const stageRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLButtonElement>(null);

  // Layout effect: the measured transform must land before the first paint
  // on client-side navigations, or the hero would visibly jump.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    const indicator = indicatorRef.current;
    if (!stage || !panel || !content || !indicator) return;

    const cssDriven = CSS.supports("animation-timeline: scroll()");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let collapse = 0;
    let shift = 0;
    let scale = 1;
    let atTop: boolean | null = null;

    function measure() {
      const stageHeight = stage!.offsetHeight;
      const panelHeight = panel!.offsetHeight;
      const maxScale = reduceMotion
        ? 1
        : window.innerWidth < NARROW_BREAKPOINT
          ? MAX_SCALE_NARROW
          : MAX_SCALE;

      collapse = Math.max(0, stageHeight - panelHeight);
      shift = collapse / 2;
      // Never zoom past the viewport, so the content below can't overlap it.
      scale = Math.max(1, Math.min(maxScale, stageHeight / panelHeight));

      stage!.style.setProperty("--hero-collapse", `${Math.max(collapse, 1)}px`);
      stage!.style.setProperty("--hero-shift", `${shift}px`);
      stage!.style.setProperty("--hero-scale", `${scale}`);
    }

    function applyTransform() {
      if (cssDriven) return;
      const progress = collapse ? Math.min(1, Math.max(0, window.scrollY / collapse)) : 1;
      const remaining = 1 - progress;
      content!.style.transform =
        progress >= 1
          ? "none"
          : `translate3d(0, ${shift * remaining}px, 0) scale(${1 + (scale - 1) * remaining})`;
    }

    function onScroll() {
      const nowAtTop = window.scrollY <= AT_TOP_THRESHOLD;
      if (nowAtTop !== atTop) {
        atTop = nowAtTop;
        indicator!.toggleAttribute("data-gone", !nowAtTop);
      }
      applyTransform();
    }

    const resizeObserver = new ResizeObserver(() => {
      measure();
      applyTransform();
    });
    resizeObserver.observe(stage);
    resizeObserver.observe(panel);

    measure();
    onScroll();
    document.documentElement.setAttribute("data-hero", "ready");

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function scrollToContent() {
    const stage = stageRef.current;
    const panel = panelRef.current;
    if (!stage || !panel) return;
    window.scrollTo({ top: stage.offsetHeight - panel.offsetHeight, behavior: "smooth" });
  }

  return (
    <section ref={stageRef} id={HERO_STAGE_ID} className="hero-stage relative">
      <div ref={panelRef} className="sticky top-0 isolate">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-svh overflow-hidden">
          {backdrop}
        </div>

        <div ref={contentRef} className="hero-content">
          {children}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-svh">
          <button
            ref={indicatorRef}
            type="button"
            onClick={scrollToContent}
            className="pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition-[opacity,translate,visibility,color] duration-300 hover:text-accent-text data-[gone]:invisible data-[gone]:translate-y-3 data-[gone]:opacity-0"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-6 justify-center rounded-full border-2 border-current pt-1.5"
            >
              <span className="scroll-indicator-dot h-1.5 w-1 rounded-full bg-accent" />
            </span>
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.2em]">
              Scroll
            </span>
            <span className="sr-only">to see more about me</span>
          </button>
        </div>
      </div>
    </section>
  );
}
