"use client";

import { Question } from "@prisma/client";
import { useSetAtom } from "jotai";
import React from "react";

import { Card } from "@/components/isomorphic/card";
import { Button } from "@/components/ui/button";
import { openQuestionEditModalAtom, questionDetailAtom } from "@/context/atom";

import {
  falseQuestionAction,
  trueQuestionAction,
} from "./action.true-question";

interface Props {
  question: Question;
}

export const QuestionCard = ({ question }: Props) => {
  const setOpenModal = useSetAtom(openQuestionEditModalAtom);
  const setQuestionDetail = useSetAtom(questionDetailAtom);

  return (
    <Card className="p-2">
      <section className="flex items-center justify-between">
        <div className="ml-2 flex items-start gap-2 min-w-0">
          <div>{["A", "B", "C", "D"][question.index]}.</div>
          <div className="overflow-hidden text-ellipsis">{question.title}</div>
        </div>
        <div className="flex gap-2 flex-shrink-0 items-center">
          {!question.isTrue ? (
            <form action={trueQuestionAction}>
              <input name="questionId" value={question.id} type="hidden" />
              <Button size="sm" variant="outline" className="w-fit">
                Salah
              </Button>
            </form>
          ) : (
            <form action={falseQuestionAction}>
              <input name="questionId" value={question.id} type="hidden" />
              <Button
                size="sm"
                variant="outline"
                className="w-fit text-green-600 bg-emerald-50 border-emerald-200"
              >
                Benar
              </Button>
            </form>
          )}
          <Button
            onClick={() => {
              setOpenModal(true);
              setQuestionDetail(question);
            }}
            className="w-fit"
            variant="outline"
          >
            Edit Jawaban
          </Button>
        </div>
      </section>
    </Card>
  );
};
