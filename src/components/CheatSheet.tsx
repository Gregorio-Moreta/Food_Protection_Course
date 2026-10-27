"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cheatSections } from "@/data/cheatsheet";
import { modules, lessons } from "@/data/lessons";

const BIG = [
  ["41°F", "Cold holding"],
  ["140°F", "Hot holding"],
  ["165°F", "Poultry, reheating"],
  ["158°F", "Ground meat"],
  ["150°F", "Pork"],
  ["145°F", "Shell eggs"],
  ["0°F", "Frozen"],
  ["38°F", "Smoked fish"],
  ["2 + 4 h", "Cooling 140 to 70 to 41"],
  ["20 sec", "Hand washing"],
  ["50 ppm", "Dish sanitizer"],
  ["6 in", "Off the floor"],
];

const MNEMONICS = [
  ["FATTOM", "Food, Acidity, Temperature, Time, Oxygen, Moisture: the six conditions for bacterial growth."],
  ["Food Problems Will Send The EMS", "Fish, Peanuts, Wheat, Soy, Tree nuts, Eggs, Milk, Shellfish: the eight major allergens."],
  ["FIFO", "First In, First Out: date food and use the oldest first."],
  ["165, 158, 150, 145, 140", "Poultry, ground meat, pork, eggs, everything else."],
  ["Starve, Build out, Destroy", "The three principles of Integrated Pest Management."],
  ["Air GAP in, Air BREAK out", "Gap protects incoming clean water. Break protects equipment from waste."],
  ["H C L M C V R", "HACCP: Hazards, CCPs, Limits, Monitor, Correct, Verify, Records."],
  ["A 0 to 13, B 14 to 27, C 28 plus", "Inspection grade point ranges."],
];

export function CheatSheet() {
  const [mod, setMod] = useState<string>("all");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return cheatSections
      .filter((s) => mod === "all" || s.module === mod)
      .map((s) => ({
        ...s,
        rows: needle ? s.rows.filter((r) => `${s.title} ${r.label} ${r.value} ${r.note ?? ""}`.toLowerCase().includes(needle)) : s.rows,
      }))
      .filter((s) => s.rows.length > 0);
  }, [mod, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <div className="no-print flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-semibold">Cheat sheet</h1>
          <p className="mt-1 text-muted">Every number and rule that matters, organised by module. Use the total view or focus on one module.</p>
        </div>
        <button onClick={() => window.print()} className="rounded-full border border-line px-5 py-2 text-sm font-semibold hover:bg-surface2">
          Print or save as PDF
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {BIG.map(([big, label]) => (
          <div key={label} className="rounded-xl border border-line bg-surface px-3 py-3 text-center print-break">
            <div className="font-display text-2xl font-semibold text-brand">{big}</div>
            <div className="text-xs text-muted">{label}</div>
          </div>
        ))}
      </div>

      <div className="no-print mt-8 flex flex-wrap items-center gap-2">
        <button onClick={() => setMod("all")} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${mod === "all" ? "bg-brand text-brandink" : "border border-line hover:bg-surface2"}`}>
          Total view
        </button>
        {modules.map((m, i) => (
          <button key={m.id} onClick={() => setMod(m.id)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${mod === m.id ? "bg-brand text-brandink" : "border border-line hover:bg-surface2"}`}>
            Module {i + 1}: {m.title}
          </button>
        ))}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the cheat sheet"
          aria-label="Search the cheat sheet"
          className="ml-auto w-full rounded-full border border-line bg-surface px-4 py-2 text-sm sm:w-64"
        />
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[15rem_1fr]">
        <nav aria-label="Cheat sheet contents" className="no-print lg:sticky lg:top-20 lg:max-h-[75vh] lg:self-start lg:overflow-y-auto">
          <div className="rounded-xl border border-line bg-surface p-2 text-sm">
            <div className="px-2 pb-1 pt-1 text-xs font-bold uppercase tracking-wider text-muted">Contents</div>
            {shown.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block rounded-lg px-2 py-1.5 hover:bg-brandsoft hover:text-brand">
                {s.title}
              </a>
            ))}
            <a href="#memory" className="block rounded-lg px-2 py-1.5 font-semibold text-accent hover:bg-accentsoft">
              Memory aids
            </a>
          </div>
        </nav>

        <div className="space-y-8">
          {modules
            .filter((m) => mod === "all" || m.id === mod)
            .map((m, mi) => {
              const secs = shown.filter((s) => s.module === m.id);
              if (secs.length === 0) return null;
              return (
                <section key={m.id}>
                  <div className="mb-3 text-xs font-bold uppercase tracking-widest text-brand">
                    Module {modules.indexOf(m) + 1}: {m.title}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {secs.map((s) => (
                      <div key={s.id} id={s.id} className="scroll-mt print-break rounded-2xl border border-line bg-surface">
                        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                          <h2 className="font-display text-lg font-semibold">{s.title}</h2>
                          <Link href={`/lesson/${s.lesson}`} className="no-print rounded-full bg-brandsoft px-2.5 py-0.5 text-xs font-semibold text-brand hover:opacity-80">
                            Lesson {s.lesson}
                          </Link>
                        </div>
                        <dl className="divide-y divide-line">
                          {s.rows.map((r) => (
                            <div key={r.label} className="flex gap-3 px-4 py-2 text-sm">
                              <dt className="w-2/5 shrink-0 text-muted">{r.label}</dt>
                              <dd className="font-semibold">
                                {r.value}
                                {r.note && <div className="text-xs font-normal text-accent">{r.note}</div>}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

          {(mod === "all" || true) && !q && (
            <section id="memory" className="scroll-mt print-break rounded-2xl bg-accentsoft p-6">
              <h2 className="font-display text-2xl font-semibold">Memory aids</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {MNEMONICS.map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-bold text-accent">{k}</dt>
                    <dd className="text-sm leading-6">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="print-break rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-display text-2xl font-semibold">Illness quick reference</h2>
            <p className="mt-1 text-sm text-muted">From Lesson 7. Match the organism to its trigger food and its control.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-muted">
                  <tr><th className="py-2 pr-3">Illness</th><th className="pr-3">Onset</th><th className="pr-3">Type</th><th>Key food and control</th></tr>
                </thead>
                <tbody>
                  {(lessons[6].sections.find((s) => s.id === "master-table")!.blocks[0] as { t: "table"; rows: string[][] }).rows.map((r) => (
                    <tr key={r[0]} className="border-t border-line align-top">
                      <td className="py-2 pr-3 font-semibold">{r[0]}</td>
                      <td className="pr-3">{r[1]}</td>
                      <td className="pr-3">{r[2]}</td>
                      <td>{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
