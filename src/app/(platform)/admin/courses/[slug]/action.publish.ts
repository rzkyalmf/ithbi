"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prisma";

export async function PublishAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;

  await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      isPublished: true,
    },
  });

  revalidatePath("/admin/courses/[slug]", "page");
}

export async function unPublishAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;

  await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      isPublished: false,
    },
  });

  revalidatePath("/admin/courses/[slug]", "page");
}
