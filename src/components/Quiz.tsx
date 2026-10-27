"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Question } from "@/data/types";
import { recordExam, recordQuiz, markRead } from "@/lib/progress";
import { CheckIcon, XIcon } from "./Icons";

type Shuffled = { q: string; options: string[]; answer: number; why: string; key: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prepare(qs: Question[], shuffleQuestions: boolean): Shuffled[] {
  const base = qs.map((q, i) => {
    const order = shuffle(q.options.map((_, idx) => idx));
    return { q: q.q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer), why: q.why, key: `${i}-${q.q}` };
  });
  return shuffleQuestions ? shuffle(base) : base;
}

export function Quiz({
  title,
  subtitle,
  questions,
  lessonN,
  backHref,
  nextHref,
  nextLabel,
  exam,
  limitMinutes,
  passPercent = 100,
  sampleSize,
}: {
  title: string;
  subtitle?: string;
  questions: Question[];
  lessonN?: number;
  backHref: string;
  nextHref?: string;
  nextLabel?: string;
  exam?: boolean;
  limitMinutes?: number;
  passPercent?: number;
  sampleSize?: number;
}) {
  const [run, setRun] = useState<Shuffled[] | null>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<(number | null)[]>([]);
  const [done, setDone] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const saved = useRef(false);

  const start = (qs: Question[] | Shuffled[] = questions, fresh = true) => {
    const full = prepare(qs as Question[], true);
    const prepared = sampleSize && qs === questions ? full.slice(0, sampleSize) : full;
    setRun(prepared);
    setI(0);
    setPicked(prepared.map(() => null));
    setDone(false);
    saved.current = false;
    setSecondsLeft((limitMinutes ?? 0) * 60);
  };

  const finish = () => setDone(true);

  // countdown for timed exams
  useEffect(() => {
    if (!run || done || !limitMinutes) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          setDone(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [run, done, limitMinutes]);

  const score = useMemo(() => (run ? run.reduce((a, q, k) => a + (picked[k] === q.answer ? 1 : 0), 0) : 0), [run, picked]);

  useEffect(() => {
    if (!done || !run || saved.current) return;
    saved.current = true;
    if (exam) recordExam(score, run.length);
    else if (lessonN) {
      recordQuiz(lessonN, score, run.length);
      if (score === run.length) markRead(lessonN);
    }
  }, [done, run, score, exam, lessonN]);

  if (!run) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <Link href={backHref} className="text-sm font-semibold text-brand">
          Back
        </Link>
        <h1 className="font-display mt-3 text-4xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-1 text-lg text-muted">{subtitle}</p>}
        <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
          <ul className="space-y-2 leading-7">
            <li>{sampleSize ?? questions.length} multiple choice questions, shuffled each time.</li>
            {exam ? (
              <>
                <li>{limitMinutes} minute time limit. Answers and explanations appear at the end, like the real exam.</li>
                <li>You need {passPercent} percent or higher to pass.</li>
              </>
            ) : (
              <>
                <li>You see whether you were right, plus an explanation, after every question.</li>
                <li>Aim for a perfect score before moving on. You can retake it as often as you like.</li>
              </>
            )}
          </ul>
          <button onClick={() => start()} className="mt-6 rounded-full bg-brand px-8 py-3 font-semibold text-brandink hover:opacity-90">
            {exam ? "Begin exam" : "Start quiz"}
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    const total = run.length;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= passPercent;
    const missed = run.map((q, k) => ({ q, k })).filter(({ q, k }) => picked[k] !== q.answer);
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className={`rounded-3xl p-8 text-center ${passed ? "bg-goodsoft" : "bg-accentsoft"}`}>
          <div className="text-sm font-bold uppercase tracking-widest text-muted">{title}</div>
          <div className="font-display mt-2 text-6xl font-semibold">
            {score}
            <span className="text-3xl text-muted"> / {total}</span>
          </div>
          <div className="mt-1 text-xl font-semibold">{pct} percent</div>
          <p className="mt-3 text-lg">
            {exam
              ? passed
                ? "You would pass. Keep reviewing anything you missed."
                : `The pass mark is ${passPercent} percent. Review the lessons below and try again.`
              : passed
                ? "Perfect. This lesson is mastered."
                : "Review the explanations below, then retake to lock it in."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => start()} className="rounded-full bg-brand px-6 py-2.5 font-semibold text-brandink hover:opacity-90">
              Retake all
            </button>
            {missed.length > 0 && (
              <button
                onClick={() => start(missed.map(({ q }) => ({ q: q.q, options: q.options, answer: q.answer, why: q.why })) as Question[], true)}
                className="rounded-full border border-brand px-6 py-2.5 font-semibold text-brand hover:bg-white/40"
              >
                Retry only missed ({missed.length})
              </button>
            )}
            <Link href={backHref} className="rounded-full border border-line px-6 py-2.5 font-semibold hover:bg-white/40">
              Review lesson
            </Link>
            {nextHref && (
              <Link href={nextHref} className="rounded-full border border-line px-6 py-2.5 font-semibold hover:bg-white/40">
                {nextLabel ?? "Next"}
              </Link>
            )}
          </div>
        </div>

        {missed.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-2xl font-semibold">What to review</h2>
            <ol className="mt-4 space-y-4">
              {missed.map(({ q, k }) => (
                <li key={q.key} className="rounded-2xl border border-line bg-surface p-5">
                  <div className="font-semibold leading-7">{q.q}</div>
                  <div className="mt-2 text-sm text-bad">Your answer: {picked[k] == null ? "No answer" : q.options[picked[k]!]}</div>
                  <div className="text-sm font-semibold text-good">Correct: {q.options[q.answer]}</div>
                  <p className="mt-2 text-sm text-muted">{q.why}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }

  const cur = run[i];
  const chosen = picked[i];
  const revealed = !exam && chosen != null;
  const mm = Math.floor(secondsLeft / 60);
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const answeredCount = picked.filter((p) => p != null).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between text-sm">
        <Link href={backHref} className="font-semibold text-brand">
          Exit
        </Link>
        <div className="font-semibold text-muted">
          Question {i + 1} of {run.length}
        </div>
        {limitMinutes ? (
          <div className={`font-mono font-bold ${secondsLeft < 300 ? "text-bad" : ""}`}>
            {mm}:{ss}
          </div>
        ) : (
          <div className="font-semibold text-good">{score} correct</div>
        )}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface2">
        <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${((i + (revealed ? 1 : 0)) / run.length) * 100}%` }} />
      </div>

      <h1 className="font-display mt-8 text-2xl font-semibold leading-snug">{cur.q}</h1>

      <div className="mt-6 space-y-3" role="radiogroup" aria-label="Answers">
        {cur.options.map((o, oi) => {
          const isChosen = chosen === oi;
          const isRight = oi === cur.answer;
          let style = "border-line bg-surface hover:border-brand hover:bg-brandsoft";
          if (exam && isChosen) style = "border-brand bg-brandsoft";
          if (revealed) {
            if (isRight) style = "border-good bg-goodsoft";
            else if (isChosen) style = "border-bad bg-badsoft";
            else style = "border-line bg-surface opacity-60";
          }
          return (
            <button
              key={oi}
              role="radio"
              aria-checked={isChosen}
              disabled={revealed}
              onClick={() => setPicked((p) => p.map((v, k) => (k === i ? oi : v)))}
              className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left leading-6 transition ${style}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                {revealed && isRight ? <CheckIcon width={14} height={14} /> : revealed && isChosen ? <XIcon width={14} height={14} /> : String.fromCharCode(65 + oi)}
              </span>
              <span>{o}</span>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className={`mt-5 rounded-xl p-4 ${chosen === cur.answer ? "bg-goodsoft" : "bg-badsoft"}`}>
          <div className="font-bold">{chosen === cur.answer ? "Correct" : "Not quite"}</div>
          <p className="mt-1 leading-7">{cur.why}</p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        {exam ? (
          <button disabled={i === 0} onClick={() => setI(i - 1)} className="rounded-full border border-line px-5 py-2.5 font-semibold disabled:opacity-40">
            Previous
          </button>
        ) : (
          <span />
        )}
        {i < run.length - 1 ? (
          <button
            disabled={chosen == null && !exam}
            onClick={() => setI(i + 1)}
            className="rounded-full bg-brand px-8 py-2.5 font-semibold text-brandink hover:opacity-90 disabled:opacity-40"
          >
            Next
          </button>
        ) : (
          <button
            disabled={chosen == null && !exam}
            onClick={() => {
              if (exam && answeredCount < run.length && !confirm(`${run.length - answeredCount} questions are unanswered. Submit anyway?`)) return;
              finish();
            }}
            className="rounded-full bg-brand px-8 py-2.5 font-semibold text-brandink hover:opacity-90 disabled:opacity-40"
          >
            {exam ? "Submit exam" : "See results"}
          </button>
        )}
      </div>
    </div>
  );
}
