"use server";

// import { generateVerificationCode } from "@/libs/generate-code";
import { FormServices } from "@/services/form.services";

export async function pendaftaranAction(_state: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  const formulir = await FormServices.createForm(name, email, phone);

  if (!formulir) {
    console.log("Gagal membuat formulir");
    return {
      status: "error",
      message: "Gagal membuat formulir",
      data: {
        name,
        email,
        phone,
      },
    };
  }

  // const verificationCode = generateVerificationCode();
  // await FormServices.createVerificationCode(formulir.id, verificationCode);

  return {
    downloadUrl:
      "https://drive.google.com/file/d/1lOlaITUnGLTJEm8eZhcOzuoLaZno54ek/view",
  };
}
