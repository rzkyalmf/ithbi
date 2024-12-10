import { NextRequest } from "next/server";

import { generateEventCode } from "@/libs/generate-code";
import { EmailServices } from "@/services/email.services";
import prisma from "@/utils/prisma";

interface ReqBody {
  event: string;
  data: Record<string, string | number>;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ReqBody;

  if (body.event === "payment.received") {
    // update Transaction => Paid
    const updatedTransaction = await prisma.transaction.update({
      where: {
        transactionId: body.data.productId as string,
      },
      data: {
        paymentStatus: "PAID",
      },
    });

    // Handle Course Access & Certificate jika courseId ada
    if (updatedTransaction.courseId) {
      // Create Course Access
      await prisma.courseAccess.create({
        data: {
          userId: updatedTransaction.userId,
          courseId: updatedTransaction.courseId,
        },
      });

      // Create Course Certificate
      await prisma.certificate.create({
        data: {
          userId: updatedTransaction.userId,
          courseId: updatedTransaction.courseId,
        },
      });
    }

    // Handle Event Access & Certificate jika eventId ada
    if (updatedTransaction.eventId) {
      const eventCode = generateEventCode(updatedTransaction.amount);

      // Create Event Access
      await prisma.eventAccess.create({
        data: {
          userId: updatedTransaction.userId,
          eventId: updatedTransaction.eventId,
          code: eventCode,
        },
      });

      // Create Event Certificate
      await prisma.certificate.create({
        data: {
          userId: updatedTransaction.userId,
          eventId: updatedTransaction.eventId,
        },
      });

      await EmailServices.sendEventCode(
        updatedTransaction.userId,
        eventCode,
        updatedTransaction.eventId
      );
    }

    console.log("Transaction API has been hitted");
  }

  return new Response("OK");
}
