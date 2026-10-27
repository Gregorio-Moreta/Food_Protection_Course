"use client";
import type { Block } from "@/data/types";
import { useSpeech } from "@/lib/use-speech";

const calloutStyle: Record<string, { box: string; label: string }> = {
  rule: { box: "border-brand bg-brandsoft", label: "text-brand" },
  tip: { box: "border-good bg-goodsoft", label: "text-good" },
  warn: { box: "border-bad bg-badsoft", label: "text-bad" },
  mnemonic: { box: "border-accent bg-accentsoft", label: "text-accent" },
  exam: { box: "border-warnline bg-warnsoft", label: "text-ink" },
};

export function BlockView({ block, prefix }: { block: Block; prefix: string }) {
  const { unitId } = useSpeech();
  const hl = (id: string) => (unitId === id ? "speaking" : "");

  switch (block.t) {
    case "p":
      return (
        <p data-unit={prefix} className={`leading-8 text-[1.05rem] ${hl(prefix)}`}>
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((it, i) => (
            <li key={i} data-unit={`${prefix}-${i}`} className={`flex gap-3 leading-7 ${hl(`${prefix}-${i}`)}`}>
              <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5">
          {block.items.map((it, i) => (
            <li key={i} data-unit={`${prefix}-${i}`} className={`flex gap-3 leading-7 ${hl(`${prefix}-${i}`)}`}>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brandink">
                {i + 1}
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ol>
      );
    case "callout": {
      const s = calloutStyle[block.kind];
      return (
        <div data-unit={prefix} className={`rounded-xl border-l-4 px-5 py-4 ${s.box} ${hl(prefix)}`}>
          {block.title && <div className={`mb-1 text-xs font-bold uppercase tracking-wider ${s.label}`}>{block.title}</div>}
          <div className="leading-7">{block.text}</div>
        </div>
      );
    }
    case "facts":
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          {block.items.map((f, i) => (
            <div
              key={i}
              data-unit={`${prefix}-${i}`}
              className={`rounded-xl border border-line bg-surface px-4 py-3 ${hl(`${prefix}-${i}`)}`}
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">{f.label}</div>
              <div className="font-display mt-1 text-xl font-semibold text-brand">{f.value}</div>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[34rem] text-left text-[0.95rem]">
            <thead>
              <tr className="bg-surface2 text-xs uppercase tracking-wide text-muted">
                {block.head.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, ri) => (
                <tr key={ri} data-unit={`${prefix}-${ri}`} className={`border-t border-line align-top ${hl(`${prefix}-${ri}`)}`}>
                  {r.map((c, ci) => (
                    <td key={ci} className={`px-4 py-3 leading-6 ${ci === 0 ? "font-semibold" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && <div className="border-t border-line px-4 py-2 text-xs text-muted">{block.caption}</div>}
        </div>
      );
  }
}
