import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";
import { Header } from "@/components/Header";
import { VoiceUI } from "@/components/VoiceUI";

export const metadata: Metadata = {
  title: "Food Protection Prep: NYC Food Protection Course study guide",
  description:
    "A complete study companion for the NYC Food Protection Course: all 15 lessons, read aloud with natural voices, mini quizzes, a full cheat sheet and a practice final exam.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen pb-28">
        <Header />
        <main>{children}</main>
        <footer className="no-print mx-auto max-w-5xl px-4 py-10 text-xs leading-6 text-muted">
          An independent study aid built from the NYC Health Department Food Protection Course material. It is not affiliated with the
          Department and does not replace the official course or the final exam. Always check the current NYC Health Code.
        </footer>
        <VoiceUI />
      </body>
    </html>
  );
}
