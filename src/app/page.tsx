import Link from "next/link";
import { lessons, modules, totalQuestions } from "@/data/lessons";
import { Toc } from "@/components/Toc";
import { officialTotal } from "@/data/official";

export default function Home() {
  const minutes = lessons.reduce((a, l) => a + l.minutes, 0);
  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 pt-10">
      <section className="rounded-3xl bg-brand px-6 py-10 text-brandink sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest opacity-80">NYC Food Protection Course</p>
        <h1 className="font-display mt-2 text-4xl font-semibold leading-tight sm:text-5xl">Study every lesson, hear it read aloud, then quiz yourself.</h1>
        <p className="mt-4 max-w-2xl text-lg opacity-90">
          All {lessons.length} lessons rebuilt with the full detail: temperatures, times, laws and numbers. Natural voices that can slow right down, a mini quiz for every lesson, a complete cheat sheet and a timed practice final.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/lesson/1" className="rounded-full bg-white px-6 py-3 font-semibold text-[#0f5f59] hover:opacity-90">
            Start Lesson 1
          </Link>
          <Link href="/cheat-sheet" className="rounded-full border border-white/50 px-6 py-3 font-semibold hover:bg-white/10">
            Cheat sheet
          </Link>
          <Link href="/practice-exam" className="rounded-full border border-white/50 px-6 py-3 font-semibold hover:bg-white/10">
            Practice final exam
          </Link>
          <Link href="/official" className="rounded-full border border-white/50 px-6 py-3 font-semibold hover:bg-white/10">
            Official quiz questions
          </Link>
        </div>
        <dl className="mt-8 grid grid-cols-3 gap-4 text-center sm:max-w-md">
          <div><dt className="text-xs uppercase tracking-wide opacity-80">Lessons</dt><dd className="font-display text-3xl font-semibold">{lessons.length}</dd></div>
          <div><dt className="text-xs uppercase tracking-wide opacity-80">Quiz questions</dt><dd className="font-display text-3xl font-semibold">{totalQuestions()}</dd></div>
          <div><dt className="text-xs uppercase tracking-wide opacity-80">Study time</dt><dd className="font-display text-3xl font-semibold">{Math.round(minutes / 60)}h</dd></div>
        </dl>
      </section>

      <section className="mt-10 rounded-3xl border-2 border-accent bg-accentsoft p-6 sm:p-8">
        <div className="text-xs font-bold uppercase tracking-widest text-accent">New: official questions and answers</div>
        <h2 className="font-display mt-1 text-3xl font-semibold">The real lesson quizzes, word for word</h2>
        <p className="mt-2 max-w-3xl leading-7">
          All {officialTotal()} questions from the 15 lesson quizzes in the official NYC Health Department online course, with the official
          answers. They sit alongside everything else here: take them as mini quizzes, study the full answer key, or mix them into one timed
          test.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/official" className="rounded-full bg-accent px-6 py-3 font-semibold text-bg hover:opacity-90">
            Official quizzes
          </Link>
          <Link href="/official/answers" className="rounded-full border border-accent px-6 py-3 font-semibold text-accent hover:bg-white/40">
            Official answer key
          </Link>
          <Link href="/official/exam" className="rounded-full border border-accent px-6 py-3 font-semibold text-accent hover:bg-white/40">
            Mixed official test
          </Link>
          <Link href="/official/final-exam" className="rounded-full border border-accent px-6 py-3 font-semibold text-accent hover:bg-white/40">
            About the in-person exam
          </Link>
        </div>
      </section>

      <Toc modules={modules} lessons={lessons} />

      <section className="mt-12 rounded-2xl border border-line bg-surface p-6">
        <h2 className="font-display text-2xl font-semibold">About the exam</h2>
        <p className="mt-2 leading-7">
          After the online course, the Food Protection Certificate exam is taken in person. It has 50 multiple choice questions, lasts one hour, and you need 70 percent or higher to pass. The practice exam here uses the same format.
        </p>
      </section>
    </div>
  );
}
