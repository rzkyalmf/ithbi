"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prisma";

export async function requestCertificateAction(formData: FormData) {
  const certificateId = formData.get("certificateId") as string;

  // Ambil data certificate beserta course dan exam-nya
  const certificate = await prisma.certificate.findUnique({
    where: {
      id: certificateId,
    },
    include: {
      course: {
        include: {
          exams: true,
        },
      },
    },
  });

  // Hitung jumlah exam yang result-nya true
  const passedExams =
    certificate?.course?.exams.filter((exam) => exam.result).length ?? 0;

  // Tentukan status berdasarkan jumlah exam yang passed
  const newStatus = passedExams >= 9 ? "APPROVED" : "UNDER_REVIEW";

  // Update certificate
  await prisma.certificate.update({
    where: {
      id: certificateId,
    },
    data: {
      status: newStatus,
    },
  });

  revalidatePath("/dashboard/certificates");
}
