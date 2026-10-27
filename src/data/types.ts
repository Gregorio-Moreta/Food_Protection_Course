export type Block =
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "callout"; kind: "rule" | "tip" | "warn" | "mnemonic" | "exam"; title?: string; text: string }
  | { t: "table"; head: string[]; rows: string[][]; caption?: string }
  | { t: "facts"; items: { label: string; value: string }[] };

export type Section = { id: string; title: string; blocks: Block[] };

export type Question = {
  q: string;
  options: string[];
  answer: number;
  why: string;
};

export type Lesson = {
  n: number;
  title: string;
  blurb: string;
  minutes: number;
  keyPoints: string[];
  sections: Section[];
  quiz: Question[];
};

export const p = (text: string): Block => ({ t: "p", text });
export const ul = (...items: string[]): Block => ({ t: "ul", items });
export const ol = (...items: string[]): Block => ({ t: "ol", items });
export const rule = (text: string, title = "Rule to know"): Block => ({ t: "callout", kind: "rule", title, text });
export const tip = (text: string, title = "Tip"): Block => ({ t: "callout", kind: "tip", title, text });
export const warn = (text: string, title = "Watch out"): Block => ({ t: "callout", kind: "warn", title, text });
export const mnemonic = (text: string, title = "Memory aid"): Block => ({ t: "callout", kind: "mnemonic", title, text });
export const exam = (text: string, title = "Likely on the exam"): Block => ({ t: "callout", kind: "exam", title, text });
export const table = (head: string[], rows: string[][], caption?: string): Block => ({ t: "table", head, rows, caption });
export const facts = (...items: [string, string][]): Block => ({
  t: "facts",
  items: items.map(([label, value]) => ({ label, value })),
});
export const sec = (id: string, title: string, ...blocks: Block[]): Section => ({ id, title, blocks });
export const q = (question: string, options: string[], answer: number, why: string): Question => ({
  q: question,
  options,
  answer,
  why,
});
