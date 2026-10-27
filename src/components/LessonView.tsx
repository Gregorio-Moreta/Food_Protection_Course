"use client";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import type { Lesson } from "@/data/types";
import { BlockView } from "./Blocks";
import { lessonUnits, sectionUnits } from "@/lib/speak-text";
import { speech } from "@/lib/speech";
import { useSpeech } from "@/lib/use-speech";
import { useProgress, toggleRead } from "@/lib/progress";
import { CheckIcon, ListIcon, SpeakerIcon } from "./Icons";
import { lessons } from "@/data/lessons";

export function LessonView({ lesson, total }: { lesson: Lesson; total: number }) {
  const st = useSpeech();
  const pr = useProgress();
  const isRead = pr.read.includes(lesson.n);
  const allUnits = useMemo(() => lessonUnits(lesson), [lesson]);

  // keep the spoken passage in view
  useEffect(() => {
    if (!st.unitId) return;
    const el = document.querySelector(`[data-unit="${CSS.escape(st.unitId)}"]`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [st.unitId]);

  const listenAll = () => speech.play(allUnits, `Lesson ${lesson.n}. ${lesson.title}`);
  const listenFrom = (idx: number) => {
    const s = lesson.sections[idx];
    const units = lesson.sections.slice(idx).flatMap((x) => sectionUnits(x));
    speech.play(units, `${s.title}`);
  };

  const prev = lessons.find((l) => l.n === lesson.n - 1);
  const next = lessons.find((l) => l.n === lesson.n + 1);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 lg:grid-cols-[16rem_1fr]">
      <aside className="no-print lg:sticky lg:top-20 lg:self-start">
        <Link href="/" className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand">
          <ListIcon width={16} height={16} /> All lessons
        </Link>
        <label className="sr-only" htmlFor="jump">Jump to lesson</label>
        <select
          id="jump"
          value={lesson.n}
          onChange={(e) => (window.location.href = `/lesson/${e.target.value}`)}
          className="mb-4 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold"
        >
          {lessons.map((l) => (
            <option key={l.n} value={l.n}>
              {l.n}. {l.title}
            </option>
          ))}
        </select>
        <nav aria-label="Sections" className="hidden max-h-[60vh] overflow-y-auto rounded-xl border border-line bg-surface p-2 text-sm lg:block">
          <div className="px-2 pb-1 pt-1 text-xs font-bold uppercase tracking-wider text-muted">In this lesson</div>
          {lesson.sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="block rounded-lg px-2 py-1.5 hover:bg-brandsoft hover:text-brand">
              <span className="mr-1.5 text-muted">{i + 1}.</span>
              {s.title}
            </a>
          ))}
          <a href="#quiz" className="mt-1 block rounded-lg px-2 py-1.5 font-semibold text-brand hover:bg-brandsoft">
            Mini quiz
          </a>
        </nav>
      </aside>

      <article className="min-w-0 pb-10">
        <div className="text-sm font-bold uppercase tracking-widest text-brand">Lesson {lesson.n} of {total}</div>
        <h1 className="font-display mt-1 text-4xl font-semibold leading-tight">{lesson.title}</h1>
        <p className="mt-3 text-lg text-muted">{lesson.blurb}</p>

        <div className="no-print mt-5 flex flex-wrap gap-3">
          <button onClick={listenAll} className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-semibold text-brandink hover:opacity-90">
            <SpeakerIcon width={18} height={18} /> Listen to whole lesson
          </button>
          <Link href={`/lesson/${lesson.n}/quiz`} className="rounded-full border border-brand px-5 py-2.5 font-semibold text-brand hover:bg-brandsoft">
            Take the mini quiz
          </Link>
          <button onClick={() => toggleRead(lesson.n)} className={`flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold ${isRead ? "border-good bg-goodsoft text-good" : "border-line hover:bg-surface2"}`}>
            <CheckIcon width={18} height={18} /> {isRead ? "Marked as read" : "Mark as read"}
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-lg font-semibold">Key points</h2>
          <ul className="mt-2 space-y-1.5">
            {lesson.keyPoints.map((k, i) => (
              <li key={i} className="flex gap-3 leading-7">
                <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {k}
              </li>
            ))}
          </ul>
        </div>

        {lesson.sections.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt mt-12">
            <div className="flex flex-wrap items-center gap-3 border-b border-line pb-2">
              <h2 data-unit={`${s.id}-title`} className={`font-display text-2xl font-semibold ${st.unitId === `${s.id}-title` ? "speaking" : ""}`}>
                <span className="mr-2 text-brand">{i + 1}.</span>
                {s.title}
              </h2>
              <button
                onClick={() => listenFrom(i)}
                className="no-print ml-auto flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-sm font-semibold hover:bg-brandsoft hover:text-brand"
                aria-label={`Listen from ${s.title}`}
              >
                <SpeakerIcon width={15} height={15} /> Listen from here
              </button>
            </div>
            <div className="mt-5 space-y-5">
              {s.blocks.map((b, bi) => (
                <BlockView key={bi} block={b} prefix={`${s.id}-b${bi}`} />
              ))}
            </div>
          </section>
        ))}

        <section id="quiz" className="scroll-mt no-print mt-14 rounded-3xl bg-brandsoft p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">Ready for the Lesson {lesson.n} quiz?</h2>
          <p className="mx-auto mt-2 max-w-md text-muted">{lesson.quiz.length} questions with an explanation after each one. Aim for a perfect score before you move on.</p>
          <Link href={`/lesson/${lesson.n}/quiz`} className="mt-5 inline-block rounded-full bg-brand px-8 py-3 font-semibold text-brandink hover:opacity-90">
            Start mini quiz
          </Link>
        </section>

        <div className="no-print mt-8 flex justify-between gap-4">
          {prev ? (
            <Link href={`/lesson/${prev.n}`} className="rounded-xl border border-line px-4 py-3 text-sm hover:bg-surface2">
              <div className="text-xs text-muted">Previous</div>
              <div className="font-semibold">Lesson {prev.n}. {prev.title}</div>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/lesson/${next.n}`} className="rounded-xl border border-line px-4 py-3 text-right text-sm hover:bg-surface2">
              <div className="text-xs text-muted">Next</div>
              <div className="font-semibold">Lesson {next.n}. {next.title}</div>
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
