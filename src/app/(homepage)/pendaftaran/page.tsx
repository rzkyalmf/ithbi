"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { z } from "zod";

import { FileInput } from "@/components/isomorphic/file-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { pendaftaranAction } from "./action";

const MAX_FILES_SIZE = 50 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const pendaftaranSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }).max(18, { message: "Nama terlalu panjang" }),
  email: z.string().email({ message: "Email tidak boleh kosong" }),
  phone: z
    .string({ message: "Masukan nomor HP" })
    .min(8, { message: "No HP tidak sesuai" })
    .max(18, { message: "No HP terlalu panjang" }),
  images: z
    .array(z.instanceof(File))
    .min(10, { message: "Masukan minimal 10 gambar" })
    .refine((files) => files.length <= 12, {
      message: "Gambar terlalu banyak",
    })
    .refine(
      (files) => {
        const totalSize = files.reduce((state, file) => state + file.size, 0);
        return totalSize <= MAX_FILES_SIZE;
      },
      {
        message: "Ukuran total gambar tidak boleh lebih dari 25MB",
      },
    )
    .refine((files) => files.every((file) => ALLOWED_FILE_TYPES.includes(file.type)), {
      message: "Hanya file PNG dan JPG/JPEG yang diperbolehkan",
    }),
});

export default function Page() {
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const [formValue, setFormValue] = useState({ name: "", email: "", phone: "" });
  const [_, formAction, pending] = useActionState(pendaftaranAction, null);

  async function submitForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const images = formData.getAll("images") as File[];

    setFormValue({ name, email, phone });

    const validation = pendaftaranSchema.safeParse({
      name,
      email,
      phone,
      images,
    });

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    await Promise.resolve(formAction(formData));
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center py-28">
      <div className="flex flex-col items-center justify-center gap-10 px-10 py-24 lg:flex-row">
        <Image
          src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/persyaratan/syarat1.jpg"
          alt="logo"
          width={1000}
          height={1000}
          className="rounded-xl border-b-2"
        />
        <Image
          src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/persyaratan/syarat2.jpg"
          alt="logo"
          width={1000}
          height={1000}
          className="rounded-xl border-b-2"
        />
      </div>

      <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
        <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Pendaftaran</span>
      </h1>

      <form action={submitForm} className="flex w-full flex-col gap-5 px-10 py-10 lg:px-64">
        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Nama :</label>
          <Input
            className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
            placeholder="nama"
            name="name"
            defaultValue={formValue.name}
          />
          {errors?.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Email :</label>
          <Input
            className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
            placeholder="email"
            name="email"
            type="email"
            defaultValue={formValue.email}
          />
          {errors?.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Nomor Whatsapp :</label>
          <Input
            className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
            placeholder="+62"
            name="phone"
            type="number"
            defaultValue={formValue.phone}
          />
          {errors?.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label className="text-lg font-normal text-gray-800">Upload Bukti Screenshot :</label>
          <FileInput name="images" placeholder="Upload 10 foto" multiple />

          {errors?.images?.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
        </div>

        <Button type="submit" disabled={pending} className="w-full py-6">
          {pending ? "Sedang mendaftarkan..." : "Daftar Sekarang"}
        </Button>
      </form>

      <p className="w-[400px] text-center text-lg font-light text-slate-500">
        Lihat video tutorial cara download aplikasi klik{" "}
        <Link href="https://www.youtube.com/watch?v=fAeCVsvtH44" className="text-green-600">
          di sini
        </Link>
      </p>
    </div>
  );
}
