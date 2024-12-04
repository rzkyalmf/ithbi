"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prisma";

export async function trueQuestionAction(formData: FormData) {
  const questionId = formData.get("questionId") as string;

  await prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      isTrue: true,
    },
  });

  revalidatePath("/admin/courses/ujian[courseId]", "page");
}

export async function falseQuestionAction(formData: FormData) {
  const questionId = formData.get("questionId") as string;

  await prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      isTrue: false,
    },
  });

  revalidatePath("/admin/courses/ujian[courseId]", "page");
}
