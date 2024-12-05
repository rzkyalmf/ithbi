"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";
import prisma from "@/utils/prisma";

export async function resultAction(formData: FormData) {
  // Get questionId from form data
  const questionId = formData.get("questionId") as string;

  // Fetch question details
  const questionData = await CourseServices.getQuestionDetail(questionId);

  // Exit if no data found
  if (!questionData) return;

  await prisma.exam.update({
    where: {
      id: questionData.examId,
    },
    data: {
      result: questionData.isTrue,
    },
  });

  revalidatePath("/dashboard/kelas-online/ujian/[slug]", "page");
}
