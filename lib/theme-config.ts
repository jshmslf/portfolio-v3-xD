export const THEME_STORAGE_KEY = "theme";
export const ACCENT_STORAGE_KEY = "accent";
export const RADIUS_STORAGE_KEY = "radius";

export type ThemeMode = "light" | "dark" | "system";

export const accentSwatches = [
  { id: "neon-red", label: "Neon Red", value: "#ff1e2d", foreground: "#fff5f5" },
  { id: "crimson", label: "Crimson", value: "#dc143c", foreground: "#fff5f5" },
  { id: "scarlet", label: "Scarlet", value: "#ff2400", foreground: "#fff5f5" },
  { id: "cherry", label: "Cherry", value: "#d21404", foreground: "#fff5f5" },
  { id: "blood", label: "Blood", value: "#8b0000", foreground: "#fdeaea" },
] as const;

export type AccentId = (typeof accentSwatches)[number]["id"];

export const radiusPresets = [
  { id: "none", label: "Sharp", value: "0px" },
  { id: "sm", label: "Subtle", value: "6px" },
  { id: "md", label: "Rounded", value: "12px" },
  { id: "lg", label: "Soft", value: "20px" },
  { id: "full", label: "Pill", value: "28px" },
] as const;

export type RadiusId = (typeof radiusPresets)[number]["id"];

export const defaultAccent: AccentId = "neon-red";
export const defaultRadius: RadiusId = "md";
export const defaultTheme: ThemeMode = "dark";
