"use client";
import { Question } from "@prisma/client";

import { Card } from "@/components/isomorphic/card";
import { Button } from "@/components/ui/button";

import { resultAction } from "./action.result";

interface Props {
  question: Question;
  isSelected: boolean;
  onSelect: (questionId: string) => void;
  examId: string;
}

export const CompQuestion = ({ question, isSelected, onSelect }: Props) => {
  const handleSubmit = () => {
    onSelect(question.id);
  };

  return (
    <Card className="p-2">
      <section className="flex items-center justify-between">
        <div className="ml-2 flex items-center gap-2 min-w-0">
          <div>{["A", "B", "C", "D"][question.index]}.</div>
          <div className="overflow-hidden text-ellipsis">{question.title}</div>
        </div>
        <div className="flex gap-2 flex-shrink-0 items-center">
          <form action={resultAction} onSubmit={handleSubmit}>
            <input name="questionId" value={question.id} type="hidden" />
            <Button
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className="w-fit"
            >
              {isSelected ? "Terpilih" : "Pilih"}
            </Button>
          </form>
        </div>
      </section>
    </Card>
  );
};
