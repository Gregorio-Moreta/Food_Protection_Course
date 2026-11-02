import Link from "next/link";
import { officialTotal } from "@/data/official";
import { OfficialBanner } from "@/components/OfficialBanner";
import { OfficialAnswerKey } from "@/components/OfficialAnswerKey";

export const metadata = { title: "Official answer key | Food Protection Prep" };

export default function OfficialAnswers() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-8">
      <Link href="/official" className="text-sm font-semibold text-accent">
        All official quizzes
      </Link>
      <h1 className="font-display mt-2 text-4xl font-semibold">Official answer key</h1>
      <p className="mt-2 max-w-3xl text-lg text-muted">
        All {officialTotal()} official lesson quiz questions with the official answer highlighted, in the same order as the course. Turn on
        flashcard mode to test yourself one question at a time.
      </p>
      <div className="mt-6">
        <OfficialBanner compact />
      </div>
      <div className="mt-8">
        <OfficialAnswerKey />
      </div>
    </div>
  );
}
