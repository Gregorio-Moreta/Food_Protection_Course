import { notFound } from "next/navigation";
import { lessons, getLesson } from "@/data/lessons";
import { Quiz } from "@/components/Quiz";

export function generateStaticParams() {
  return lessons.map((l) => ({ n: String(l.n) }));
}

export default async function QuizPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const lesson = getLesson(Number(n));
  if (!lesson) notFound();
  return (
    <Quiz
      key={lesson.n}
      title={`Lesson ${lesson.n} mini quiz`}
      subtitle={lesson.title}
      questions={lesson.quiz}
      lessonN={lesson.n}
      backHref={`/lesson/${lesson.n}`}
      nextHref={lesson.n < lessons.length ? `/lesson/${lesson.n + 1}` : "/practice-exam"}
      nextLabel={lesson.n < lessons.length ? `Continue to Lesson ${lesson.n + 1}` : "Take the practice exam"}
    />
  );
}
