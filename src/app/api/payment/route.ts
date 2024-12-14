import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { generateEventCode } from "@/libs/generate-code";
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
      const eventId = updatedTransaction.eventId;

      // Generate kode terlebih dahulu dan simpan dalam array
      const eventCodes = Array.from(
        { length: Number(updatedTransaction.quantity) },
        () => generateEventCode(updatedTransaction.amount)
      );

      // Buat event access dengan kode yang sudah di-generate
      await prisma.eventAccess.createMany({
        data: eventCodes.map((code) => ({
          userId: updatedTransaction.userId,
          eventId: eventId,
          code: code,
        })),
      });

      // Create Event Certificate
      await prisma.certificate.create({
        data: {
          userId: updatedTransaction.userId,
          eventId: updatedTransaction.eventId,
        },
      });

      // Dynamic import - dimuat hanya saat diperlukan
      const { EmailServices } = await import("@/services/email.services");

      // Kirim email berdasarkan jumlah kode
      if (Number(updatedTransaction.quantity) === 1) {
        await EmailServices.sendEventCode(
          updatedTransaction.userId,
          eventCodes[0],
          eventId
        );
      } else {
        await EmailServices.sendMultipleEventCodes(
          updatedTransaction.userId,
          eventCodes,
          eventId
        );
      }
    }

    console.log("Transaction API has been hitted");
  }

  redirect("/dashboard/pembayaran");
}
