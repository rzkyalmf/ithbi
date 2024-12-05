"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import YouTube from "react-youtube";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { pendaftaranAction } from "./action";

const pendaftaranSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama tidak boleh kosong" })
    .max(18, { message: "Nama terlalu panjang" }),
  email: z.string().email({ message: "Email tidak boleh kosong" }),
  phone: z
    .string({ message: "Masukan nomor HP" })
    .min(8, { message: "No HP tidak sesuai" })
    .max(18, { message: "No HP terlalu panjang" }),
});

export default function Page() {
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [state, formAction, pending] = useActionState(pendaftaranAction, null);

  async function submitForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    setFormValue({ name, email, phone });

    const validation = pendaftaranSchema.safeParse({
      name,
      email,
      phone,
    });

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors(null);
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
        <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">
          Download Aplikasi
        </span>
      </h1>

      <form
        action={submitForm}
        className="flex w-full flex-col gap-5 px-10 py-10 lg:px-64"
      >
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
          <label className="text-lg font-normal text-gray-800">
            Nomor Whatsapp :
          </label>
          <Input
            className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
            placeholder="+62"
            name="phone"
            type="number"
            defaultValue={formValue.phone}
          />
          {errors?.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        <Button type="submit" disabled={pending} className="w-full py-6">
          {pending ? "Sedang proses..." : "Download Sekarang"}
        </Button>

        {state?.downloadUrl && (
          <a
            href={state.downloadUrl}
            download="aplikasi-ithbi.apk"
            className="mt-4 text-center text-blue-500 hover:underline"
          >
            Klik di sini untuk mengunduh aplikasi
          </a>
        )}
      </form>

      <div className="mx-auto mt-10 w-full max-w-4xl p-24 px-4">
        {/* Container untuk video */}
        <div className="relative pt-[56.25%]">
          {/* Aspect ratio 16:9 */}
          <YouTube
            videoId="c0HjXa6HaR4"
            opts={{
              height: "100%",
              width: "100%",
              playerVars: {
                autoplay: 0,
              },
            }}
            className="absolute left-0 top-0 h-full w-full rounded-lg" // Tambahkan rounded-lg untuk sudut membulat
          />
        </div>
      </div>
    </div>
  );
}
