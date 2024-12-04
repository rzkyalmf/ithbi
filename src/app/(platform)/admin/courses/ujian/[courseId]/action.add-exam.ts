"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";

export async function addExamAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;

  // add section ke course
  await CourseServices.createExam(courseId);

  revalidatePath("/admin/courses/ujian[courseId]", "page");
}
