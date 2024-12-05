"use client";
import { Question } from "@prisma/client";
import { useEffect } from "react";

import { Card } from "@/components/isomorphic/card";
import { Button } from "@/components/ui/button";

import { resultAction } from "./action.result";

interface Props {
  question: Question;
  isSelected: boolean;
  onSelect: (questionId: string) => void;
  examId: string; // Tambahkan examId sebagai prop
}

export const CompQuestion = ({
  question,
  isSelected,
  onSelect,
  examId,
}: Props) => {
  // Simpan ke local storage saat ada perubahan selection
  useEffect(() => {
    if (isSelected) {
      localStorage.setItem(`exam-${examId}-answer`, question.id);
    }
  }, [isSelected, question.id, examId]);

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
