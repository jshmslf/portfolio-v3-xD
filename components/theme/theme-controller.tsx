"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import {
  ACCENT_STORAGE_KEY,
  RADIUS_STORAGE_KEY,
  THEME_STORAGE_KEY,
  accentSwatches,
  defaultAccent,
  defaultRadius,
  defaultTheme,
  radiusPresets,
  type AccentId,
  type RadiusId,
  type ThemeMode,
} from "@/lib/theme-config";

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  root.setAttribute("data-theme", resolved);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function applyAccent(accentId: AccentId) {
  const swatch =
    accentSwatches.find((a) => a.id === accentId) ?? accentSwatches[0];
  const root = document.documentElement;
  root.style.setProperty("--accent", swatch.value);
  root.style.setProperty("--accent-foreground", swatch.foreground);
  localStorage.setItem(ACCENT_STORAGE_KEY, accentId);
}

function applyRadius(radiusId: RadiusId) {
  const preset =
    radiusPresets.find((r) => r.id === radiusId) ?? radiusPresets[0];
  document.documentElement.style.setProperty("--radius", preset.value);
  localStorage.setItem(RADIUS_STORAGE_KEY, radiusId);
}

function readStored<T extends string>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  return (localStorage.getItem(key) as T) ?? fallback;
}

export function ThemeController() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() =>
    readStored(THEME_STORAGE_KEY, defaultTheme)
  );
  const [accent, setAccent] = useState<AccentId>(() =>
    readStored(ACCENT_STORAGE_KEY, defaultAccent)
  );
  const [radius, setRadius] = useState<RadiusId>(() =>
    readStored(RADIUS_STORAGE_KEY, defaultRadius)
  );
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={panelRef} className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          className="mb-3 w-64 border border-border bg-surface p-4 shadow-lg"
          style={{ borderRadius: "var(--radius)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Theme
          </p>
          <div className="mt-2 mb-4 grid grid-cols-3 gap-1.5">
            {(["light", "dark", "system"] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setTheme(mode);
                  applyTheme(mode);
                }}
                className={`px-2 py-1.5 text-xs capitalize border transition-colors ${
                  theme === mode
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-foreground hover:border-accent"
                }`}
                style={{ borderRadius: "var(--radius)" }}
              >
                {mode}
              </button>
            ))}
          </div>

          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Accent
          </p>
          <div className="mt-2 mb-4 flex gap-2">
            {accentSwatches.map((swatch) => (
              <button
                key={swatch.id}
                type="button"
                aria-label={swatch.label}
                onClick={() => {
                  setAccent(swatch.id);
                  applyAccent(swatch.id);
                }}
                className={`h-7 w-7 rounded-full border-2 transition-transform ${
                  accent === swatch.id
                    ? "border-foreground scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: swatch.value }}
              />
            ))}
          </div>

          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Radius
          </p>
          <div className="mt-2 flex gap-1.5">
            {radiusPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                aria-label={preset.label}
                onClick={() => {
                  setRadius(preset.id);
                  applyRadius(preset.id);
                }}
                className={`h-7 w-9 border-2 bg-background transition-colors ${
                  radius === preset.id ? "border-accent" : "border-border"
                }`}
                style={{ borderRadius: preset.value }}
              />
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Theme settings"
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center border border-border bg-surface text-foreground shadow-lg transition-transform hover:scale-105"
        style={{ borderRadius: "var(--radius)" }}
      >
        <FontAwesomeIcon icon={faSliders} />
      </button>
    </div>
  );
}
