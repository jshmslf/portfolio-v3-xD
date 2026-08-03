export const themeScript = `
(function () {
  try {
    var THEME_KEY = "theme";
    var ACCENT_KEY = "accent";
    var RADIUS_KEY = "radius";
    var accents = {
      "neon-red": { value: "#ff1e2d", foreground: "#fff5f5" },
      crimson: { value: "#dc143c", foreground: "#fff5f5" },
      scarlet: { value: "#ff2400", foreground: "#fff5f5" },
      cherry: { value: "#d21404", foreground: "#fff5f5" },
      blood: { value: "#8b0000", foreground: "#fdeaea" }
    };
    var radii = { none: "0px", sm: "6px", md: "12px", lg: "20px", full: "28px" };

    var root = document.documentElement;
    var theme = localStorage.getItem(THEME_KEY) || "dark";
    var resolvedTheme = theme;
    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    root.setAttribute("data-theme", resolvedTheme);

    var accentId = localStorage.getItem(ACCENT_KEY) || "neon-red";
    var accent = accents[accentId] || accents["neon-red"];
    root.style.setProperty("--accent", accent.value);
    root.style.setProperty("--accent-foreground", accent.foreground);

    var radiusId = localStorage.getItem(RADIUS_KEY) || "md";
    root.style.setProperty("--radius", radii[radiusId] || radii.md);
  } catch (e) {}
})();
`;
