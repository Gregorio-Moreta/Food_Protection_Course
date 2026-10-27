"use client";
import Link from "next/link";
import { useState } from "react";
import type { Lesson } from "@/data/types";
import type { Module } from "@/data/lessons";
import { useProgress, resetProgress } from "@/lib/progress";
import { CheckIcon } from "./Icons";

export function Toc({ modules, lessons }: { modules: Module[]; lessons: Lesson[] }) {
  const pr = useProgress();
  const [open, setOpen] = useState<number | null>(null);
  const done = pr.read.length;
  const quizzed = Object.keys(pr.quiz).length;

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold">Table of contents</h2>
          <p className="mt-1 text-muted">
            {done} of {lessons.length} lessons read, {quizzed} mini quizzes taken
          </p>
        </div>
        <button onClick={() => confirm("Clear all saved progress on this device?") && resetProgress()} className="text-xs text-muted underline">
          Reset progress
        </button>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface2">
        <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${(done / lessons.length) * 100}%` }} />
      </div>

      <div className="mt-8 space-y-10">
        {modules.map((m, mi) => (
          <div key={m.id}>
            <div className="mb-3">
              <div className="text-xs font-bold uppercase tracking-widest text-brand">Module {mi + 1}</div>
              <h3 className="font-display text-2xl font-semibold">{m.title}</h3>
              <p className="text-sm text-muted">{m.blurb}</p>
            </div>
            <ul className="space-y-3">
              {m.lessons.map((n) => {
                const l = lessons.find((x) => x.n === n)!;
                const isRead = pr.read.includes(n);
                const q = pr.quiz[n];
                return (
                  <li key={n} className="rounded-2xl border border-line bg-surface">
                    <div className="flex flex-wrap items-center gap-4 p-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold ${isRead ? "bg-good text-white" : "bg-brandsoft text-brand"}`}>
                        {isRead ? <CheckIcon /> : n}
                      </div>
                      <div className="min-w-0 flex-1 basis-60">
                        <Link href={`/lesson/${n}`} className="font-display text-lg font-semibold hover:text-brand">
                          Lesson {n}. {l.title}
                        </Link>
                        <p className="text-sm text-muted">{l.blurb}</p>
                        <div className="mt-1 text-xs text-muted">
                          {l.sections.length} sections, about {l.minutes} min, {l.quiz.length} quiz questions
                          {q && (
                            <span className={`ml-2 font-semibold ${q.best === q.total ? "text-good" : "text-accent"}`}>
                              Best quiz: {q.best}/{q.total}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setOpen(open === n ? null : n)} className="rounded-full border border-line px-3 py-1.5 text-sm hover:bg-surface2">
                          {open === n ? "Hide" : "Sections"}
                        </button>
                        <Link href={`/lesson/${n}`} className="rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-brandink hover:opacity-90">
                          Lesson
                        </Link>
                        <Link href={`/lesson/${n}/quiz`} className="rounded-full border border-brand px-4 py-1.5 text-sm font-semibold text-brand hover:bg-brandsoft">
                          Mini quiz
                        </Link>
                      </div>
                    </div>
                    {open === n && (
                      <ol className="grid gap-x-6 gap-y-1 border-t border-line px-6 py-4 text-sm sm:grid-cols-2">
                        {l.sections.map((s, i) => (
                          <li key={s.id}>
                            <Link href={`/lesson/${n}#${s.id}`} className="block rounded px-2 py-1 hover:bg-brandsoft hover:text-brand">
                              <span className="mr-2 text-muted">{i + 1}.</span>
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
