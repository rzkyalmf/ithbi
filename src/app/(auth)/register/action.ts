"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

import { generateVerificationCode } from "@/libs/generate-code";
import { EmailServices } from "@/services/email.services";
import { UserServices } from "@/services/user.services";

const registrationSchema = z.object({
  name: z.string().min(3, { message: "Nama tidak boleh kosong" }).max(18, { message: "Nama terlalu panjang" }),
  email: z.string().email({ message: "Email tidak boleh kosong" }),
  phoneNumber: z
    .string({ message: "Masukan nomor HP" })
    .min(8, { message: "No HP tidak sesuai" })
    .max(18, { message: "No HP terlalu panjang" }),
  password: z.string().min(8, { message: "Password terlalu pendek" }).max(18, { message: "Password terlalu panjang" }),
});

export async function registrationAction(_: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phone") as string;
  const password = formData.get("password") as string;

  const validation = registrationSchema.safeParse({
    name,
    email,
    phoneNumber,
    password,
  });

  // console.log(validation.error);

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        name,
        email,
        phoneNumber,
        password,
      },
    };
  }

  const existingUser = await UserServices.findUser(email);

  if (existingUser?.isVerified) {
    return {
      status: "error",
      message: "Email sudah terdaftar!",
    };
  }

  const hanshedPassword = await bcrypt.hash(password, 13);
  const user = await UserServices.createUser({ name, email, phoneNumber, password: hanshedPassword, isVerified: false });
  const verificationCode = generateVerificationCode();

  await UserServices.createVerificationCode(user.id, verificationCode);
  await EmailServices.sendVerificationCode(user.id, verificationCode);

  redirect(`/register/verify/${user.id}`);
}
