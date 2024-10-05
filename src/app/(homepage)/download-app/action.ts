"use server";

import { redirect } from "next/navigation";

import { generateVerificationCode } from "@/libs/generate-code";
import { EmailServices } from "@/services/email.services";
import { FormServices } from "@/services/form.services";

export async function pendaftaranAction(_state: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const images = formData.getAll("images") as File[];

  const formulir = await FormServices.createForm(
    name,
    email,
    phone,
    images.map((image) => image.name),
  );

  if (!formulir) {
    console.log("Gagal membuat formulir");
    return {
      status: "error",
      message: "Gagal membuat formulir",
      data: {
        name,
        email,
        phone,
        images,
      },
    };
  }

  const verificationCode = generateVerificationCode();

  await FormServices.createVerificationCode(formulir.id, verificationCode);
  await EmailServices.sendVerificationCode(formulir.id, verificationCode);

  redirect(`/pendaftaran/verify/${formulir.id}`);
}
