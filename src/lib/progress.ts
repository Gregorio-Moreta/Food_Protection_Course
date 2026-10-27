"use client";
import { useSyncExternalStore } from "react";

export type Progress = {
  read: number[]; // lesson numbers marked complete
  quiz: Record<string, { best: number; total: number; attempts: number }>;
  exam: { best: number; total: number; attempts: number } | null;
};

const KEY = "fpc-progress-v1";
const EMPTY: Progress = { read: [], quiz: {}, exam: null };
let cache: Progress = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) cache = { ...EMPTY, ...JSON.parse(raw) };
  } catch {}
}

function commit(next: Progress) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

const subscribe = (fn: () => void) => {
  load();
  listeners.add(fn);
  fn();
  return () => listeners.delete(fn);
};

export function useProgress() {
  return useSyncExternalStore(subscribe, () => cache, () => EMPTY);
}

export const toggleRead = (n: number) => {
  load();
  const has = cache.read.includes(n);
  commit({ ...cache, read: has ? cache.read.filter((x) => x !== n) : [...cache.read, n] });
};

export const markRead = (n: number) => {
  load();
  if (!cache.read.includes(n)) commit({ ...cache, read: [...cache.read, n] });
};

export const recordQuiz = (n: number, score: number, total: number) => {
  load();
  const prev = cache.quiz[n];
  commit({
    ...cache,
    quiz: { ...cache.quiz, [n]: { best: Math.max(prev?.best ?? 0, score), total, attempts: (prev?.attempts ?? 0) + 1 } },
  });
};

export const recordExam = (score: number, total: number) => {
  load();
  const prev = cache.exam;
  commit({ ...cache, exam: { best: Math.max(prev?.best ?? 0, score), total, attempts: (prev?.attempts ?? 0) + 1 } });
};

export const resetProgress = () => commit(EMPTY);
