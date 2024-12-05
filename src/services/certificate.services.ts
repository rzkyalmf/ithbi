import prisma from "@/utils/prisma";

export const CertificateServices = {
  getAll: async () => {
    return await prisma.certificate.findMany({
      include: {
        course: {
          select: {
            title: true,
            id: true,
            exams: {
              select: {
                lock: true,
                result: true,
                courseId: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  },

  approveCertificate: async (certificateId: string) => {
    await prisma.certificate.update({
      where: {
        id: certificateId,
      },
      data: {
        status: "APPROVED",
      },
    });
  },
};
