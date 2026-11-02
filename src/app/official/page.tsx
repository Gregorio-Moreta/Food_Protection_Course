import Link from "next/link";
import { officialQuizzes, officialTotal } from "@/data/official";
import { OfficialBanner } from "@/components/OfficialBanner";
import { OfficialList } from "@/components/OfficialList";

export const metadata = { title: "Official quiz questions | Food Protection Prep" };

export default function OfficialHome() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 pt-10">
      <section className="rounded-3xl bg-accent px-6 py-10 text-bg sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Official section</p>
        <h1 className="font-display mt-2 text-4xl font-semibold leading-tight sm:text-5xl">The real lesson quizzes, word for word.</h1>
        <p className="mt-4 max-w-2xl text-lg opacity-90">
          All {officialTotal()} questions from the {officialQuizzes.length} official lesson quizzes, with the official answers. Take each one as a
          mini quiz, study the full answer key, or mix every official question into one timed test.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/official/1" className="rounded-full bg-bg px-6 py-3 font-semibold text-accent hover:opacity-90">
            Start official Lesson 1 quiz
          </Link>
          <Link href="/official/answers" className="rounded-full border border-current px-6 py-3 font-semibold hover:opacity-80">
            Full answer key
          </Link>
          <Link href="/official/exam" className="rounded-full border border-current px-6 py-3 font-semibold hover:opacity-80">
            Mixed official test
          </Link>
          <Link href="/official/final-exam" className="rounded-full border border-current px-6 py-3 font-semibold hover:opacity-80">
            About the in-person exam
          </Link>
        </div>
      </section>

      <div className="mt-8">
        <OfficialBanner />
      </div>

      <OfficialList />

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link href="/official/exam" className="rounded-2xl border border-line bg-surface p-6 hover:border-accent">
          <div className="text-xs font-bold uppercase tracking-widest text-accent">Official questions only</div>
          <h2 className="font-display mt-1 text-2xl font-semibold">Mixed official test</h2>
          <p className="mt-2 leading-7 text-muted">
            50 questions drawn at random from all {officialTotal()} official lesson quiz questions, one hour, 70 percent to pass. Answers appear
            at the end.
          </p>
        </Link>
        <Link href="/official/final-exam" className="rounded-2xl border border-line bg-surface p-6 hover:border-accent">
          <div className="text-xs font-bold uppercase tracking-widest text-accent">Research</div>
          <h2 className="font-display mt-1 text-2xl font-semibold">Is the real final exam published?</h2>
          <p className="mt-2 leading-7 text-muted">
            What the Health Department has confirmed about the in-person exam, what it has not, and the official study materials to review
            before you go.
          </p>
        </Link>
      </section>
    </div>
  );
}
