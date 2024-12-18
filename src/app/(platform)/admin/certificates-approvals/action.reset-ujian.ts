"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prisma";

export async function resetUjianAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const certificateId = formData.get("certificateId") as string;

  await prisma.certificate.update({
    where: {
      id: certificateId,
    },
    data: {
      status: "NO_REQUEST",
    },
  });

  await prisma.exam.updateMany({
    where: {
      courseId: courseId,
    },
    data: {
      lock: false,
      result: false,
    },
  });

  revalidatePath("/admin/certificates-approvals", "page");
}
