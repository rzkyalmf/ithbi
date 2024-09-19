"use server";

import { z } from "zod";

import { FormServices } from "@/services/form.services";

const verifySchema = z.object({
  id: z.string(),
  code: z.string(),
});

export async function verifyAction(_state: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const code = formData.get("code") as string;

  const validation = verifySchema.safeParse({
    id,
    code,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        id,
        code,
      },
    };
  }

  const data = await FormServices.findCode(id);

  if (!data) {
    console.log("SILAHKAN MASUKAN CODE MELALUI LINK YANG SUDAH KAMI KIRIM MELALUI EMAIL ANDA");
    return {
      status: "error",
      message: "SILAHKAN MASUKAN CODE MELALUI LINK YANG SUDAH KAMI KIRIM MELALUI EMAIL ANDA",
    };
  }

  if (data.code !== code) {
    console.log("KODE SALAH!");
    return {
      status: "error",
      message: "KODE SALAH",
    };
  }

  //   console.log("SILAHKAN DOWNLOAD");

  return {
    status: "success",
    message: "KODE BENAR",
    downloadUrl: "/app-release.apk",
  };
}
