import prisma from "@/utils/prisma";

import { CourseServices } from "./course.services";
import { EventServices } from "./event.services";
import { UserServices } from "./user.services";

export const TransactionServices = {
  createCourseTransaction: async (
    courseId: string,
    userId: string,
    amount: number
  ) => {
    const courseDetail = await CourseServices.getCourseDetail(courseId);

    if (!courseDetail) {
      throw new Error("Course not found!");
    }

    const user = await UserServices.findUser(userId);

    // hit API dari payment Gateway.
    const res = await fetch("https://api.mayar.id/hl/v1/payment/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user?.name,
        email: user?.email,
        amount: Number(amount),
        description: `Payment for ${courseDetail.title}`,
        mobile: "000000000000",
      }),
    });

    // receive response
    const data = (await res.json()) as { data: { link: string; id: string } };
    console.log(data);

    // insert table transaction
    const transaction = await prisma.transaction.create({
      data: {
        course: {
          connect: {
            id: courseId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        paymentStatus: "UNPAID",
        amount,
        paymentLink: data.data.link,
        transactionId: data.data.id,
      },
    });

    return transaction;
  },

  createEventTransaction: async (
    eventId: string,
    userId: string,
    amount: number,
    quantity: number
  ) => {
    const eventDetail = await EventServices.getEventDetail(eventId);

    if (!eventDetail) {
      throw new Error("Event not found!");
    }

    const user = await UserServices.findUser(userId);

    // hit API dari payment Gateway.
    const res = await fetch("https://api.mayar.id/hl/v1/payment/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user?.name,
        email: user?.email,
        amount: Number(amount),
        description: `Payment for Ticket ${eventDetail.title}`,
        mobile: "000000000000",
      }),
    });

    // receive response
    const data = (await res.json()) as { data: { link: string; id: string } };
    console.log(data);

    // insert table transaction
    const transaction = await prisma.transaction.create({
      data: {
        event: {
          connect: {
            id: eventId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        paymentStatus: "UNPAID",
        quantity,
        amount,
        paymentLink: data.data.link,
        transactionId: data.data.id,
      },
    });

    return transaction;
  },

  freeCourseTransaction: async (
    userId: string,
    amount: number,
    courseId: string
  ) => {
    await prisma.transaction.create({
      data: {
        courseId: courseId,
        userId: userId,
        amount: amount,
        paymentStatus: "PAID",
        paymentLink: "",
      },
    });
  },

  freeEventTransaction: async (
    userId: string,
    amount: number,
    eventId: string,
    quantity: number
  ) => {
    await prisma.transaction.create({
      data: {
        eventId: eventId,
        userId: userId,
        amount: amount,
        quantity: quantity,
        paymentStatus: "PAID",
        paymentLink: "",
      },
    });
  },

  getTransactions: async () => {
    const transactions = await prisma.transaction.findMany({
      include: {
        course: true,
        user: true,
        event: true,
      },
    });

    return transactions;
  },

  getTransactionsByCourse: async (idOrSlug: string) => {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            id: idOrSlug,
          },
          {
            course: {
              slug: idOrSlug,
            },
          },
        ],
      },
      include: {
        course: true,
        user: true,
      },
    });

    return transactions;
  },

  getTransactionsByEvent: async (idOrSlug: string) => {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            id: idOrSlug,
          },
          {
            event: {
              id: idOrSlug,
            },
          },
        ],
      },
      include: {
        event: {
          include: {
            eventsAccess: {
              select: {
                code: true,
                isActive: true,
              },
            },
          },
        },
        user: true,
      },
    });

    return transactions;
  },

  getUserTransactions: async (userId: string) => {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
        event: true,
      },
    });

    return transactions;
  },

  getCurrentRevenues: async () => {
    const currentRevenues = await prisma.transaction.findMany({
      select: {
        amount: true,
      },
    });

    const totalAmount = currentRevenues.reduce(
      (currValue, trx) => trx.amount + currValue,
      0
    );

    return totalAmount;
  },
};
