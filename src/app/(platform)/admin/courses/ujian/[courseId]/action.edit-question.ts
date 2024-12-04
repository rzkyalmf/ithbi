"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";

export async function updateQuestionAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;

  await CourseServices.updateQuestion({ id, title });

  revalidatePath("/admin/courses/ujian[courseId]", "page");
}
