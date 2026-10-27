// Page color settings: a custom background and a custom accent color.
// The chosen colors are turned into the full set of CSS variables used by the site and saved in localStorage.

export type ThemeSettings = { bg: string | null; accent: string | null };

export const THEME_KEY = "fpc-theme-v1";
export const THEME_VARS_KEY = "fpc-theme-vars-v1";
export const DEFAULT_THEME: ThemeSettings = { bg: null, accent: null };

export const BG_PRESETS: { name: string; value: string }[] = [
  { name: "Cream", value: "#f7f5f0" },
  { name: "White", value: "#ffffff" },
  { name: "Mist", value: "#eef3f8" },
  { name: "Sage", value: "#eef4ec" },
  { name: "Blush", value: "#fbf1f1" },
  { name: "Lavender", value: "#f3f0fa" },
  { name: "Slate", value: "#1e2430" },
  { name: "Midnight", value: "#0b1220" },
  { name: "Forest", value: "#0f1614" },
  { name: "Charcoal", value: "#18181b" },
  { name: "Black", value: "#000000" },
];

export const ACCENT_PRESETS: { name: string; value: string }[] = [
  { name: "Teal", value: "#0f766e" },
  { name: "Blue", value: "#2563eb" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Purple", value: "#9333ea" },
  { name: "Rose", value: "#e11d48" },
  { name: "Orange", value: "#ea580c" },
  { name: "Green", value: "#16a34a" },
  { name: "Gold", value: "#ca8a04" },
];

type RGB = [number, number, number];

export function isHex(v: unknown): v is string {
  return typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v);
}

function toRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]: RGB): string {
  return "#" + [r, g, b].map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, "0")).join("");
}

function mix(a: string, b: string, t: number): string {
  const x = toRgb(a);
  const y = toRgb(b);
  return toHex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t]);
}

function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Builds every CSS variable from the chosen colors. Returns null when nothing is customized. */
export function computeVars(s: ThemeSettings, systemDark: boolean): Record<string, string> | null {
  const bgOk = isHex(s.bg);
  const accentOk = isHex(s.accent);
  if (!bgOk && !accentOk) return null;

  const bg = bgOk ? (s.bg as string) : systemDark ? "#0f1614" : "#f7f5f0";
  const dark = luminance(bg) < 0.18;
  const ink = dark ? "#eef2f0" : "#1d2a26";

  // Keep the accent readable as text on the chosen background.
  let brand = accentOk ? (s.accent as string) : dark ? "#2dd4bf" : "#0f766e";
  for (let i = 0; i < 20 && contrast(brand, bg) < 4.8; i++) brand = mix(brand, dark ? "#ffffff" : "#000000", 0.08);
  const brandInk = contrast(brand, "#ffffff") >= contrast(brand, "#000000") ? "#ffffff" : "#000000";

  return {
    "color-scheme": dark ? "dark" : "light",
    "--bg": bg,
    "--surface": dark ? mix(bg, "#ffffff", 0.07) : mix(bg, "#ffffff", 0.7),
    "--surface-2": dark ? mix(bg, "#ffffff", 0.13) : mix(bg, "#000000", 0.045),
    "--ink": ink,
    "--muted": mix(ink, bg, dark ? 0.3 : 0.38),
    "--line": dark ? mix(bg, "#ffffff", 0.2) : mix(bg, "#000000", 0.11),
    "--brand": brand,
    "--brand-ink": brandInk,
    "--brand-soft": mix(bg, brand, dark ? 0.24 : 0.14),
    "--accent": dark ? "#fb923c" : "#c2410c",
    "--accent-soft": dark ? mix(bg, "#fb923c", 0.2) : "#fde8d8",
    "--good": dark ? "#4ade80" : "#15803d",
    "--good-soft": dark ? mix(bg, "#4ade80", 0.18) : "#dcf5e4",
    "--bad": dark ? "#f87171" : "#b91c1c",
    "--bad-soft": dark ? mix(bg, "#f87171", 0.2) : "#fde2e2",
    "--warn-soft": dark ? "#382f0b" : "#fff3c9",
    "--warn-line": dark ? "#b99500" : "#e6b800",
    "--hl": dark ? "#4a4313" : "#fff0a8",
  };
}

export function applyVars(vars: Record<string, string> | null) {
  const root = document.documentElement;
  const names = ["color-scheme", "--bg", "--surface", "--surface-2", "--ink", "--muted", "--line", "--brand", "--brand-ink", "--brand-soft", "--accent", "--accent-soft", "--good", "--good-soft", "--bad", "--bad-soft", "--warn-soft", "--warn-line", "--hl"];
  for (const n of names) root.style.removeProperty(n);
  if (vars) for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
}

export function loadTheme(): ThemeSettings {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (!raw) return DEFAULT_THEME;
    const p = JSON.parse(raw);
    return { bg: isHex(p.bg) ? p.bg : null, accent: isHex(p.accent) ? p.accent : null };
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(s: ThemeSettings) {
  const dark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const vars = computeVars(s, dark);
  applyVars(vars);
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(s));
    if (vars) localStorage.setItem(THEME_VARS_KEY, JSON.stringify(vars));
    else localStorage.removeItem(THEME_VARS_KEY);
  } catch {
    /* storage unavailable: the colors still apply for this visit */
  }
}

/** Runs before the page paints so a saved theme never flashes the default colors. */
export const THEME_BOOT_SCRIPT = `try{var v=JSON.parse(localStorage.getItem("${THEME_VARS_KEY}")||"null");if(v){var r=document.documentElement;for(var k in v){r.style.setProperty(k,v[k])}}}catch(e){}`;
