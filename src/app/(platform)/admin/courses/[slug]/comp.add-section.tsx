import React from "react";

import { Button } from "@/components/ui/button";

import { addSectionAction } from "./action.add-section";

export const AddSectionBtn = ({ courseId }: { courseId: string }) => {
  return (
    <form action={addSectionAction}>
      <input name="courseId" value={courseId} type="hidden" required />
      <Button variant="outline" className="w-full">
        Add Section
      </Button>
    </form>
  );
};
