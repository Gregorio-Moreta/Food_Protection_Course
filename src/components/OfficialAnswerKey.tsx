"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { officialQuizzes, OFFICIAL_CAPTURED } from "@/data/official";
import { CheckIcon } from "./Icons";

const letter = (i: number) => String.fromCharCode(65 + i);

/** Every official lesson quiz with its official answers, laid out like the official review pages. */
export function OfficialAnswerKey() {
  const [lesson, setLesson] = useState<number | "all">("all");
  const [hide, setHide] = useState(false);
  const [shown, setShown] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return officialQuizzes
      .filter((q) => lesson === "all" || q.n === lesson)
      .map((q) => ({
        ...q,
        questions: term
          ? q.questions.filter((x) => (x.q + " " + x.options.join(" ") + " " + x.why).toLowerCase().includes(term))
          : q.questions,
      }))
      .filter((q) => q.questions.length > 0);
  }, [lesson, query]);

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside className="no-print lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border border-line bg-surface p-3 text-sm">
          <label htmlFor="lesson-filter" className="text-xs font-bold uppercase tracking-wider text-muted">
            Show
          </label>
          <select
            id="lesson-filter"
            value={lesson}
            onChange={(e) => setLesson(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-semibold"
          >
            <option value="all">All 15 lessons</option>
            {officialQuizzes.map((q) => (
              <option key={q.n} value={q.n}>
                Lesson {q.n}. {q.title}
              </option>
            ))}
          </select>
          <label htmlFor="key-search" className="mt-3 block text-xs font-bold uppercase tracking-wider text-muted">
            Search
          </label>
          <input
            id="key-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="For example 158 or shellfish"
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2"
          />
          <label className="mt-3 flex cursor-pointer items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={hide}
              onChange={(e) => {
                setHide(e.target.checked);
                setShown({});
              }}
            />
            Hide answers (flashcard mode)
          </label>
        </div>
        <nav aria-label="Lessons" className="mt-3 hidden max-h-[50vh] overflow-y-auto rounded-xl border border-line bg-surface p-2 text-sm lg:block">
          {officialQuizzes.map((q) => (
            <a
              key={q.n}
              href={`#lesson-${q.n}`}
              onClick={() => setLesson("all")}
              className="block rounded-lg px-2 py-1.5 hover:bg-accentsoft hover:text-accent"
            >
              <span className="mr-1.5 text-muted">{q.n}.</span>
              {q.title}
            </a>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 space-y-12">
        {visible.length === 0 && <p className="text-muted">No official questions match that search.</p>}
        {visible.map((quiz) => {
          let lastStem: string | undefined;
          return (
            <section key={quiz.n} id={`lesson-${quiz.n}`} className="scroll-mt">
              <div className="flex flex-wrap items-center gap-3 border-b border-line pb-2">
                <h2 className="font-display text-2xl font-semibold">
                  <span className="mr-2 text-accent">Lesson {quiz.n}</span>
                  {quiz.title}
                </h2>
                <Link
                  href={`/official/${quiz.n}`}
                  className="no-print ml-auto rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-bg hover:opacity-90"
                >
                  Take this quiz
                </Link>
              </div>
              <p className="mt-2 text-xs text-muted">
                Official source: {quiz.reviewPage}, captured {OFFICIAL_CAPTURED}
              </p>
              <ol className="mt-4 space-y-3">
                {quiz.questions.map((x) => {
                  const id = `${quiz.n}-${x.num}`;
                  const showStem = x.stem && x.stem !== lastStem;
                  lastStem = x.stem;
                  const reveal = !hide || shown[id];
                  return (
                    <li key={id}>
                      {showStem && <div className="mb-2 mt-5 font-semibold">{x.stem}</div>}
                      <div className="rounded-2xl border border-line bg-surface p-5">
                        <div className="flex gap-3">
                          <span className="font-display font-semibold text-accent">{x.num}.</span>
                          <div className="min-w-0 flex-1">
                            <div className="whitespace-pre-line font-semibold leading-7">{x.prompt}</div>
                            <ul className="mt-3 space-y-1.5">
                              {x.options.map((o, oi) => {
                                const right = reveal && oi === x.answer;
                                return (
                                  <li
                                    key={oi}
                                    className={`flex items-start gap-2 rounded-lg px-3 py-1.5 leading-6 ${right ? "bg-goodsoft font-semibold text-good" : ""}`}
                                  >
                                    <span className="w-5 shrink-0">{letter(oi)}.</span>
                                    <span className="flex-1">{o}</span>
                                    {right && <CheckIcon width={18} height={18} className="mt-0.5 shrink-0" />}
                                  </li>
                                );
                              })}
                            </ul>
                            {reveal ? (
                              <div className="mt-3 rounded-xl bg-surface2 px-4 py-3 text-sm leading-6">
                                <span className="font-bold text-good">
                                  Official answer: {letter(x.answer)}. {x.options[x.answer]}
                                </span>
                                <span className="mt-1 block text-muted">
                                  <span className="font-semibold">Our note:</span> {x.why}
                                </span>
                              </div>
                            ) : (
                              <button
                                onClick={() => setShown((s) => ({ ...s, [id]: true }))}
                                className="mt-3 rounded-full border border-accent px-4 py-1.5 text-sm font-semibold text-accent hover:bg-accentsoft"
                              >
                                Show answer
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
