import { notFound } from "next/navigation";
import { lessons, getLesson } from "@/data/lessons";
import { LessonView } from "@/components/LessonView";

export function generateStaticParams() {
  return lessons.map((l) => ({ n: String(l.n) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const l = getLesson(Number(n));
  return { title: l ? `Lesson ${l.n}. ${l.title} | Food Protection Prep` : "Lesson" };
}

export default async function LessonPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const lesson = getLesson(Number(n));
  if (!lesson) notFound();
  return <LessonView lesson={lesson} total={lessons.length} />;
}
