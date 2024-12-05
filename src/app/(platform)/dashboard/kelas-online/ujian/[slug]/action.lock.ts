"use server";

import { redirect } from "next/navigation";

import prisma from "@/utils/prisma";

export async function lockAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;

  await prisma.exam.updateMany({
    where: {
      courseId: courseId,
    },
    data: {
      lock: true,
    },
  });

  redirect("/dashboard/kelas-online/ujian");
}
