"use client";
import { Exam, Question } from "@prisma/client";
import { useState } from "react";
import { Card } from "@/components/isomorphic/card";
import { CompQuestion } from "./comp.question";

interface Props {
  exam: Exam & { questions: Question[] };
}

export const CompExam = ({ exam }: Props) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );

  const handleSelect = (questionId: string) => {
    setSelectedQuestionId(questionId);
  };

  return (
    <Card key={exam.id} className="p-2">
      <section className="flex items-center justify-between p-2 pb-5">
        <div className="ml-2 flex items-center gap-2">
          <div>{exam.index + 1}.</div>
          <div>{exam.title}</div>
        </div>
      </section>
      <section className="space-y-2 bg-slate-50 p-2 rounded-xl">
        {exam.questions.map((question) => (
          <CompQuestion
            key={question.id}
            question={question}
            examId={exam.id}
            isSelected={selectedQuestionId === question.id}
            onSelect={handleSelect}
          />
        ))}
      </section>
    </Card>
  );
};
