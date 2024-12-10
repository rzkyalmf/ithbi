"use server";

import { redirect } from "next/navigation";

import { generateEventCode } from "@/libs/generate-code";
import serverAuth from "@/libs/server.auth";
import { EmailServices } from "@/services/email.services";
import { TransactionServices } from "@/services/transaction.services";
import prisma from "@/utils/prisma";

export async function buyCourseAction(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  const amount = formData.get("amount") as string;
  const slug = formData.get("slug") as string;
  const quantity = formData.get("quantity") as string;

  const user = await serverAuth();

  if (!user) {
    redirect("/login");
  }

  console.log(eventId, amount, user.id, quantity);

  // Free Transaction
  if (Number(amount) <= 499) {
    // update Transaction => Paid
    await TransactionServices.freeEventTransaction(
      user.id,
      Number(amount),
      eventId,
      Number(quantity)
    );

    // Generate multiple unique codes
    const eventCodes: string[] = Array.from({ length: Number(quantity) }, () =>
      generateEventCode(amount)
    );

    // Batch create event access untuk semua kode sekaligus
    await prisma.eventAccess.createMany({
      data: eventCodes.map((code) => ({
        userId: user.id,
        eventId: eventId,
        code: code,
      })),
    });

    // create certificate Placeholder
    await prisma.certificate.create({
      data: {
        userId: user.id,
        eventId: eventId,
      },
    });

    // Kirim email berdasarkan jumlah kode
    if (Number(quantity) === 1) {
      await EmailServices.sendEventCode(user.id, eventCodes[0], eventId);
    } else {
      await EmailServices.sendMultipleEventCodes(user.id, eventCodes, eventId);
    }

    redirect(`/dashboard/events/${slug}`);
  }

  const data = await TransactionServices.createEventTransaction(
    eventId,
    user.id,
    Number(amount)
  );

  if (!data.paymentLink) {
    throw new Error("Payment Gateway not found");
  }

  redirect(data.paymentLink);
}
