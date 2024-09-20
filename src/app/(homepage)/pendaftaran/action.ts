"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { generateVerificationCode } from "@/libs/generate-code";
import { EmailServices } from "@/services/email.services";
import { FormServices } from "@/services/form.services";

const pendaftaranSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }).max(18, { message: "Nama terlalu panjang" }),
  email: z.string().email({ message: "Email tidak boleh kosong" }),
  phone: z.string().min(1, { message: "No HP tidak sesuai" }).max(18),
  images: z.array(z.instanceof(File)).min(2, { message: "Masukan minimal 2 gambar" }).max(11, { message: "Maksimal 10 gambar" }),
});

export async function pendaftaranAction(_state: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const images = formData.getAll("image") as File[];

  const validation = pendaftaranSchema.safeParse({
    name,
    email,
    phone,
    images,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        name,
        email,
        phone,
        images,
      },
    };
  }

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
    };
  }

  const verificationCode = generateVerificationCode();

  await FormServices.createVerificationCode(formulir.id, verificationCode);
  await EmailServices.sendVerificationCode(formulir.id, verificationCode);

  redirect(`/pendaftaran/verify/${formulir.id}`);
}
