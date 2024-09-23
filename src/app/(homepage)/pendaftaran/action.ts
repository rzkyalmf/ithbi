"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { generateVerificationCode } from "@/libs/generate-code";
import { EmailServices } from "@/services/email.services";
import { FormServices } from "@/services/form.services";

const pendaftaranSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }).max(18, { message: "Nama terlalu panjang" }),
  email: z.string().email({ message: "Email tidak boleh kosong" }),
  phone: z
    .string({ message: "Masukan nomor HP" })
    .min(8, { message: "No HP tidak sesuai" })
    .max(18, { message: "No HP terlalu panjang" }),
  images: z
    .array(z.instanceof(File), { message: "Silakan upload kembali" })
    .min(10, { message: "Masukan minimal 10 gambar" })
    .max(12, { message: "Gambar terlalu banyak" }),
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

  // console.log({ name, email, phone, images });
  // console.log({ validation });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        name,
        email,
        phone,
        images: images.map((image) => image.name),
      },
    };
  }

  if (validation.data.images.some((image) => image.type !== "image/jpeg" && image.type !== "image/png")) {
    return {
      status: "error",
      message: "File harus PNG/JPG!",
      data: {
        name,
        email,
        phone,
        images: images.map((image) => image.name),
      },
    };
  }

  const MAX_FILE_SIZE = 15 * 1024 * 1024;

  if (validation.data.images.some((image) => image.size > MAX_FILE_SIZE)) {
    return {
      status: "error",
      message: "Ukuran file tidak boleh lebih dari 15MB!!",
      data: {
        name,
        email,
        phone,
        images: images.map((image) => image.name),
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
