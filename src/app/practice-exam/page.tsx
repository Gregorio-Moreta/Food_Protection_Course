import { lessons } from "@/data/lessons";
import { Quiz } from "@/components/Quiz";

export const metadata = { title: "Practice final exam | Food Protection Prep" };

export default function PracticeExam() {
  const all = lessons.flatMap((l) => l.quiz);
  return (
    <Quiz
      title="Practice final exam"
      subtitle="50 random questions from all 15 lessons, one hour, 70 percent to pass"
      questions={all}
      sampleSize={50}
      exam
      limitMinutes={60}
      passPercent={70}
      backHref="/"
      nextHref="/cheat-sheet"
      nextLabel="Open the cheat sheet"
    />
  );
}
