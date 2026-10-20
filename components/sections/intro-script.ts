export const INTRO_SEEN_KEY = "intro-seen";

// Runs in <head> before first paint, so the landing never flashes its
// un-measured hero or skips straight past the intro loader.
//  - data-hero="pending": hides the hero until <HeroStage> has measured it.
//  - data-intro="play":   shows the intro loader (landing, once per session).
// The timeout is a safety net in case hydration never happens.
export const introScript = `
(function () {
  try {
    var root = document.documentElement;
    root.setAttribute("data-hero", "pending");
    if (location.pathname === "/" && !sessionStorage.getItem("${INTRO_SEEN_KEY}")) {
      root.setAttribute("data-intro", "play");
    }
    setTimeout(function () {
      if (root.getAttribute("data-hero") === "pending") root.setAttribute("data-hero", "ready");
      if (root.getAttribute("data-intro") === "play") root.removeAttribute("data-intro");
    }, 5000);
  } catch (e) {}
})();
`;
