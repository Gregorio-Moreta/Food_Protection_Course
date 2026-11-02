import { allOfficialQuestions, officialTotal } from "@/data/official";
import { Quiz } from "@/components/Quiz";

export const metadata = { title: "Mixed official test | Food Protection Prep" };

export default function OfficialExam() {
  return (
    <Quiz
      badge="Official questions only"
      title="Mixed official test"
      subtitle={`50 random questions from all ${officialTotal()} official lesson quiz questions, one hour, 70 percent to pass`}
      questions={allOfficialQuestions()}
      sampleSize={50}
      keepOptionOrder
      exam
      limitMinutes={60}
      passPercent={70}
      officialKey="exam"
      intro={["Every question comes word for word from the official lesson quizzes. This is not the actual final exam, which the Health Department does not publish."]}
      backHref="/official"
      backLabel="All official quizzes"
      nextHref="/official/answers"
      nextLabel="Open the official answer key"
    />
  );
}
