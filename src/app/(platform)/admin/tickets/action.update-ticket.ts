"use server";

import { formatDate, formatDay, formatTime } from "@/libs/dates-format";
import prisma from "@/utils/prisma";

export async function updateTicketAction(_: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const eventId = formData.get("eventId") as string;

  if (!eventId || !code || !name) {
    return {
      status: "error",
      message: "Lengkapi form terlebih dahulu",
    };
  }

  const cekCode = await prisma.eventAccess.findFirst({
    where: {
      code,
    },
  });

  if (!cekCode) {
    return {
      status: "error",
      message: "Kode tidak ditemukan",
    };
  }

  // jika code true
  if (cekCode.isActive) {
    return {
      status: "error",
      message: `Kode sudah digunakan oleh ${
        cekCode.name as string
      } pada ${formatDay(cekCode.updateAt as Date)}, ${formatDate(
        cekCode.updateAt as Date
      )} pukul ${formatTime(cekCode.updateAt as Date)}`,
    };
  }

  await prisma.eventAccess.update({
    where: {
      id: cekCode.id,
    },
    data: {
      name,
      eventId,
      isActive: true,
      updateAt: new Date(),
    },
  });

  return {
    status: "success",
    message: `Kode ${code} berhasil digunakan oleh ${name}`,
  };
}
