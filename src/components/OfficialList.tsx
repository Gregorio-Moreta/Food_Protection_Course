"use client";
import Link from "next/link";
import { officialQuizzes } from "@/data/official";
import { useProgress } from "@/lib/progress";
import { CheckIcon } from "./Icons";

/** Table of contents for the official lesson quizzes, with the best score saved on this device. */
export function OfficialList() {
  const pr = useProgress();
  const scores = pr.official ?? {};
  const perfect = officialQuizzes.filter((q) => {
    const s = scores[String(q.n)];
    return s && s.best === s.total;
  }).length;

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold">Official lesson quizzes</h2>
          <p className="mt-1 text-muted">
            {perfect} of {officialQuizzes.length} official quizzes passed with a perfect score on this device
          </p>
        </div>
      </div>
      <ul className="mt-6 space-y-3">
        {officialQuizzes.map((q) => {
          const s = scores[String(q.n)];
          const done = s && s.best === s.total;
          return (
            <li key={q.n} className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold ${done ? "bg-good text-white" : "bg-accentsoft text-accent"}`}>
                {done ? <CheckIcon /> : q.n}
              </div>
              <div className="min-w-0 flex-1 basis-60">
                <Link href={`/official/${q.n}`} className="font-display text-lg font-semibold hover:text-brand">
                  Lesson {q.n}. {q.title}
                </Link>
                <div className="mt-0.5 text-xs text-muted">
                  {q.questions.length} official questions
                  {s && (
                    <span className={`ml-2 font-semibold ${done ? "text-good" : "text-accent"}`}>
                      Best: {s.best}/{s.total}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/official/answers#lesson-${q.n}`} className="rounded-full border border-line px-3 py-1.5 text-sm hover:bg-surface2">
                  Answer key
                </Link>
                <Link href={`/lesson/${q.n}`} className="rounded-full border border-line px-3 py-1.5 text-sm hover:bg-surface2">
                  Our lesson
                </Link>
                <Link href={`/official/${q.n}`} className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-bg hover:opacity-90">
                  Official quiz
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
