"use client";

import Image from "next/image";
import { useActionState } from "react";

import { FileInput } from "@/components/isomorphic/file-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { pendaftaranAction } from "./action";

export default function Page() {
  const [_state, formAction] = useActionState(pendaftaranAction, null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-28">
      <div className="py-24">
        <Image src="/images/persyaratan/aplikasi-ithbi.jpg" alt="logo" width={500} height={500} className="rounded-xl border-b-2" />
      </div>

      <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
        <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Pendaftaran</span>
      </h1>

      <form action={formAction} className="flex w-full flex-col gap-5 border px-16 py-10 lg:px-36">
        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Nama :</label>
          <Input className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300" placeholder="nama" name="name" />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Email :</label>
          <Input
            className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
            placeholder="email"
            name="email"
            type="email"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Nomor Whatsapp :</label>
          <Input className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300" placeholder="+62" name="phone" />
        </div>

        <div>
          <label className="text-lg font-normal text-gray-800">Upload Bukti Foto :</label>
          <FileInput name="image" placeholder="Upload 10 foto" multiple />
        </div>
        <Button type="submit" className="w-full py-6">
          Daftar Sekarang
        </Button>
      </form>
    </div>
  );
}
