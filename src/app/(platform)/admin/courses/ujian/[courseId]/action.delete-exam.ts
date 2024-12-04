"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";

export async function deleteExamAction(formData: FormData) {
  const examId = formData.get("examId") as string;

  await CourseServices.deleteExam(examId);

  revalidatePath("/admin/courses/ujian[courseId]", "page");
}
