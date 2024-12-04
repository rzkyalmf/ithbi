"use client";

import { Exam, Question } from "@prisma/client";
import { useSetAtom } from "jotai";
import React from "react";

import { Card } from "@/components/isomorphic/card";
import { Button } from "@/components/ui/button";
import { examDetailAtom, openExamEditModalAtom } from "@/context/atom";

import { deleteExamAction } from "./action.delete-exam";
import { QuestionCard } from "./comp.question-card";

interface Props {
  exam: Exam & { questions: Question[] };
}

export const ExamCard = ({ exam }: Props) => {
  const setOpenModal = useSetAtom(openExamEditModalAtom);
  const setExamDetail = useSetAtom(examDetailAtom);

  return (
    <Card key={exam.id} className="p-2">
      <section className="flex items-center justify-between p-2 pb-5">
        <div className="ml-2 flex items-center gap-2">
          <div>{exam.index + 1}.</div>
          <div>{exam.title}</div>
        </div>

        <div className="m-0 flex gap-2">
          <Button
            onClick={() => {
              setOpenModal(true);
              setExamDetail(exam);
            }}
            className="w-fit"
            variant="outline"
          >
            Edit
          </Button>
          <form action={deleteExamAction}>
            <input name="examId" value={exam.id} type="hidden" />
            <Button className="w-fit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </section>

      <section className="space-y-2 bg-slate-50 p-2 rounded-xl">
        {exam.questions.map((question) => {
          return <QuestionCard key={question.id} question={question} />;
        })}
      </section>
    </Card>
  );
};
