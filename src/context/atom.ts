import { Exam, Lesson, Question, Section } from "@prisma/client";
import { atom } from "jotai";

export const openLessonEditModalAtom = atom(false);
export const lessonDetailAtom = atom<Lesson | null>(null);

export const openSectionEditModalAtom = atom(false);
export const sectionDetailAtom = atom<Section | null>(null);

export const openExamEditModalAtom = atom(false);
export const examDetailAtom = atom<Exam | null>(null);

export const openQuestionEditModalAtom = atom(false);
export const questionDetailAtom = atom<Question | null>(null);
