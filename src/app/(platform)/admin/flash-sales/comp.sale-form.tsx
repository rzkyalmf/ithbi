"use client";

import { Course } from "@prisma/client";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createSaleAction } from "./action.create-sale";

interface Props {
  courses: Course[];
}

export const SaleForm = ({ courses }: Props) => {
  const [state, formAction, pending] = useActionState(createSaleAction, {
    status: "",
    message: "",
  });

  return (
    <form className="space-y-4" action={formAction}>
      <Input
        name="amount"
        placeholder="New Amount"
        type="text"
        pattern="[0-9]*"
        maxLength={10}
        minLength={1}
        inputMode="numeric"
        required
      />

      <Select name="courseId">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih Course" />
        </SelectTrigger>
        <SelectContent>
          {courses.map((course) => (
            <SelectItem key={course.id} value={course.id}>
              {course.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="w-full" disabled={pending}>
        Create Sale
      </Button>

      {state?.status === "error" && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}
    </form>
  );
};
