import { notFound } from "next/navigation";
import { officialQuizzes, getOfficialQuiz } from "@/data/official";
import { Quiz } from "@/components/Quiz";

export function generateStaticParams() {
  return officialQuizzes.map((q) => ({ n: String(q.n) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const q = getOfficialQuiz(Number(n));
  return { title: q ? `Official Lesson ${q.n} quiz | Food Protection Prep` : "Official quiz" };
}

export default async function OfficialQuizPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const quiz = getOfficialQuiz(Number(n));
  if (!quiz) notFound();
  const last = quiz.n >= officialQuizzes.length;
  return (
    <Quiz
      key={quiz.n}
      badge="Official questions and answers"
      title={`Official Lesson ${quiz.n} quiz`}
      subtitle={quiz.title}
      questions={quiz.questions}
      keepQuestionOrder
      keepOptionOrder
      officialKey={String(quiz.n)}
      intro={[
        "Wording and answers are exactly as they appear on the NYC Health Department lesson quiz review page.",
        "You see the official answer and our short explanation after every question.",
      ]}
      backHref="/official"
      backLabel="All official quizzes"
      nextHref={last ? "/official/exam" : `/official/${quiz.n + 1}`}
      nextLabel={last ? "Take the mixed official test" : `Official Lesson ${quiz.n + 1} quiz`}
    />
  );
}
