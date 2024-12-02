"use server";

import { revalidatePath } from "next/cache";

import { FlashSaleServices } from "@/services/flashsale.services";

export async function createSaleAction(_: unknown, formData: FormData) {
  const amount = Number(formData.get("amount"));
  const courseId = formData.get("courseId") as string;

  console.log({ amount, courseId });

  if (!courseId) {
    return {
      status: "error",
      message: "Course are required",
    };
  }

  await FlashSaleServices.createSale(amount, courseId);

  revalidatePath("/admin/flash-sales");
}
