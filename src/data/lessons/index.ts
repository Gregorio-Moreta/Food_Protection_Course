import { lesson1 } from "./l01";
import { lesson2 } from "./l02";
import { lesson3 } from "./l03";
import { lesson4 } from "./l04";
import { lesson5 } from "./l05";
import { lesson6 } from "./l06";
import { lesson7 } from "./l07";
import { lesson8 } from "./l08";
import { lesson9 } from "./l09";
import { lesson10 } from "./l10";
import { lesson11 } from "./l11";
import { lesson12 } from "./l12";
import { lesson13 } from "./l13";
import { lesson14 } from "./l14";
import { lesson15 } from "./l15";
import type { Lesson } from "../types";

export const lessons: Lesson[] = [
  lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7, lesson8,
  lesson9, lesson10, lesson11, lesson12, lesson13, lesson14, lesson15,
];

export const getLesson = (n: number) => lessons.find((l) => l.n === n);

export type Module = { id: string; title: string; blurb: string; lessons: number[] };

export const modules: Module[] = [
  { id: "m1", title: "Regulations and Basics", blurb: "How NYC regulates food service, and the fundamentals of safe food handling.", lessons: [1, 2, 3] },
  { id: "m2", title: "Hazards and Microorganisms", blurb: "Everything that can make food unsafe, from allergens to bacteria and viruses.", lessons: [4, 5, 6, 7] },
  { id: "m3", title: "Safe Practices", blurb: "Preparing food and keeping yourself clean.", lessons: [8, 9] },
  { id: "m4", title: "Facility and Pests", blurb: "Design, plumbing and pest control.", lessons: [10, 11, 12] },
  { id: "m5", title: "Systems and the Law", blurb: "HACCP, posted signs and local laws.", lessons: [13, 14, 15] },
];

export const totalQuestions = () => lessons.reduce((a, l) => a + l.quiz.length, 0);
