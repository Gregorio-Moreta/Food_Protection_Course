import { OFFICIAL_CAPTURED } from "@/data/official";

/** Marks every page in the official section so it is never confused with our own practice questions. */
export function OfficialBanner({ compact }: { compact?: boolean }) {
  return (
    <div className={`rounded-2xl border-2 border-accent bg-accentsoft ${compact ? "px-4 py-3 text-sm" : "p-5"}`}>
      <div className="text-xs font-bold uppercase tracking-widest text-accent">Official questions and answers</div>
      <p className={`${compact ? "mt-0.5" : "mt-1"} leading-7`}>
        These questions and answers come word for word from the lesson quizzes in the NYC Health Department online Food Protection
        Course, copied from each lesson&apos;s quiz review page on {OFFICIAL_CAPTURED}. The short explanations under each answer are our
        own study notes.
      </p>
    </div>
  );
}
