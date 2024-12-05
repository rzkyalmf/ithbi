import React from "react";

import { Button } from "@/components/ui/button";

import { addExamAction } from "./action.add-exam";

export const AddExamBtn = ({ courseId }: { courseId: string }) => {
  return (
    <form action={addExamAction}>
      <input name="courseId" value={courseId} type="hidden" required />
      <Button variant="outline" className="w-full">
        Tambah Soal
      </Button>
    </form>
  );
};
