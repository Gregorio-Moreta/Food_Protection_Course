import type { Block, Section, Lesson } from "@/data/types";

export type Unit = { id: string; text: string };

const clean = (s: string) =>
  s
    .replace(/°F/g, " degrees Fahrenheit")
    .replace(/\bppm\b/gi, "parts per million")
    .replace(/\bPHF\b/g, "potentially hazardous food")
    .replace(/\bCCPs?\b/g, (m) => (m.endsWith("s") ? "critical control points" : "critical control point"))
    .replace(/\bFIFO\b/g, "F I F O")
    .replace(/\bHACCP\b/g, "hassip")
    .replace(/\bFATTOM\b/g, "fat tom")
    .replace(/\bUSDA\b/g, "U S D A")
    .replace(/\bDOHMH\b/g, "D O H M H")
    .replace(/\bNSF\b/g, "N S F")
    .replace(/\bOSHA\b/g, "OSHA")
    .replace(/\bpH\b/g, "P H")
    .replace(/\bMSG\b/g, "M S G")
    .replace(/\bE\. coli\b/g, "E coli")
    .replace(/\bvs\b/g, "versus")
    .replace(/(\d)\s*°/g, "$1 degrees")
    .replace(/\s+/g, " ")
    .trim();

export function blockToUnits(b: Block, prefix: string): Unit[] {
  switch (b.t) {
    case "p":
      return [{ id: prefix, text: clean(b.text) }];
    case "ul":
    case "ol":
      return b.items.map((it, i) => ({ id: `${prefix}-${i}`, text: clean(it) }));
    case "callout":
      return [{ id: prefix, text: clean(`${b.title ? b.title + ". " : ""}${b.text}`) }];
    case "facts":
      return b.items.map((f, i) => ({ id: `${prefix}-${i}`, text: clean(`${f.label}: ${f.value}.`) }));
    case "table":
      return b.rows.map((r, i) => {
        const parts = r.map((cell, ci) => {
          const h = b.head[ci];
          return h ? `${h}: ${cell}` : cell;
        });
        return { id: `${prefix}-${i}`, text: clean(parts.join(". ") + ".") };
      });
  }
}

export function sectionUnits(s: Section): Unit[] {
  const out: Unit[] = [{ id: `${s.id}-title`, text: clean(s.title) + "." }];
  s.blocks.forEach((b, i) => out.push(...blockToUnits(b, `${s.id}-b${i}`)));
  return out;
}

export function lessonUnits(l: Lesson): Unit[] {
  const out: Unit[] = [{ id: "lesson-title", text: clean(`Lesson ${l.n}. ${l.title}.`) }];
  l.sections.forEach((s) => out.push(...sectionUnits(s)));
  return out;
}

// Split a long unit into sentence chunks of limited length (browsers cut off long utterances).
export function chunkText(text: string, max = 220): string[] {
  const sentences = text.match(/[^.!?;:]+[.!?;:]*\s*/g) ?? [text];
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + s).length > max && cur) {
      out.push(cur.trim());
      cur = s;
    } else cur += s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.flatMap((c) => {
    if (c.length <= max * 1.6) return [c];
    const parts: string[] = [];
    let rest = c;
    while (rest.length > max * 1.6) {
      let cut = rest.lastIndexOf(",", max);
      if (cut < 40) cut = rest.lastIndexOf(" ", max);
      if (cut < 40) cut = max;
      parts.push(rest.slice(0, cut + 1).trim());
      rest = rest.slice(cut + 1);
    }
    if (rest.trim()) parts.push(rest.trim());
    return parts;
  });
}
