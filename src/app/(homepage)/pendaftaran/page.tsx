"use client";

import Image from "next/image";
import { ChangeEvent, useActionState, useState } from "react";

import { FileInput } from "@/components/isomorphic/file-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { pendaftaranAction } from "./action";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function Page() {
  const [fileError, setFileError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(pendaftaranAction, null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setFileError("Ukuran file tidak boleh lebih dari 10MB!");

      event.target.value = ""; // Reset input file
    } else {
      setFileError(null);
    }
  }

  const getErrorMessage = () => {
    if (state?.status === "error") {
      if (state.errors?.name) return state.errors.name;
      if (state.errors?.email) return state.errors.email;
      if (state.errors?.phone) return state.errors.phone;
      if (state.errors?.images) return state.errors.images;
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-28">
      <div className="py-24">
        <Image src="/images/persyaratan/aplikasi-ithbi.jpg" alt="logo" width={500} height={500} className="rounded-xl border-b-2" />
      </div>

      <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
        <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Pendaftaran</span>
      </h1>

      <form action={formAction} className="flex w-full flex-col gap-5 px-16 py-10 lg:px-36">
        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Nama :</label>
          <Input
            className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
            placeholder="nama"
            name="name"
            defaultValue={state?.data?.name}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Email :</label>
          <Input
            className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
            placeholder="email"
            name="email"
            type="email"
            defaultValue={state?.data?.email}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Nomor Whatsapp :</label>
          <Input
            className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
            placeholder="+62"
            name="phone"
            defaultValue={state?.data?.phone}
          />
        </div>

        <div>
          <label className="text-lg font-normal text-gray-800">Upload Bukti Screenshot :</label>
          <FileInput onChange={handleCreatePreview} name="image" placeholder="Upload 10 foto" multiple />
        </div>
        <Button type="submit" disabled={pending} className="w-full py-6">
          {pending ? "Sedang mendaftarkan..." : "Daftar Sekarang"}
        </Button>

        {errorMessage && (
          <div className="mt-4 text-red-600" role="alert">
            <p>{errorMessage}</p>
          </div>
        )}

        {fileError && <p className="text-red-500">{fileError}</p>}
      </form>
    </div>
  );
}
