import prisma from "@/utils/prisma";

export const FormServices = {
  getAllForm: async () => {
    const Formulir = await prisma.form.findMany();

    return Formulir;
  },

  createForm: async (name: string, email: string, phoneNumber: string) => {
    try {
      const newForm = await prisma.form.create({
        data: {
          name,
          email,
          phoneNumber,
          createdAt: new Date(),
          isVerified: false,
        },
      });
      return newForm;
    } catch (error) {
      console.log(error);
    }
  },

  createVerificationCode: async (formId: string, code: string) => {
    await prisma.codeApp.create({
      data: {
        formId,
        code,
      },
    });
  },

  findForm: async (idOrEmail: string) => {
    const user = await prisma.form.findFirst({
      where: {
        OR: [
          {
            id: idOrEmail,
          },
          {
            email: idOrEmail,
          },
          {
            codeApp: {
              code: idOrEmail,
            },
          },
        ],
      },
    });

    return user;
  },

  findCode: async (formId: string) => {
    const codeApp = await prisma.codeApp.findFirst({
      where: {
        formId,
      },
    });

    return codeApp;
  },
};
