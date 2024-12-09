"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/prisma";

export async function PublishAction(formData: FormData) {
  const eventId = formData.get("eventId") as string;

  await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      isPublished: true,
    },
  });

  revalidatePath("/admin/events", "page");
}

export async function unPublishAction(formData: FormData) {
  const eventId = formData.get("eventId") as string;

  await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      isPublished: false,
    },
  });

  revalidatePath("/admin/events", "page");
}
