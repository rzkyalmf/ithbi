"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { generateEventCode } from "@/libs/generate-code";
import serverAuth from "@/libs/server.auth";
import { EmailServices } from "@/services/email.services";
import { TransactionServices } from "@/services/transaction.services";
import { ValidationError } from "@/types/error";
import prisma from "@/utils/prisma";

export async function buyEventAction(formData: FormData) {
  // Deklarasi slug di luar try-catch agar bisa diakses di catch block
  const slug = formData.get("slug") as string;

  try {
    const eventId = formData.get("eventId") as string;
    const amount = formData.get("amount") as string;
    const quantity = formData.get("quantity") as string;

    const user = await serverAuth();
    if (!user) {
      redirect("/login");
    }

    // Ambil data event untuk validasi
    const event = await prisma.event.findFirst({
      where: { id: eventId },
      include: {
        eventsAccess: true,
      },
    });

    if (!event) {
      throw new ValidationError("Event tidak ditemukan");
    }

    // Validasi event sudah dimulai
    const eventDateTime = new Date(event.date);
    eventDateTime.setHours(
      event.timeStart.getHours(),
      event.timeStart.getMinutes(),
      event.timeStart.getSeconds()
    );
    if (eventDateTime < new Date()) {
      throw new ValidationError("Event telah dimulai");
    }

    // Validasi kuota
    if (event.eventsAccess.length + Number(quantity) > parseInt(event.kuota)) {
      throw new ValidationError("Kuota event telah penuh");
    }

    // Validasi harga berdasarkan quantity
    let expectedAmount = 0;
    switch (Number(quantity)) {
      case 1:
        expectedAmount = event.price;
        break;
      case 2:
        expectedAmount = event.price * 2;
        break;
      case 3:
        expectedAmount = event.price2 ?? event.price * 3;
        break;
      case 4:
        expectedAmount = (event.price2 ?? event.price * 3) + event.price;
        break;
      case 5:
        expectedAmount = event.price3 ?? event.price * 5;
        break;
      default:
        throw new ValidationError("Jumlah tiket tidak valid");
    }

    // Validasi amount yang dikirim sesuai dengan perhitungan
    if (Number(amount) !== expectedAmount) {
      throw new ValidationError("Jumlah pembayaran tidak valid");
    }

    // Validasi quantity tidak melebihi 5
    if (Number(quantity) < 1 || Number(quantity) > 5) {
      throw new ValidationError("Jumlah tiket tidak valid");
    }

    // Proses transaksi
    if (Number(amount) <= 499) {
      // update Transaction => Paid
      await TransactionServices.freeEventTransaction(
        user.id,
        Number(amount),
        eventId,
        Number(quantity)
      );

      // Generate multiple unique codes
      const eventCodes: string[] = Array.from(
        { length: Number(quantity) },
        () => generateEventCode(amount)
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
        await EmailServices.sendMultipleEventCodes(
          user.id,
          eventCodes,
          eventId
        );
      }

      redirect(`/dashboard/events/${slug}`);
    }

    const data = await TransactionServices.createEventTransaction(
      eventId,
      user.id,
      Number(amount),
      Number(quantity)
    );

    if (!data.paymentLink) {
      throw new ValidationError("Payment Gateway not found");
    }

    redirect(data.paymentLink);
  } catch (error) {
    // Revalidate path untuk me-refresh data
    revalidatePath(`/events/${slug}`);

    if (error instanceof ValidationError) {
      return {
        error: true,
        message: error.message,
      };
    }

    console.error("Unexpected error:", error);
    return {
      error: true,
      message: "Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.",
    };
  }
}
