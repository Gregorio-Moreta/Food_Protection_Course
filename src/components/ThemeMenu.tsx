"use client";
import { useEffect, useRef, useState } from "react";
import { ACCENT_PRESETS, BG_PRESETS, DEFAULT_THEME, loadTheme, saveTheme, type ThemeSettings } from "@/lib/theme";
import { PaletteIcon } from "./Icons";

function Swatch({ color, label, selected, onPick }: { color: string; label: string; selected: boolean; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      title={label}
      aria-label={label}
      aria-pressed={selected}
      className={`h-8 w-8 rounded-full border border-line ${selected ? "ring-2 ring-brand ring-offset-2 ring-offset-surface" : "hover:scale-110"} transition`}
      style={{ background: color }}
    />
  );
}

function CustomPicker({ label, value, fallback, onChange }: { label: string; value: string | null; fallback: string; onChange: (v: string) => void }) {
  return (
    <label className="mt-3 flex items-center gap-3 text-sm text-muted">
      <input
        type="color"
        value={value ?? fallback}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-12 cursor-pointer rounded border border-line bg-transparent p-0.5"
        aria-label={label}
      />
      {label}
    </label>
  );
}

export function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(loadTheme());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function update(next: ThemeSettings) {
    setTheme(next);
    saveTheme(next);
  }

  return (
    <div className="relative" ref={box}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="ml-1 flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 hover:bg-surface2"
        aria-label="Page colors"
        aria-expanded={open}
      >
        <PaletteIcon width={16} height={16} />
        <span className="hidden sm:inline">Colors</span>
      </button>
      {open && (
        <div role="dialog" aria-label="Page colors" className="absolute right-0 top-full z-40 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-line bg-surface p-4 font-normal text-ink shadow-xl">
          <h2 className="font-display text-base font-semibold">Page colors</h2>

          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">Background</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {BG_PRESETS.map((p) => (
              <Swatch key={p.value} color={p.value} label={p.name} selected={theme.bg === p.value} onPick={() => update({ ...theme, bg: p.value })} />
            ))}
          </div>
          <CustomPicker label="Custom background" value={theme.bg} fallback="#f7f5f0" onChange={(v) => update({ ...theme, bg: v })} />

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">Accent</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ACCENT_PRESETS.map((p) => (
              <Swatch key={p.value} color={p.value} label={p.name} selected={theme.accent === p.value} onPick={() => update({ ...theme, accent: p.value })} />
            ))}
          </div>
          <CustomPicker label="Custom accent" value={theme.accent} fallback="#0f766e" onChange={(v) => update({ ...theme, accent: v })} />

          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="text-xs text-muted">Saved on this device</span>
            <button onClick={() => update(DEFAULT_THEME)} className="rounded-full border border-line px-3 py-1 text-sm font-semibold hover:bg-surface2">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
