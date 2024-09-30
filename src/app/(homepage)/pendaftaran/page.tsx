"use client";

import Image from "next/image";
import { ChangeEvent, useActionState, useState } from "react";

import { FileInput } from "@/components/isomorphic/file-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { pendaftaranAction } from "./action";

const MAX_FILE_SIZE = 15 * 1024 * 1024;

export default function Page() {
  const [fileError, setFileError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(pendaftaranAction, null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let hasError = false;

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError("Ukuran file tidak boleh lebih dari 15MB!");
        hasError = true;
        break;
      } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
        setFileError("Hanya file JPEG atau PNG yang diperbolehkan!");
        hasError = true;
        break;
      }
    }

    if (hasError) {
      event.target.value = ""; // Reset input file
    } else {
      setFileError(null);
      // Proses upload file di sini
    }
  }

  const getErrorMessage = () => {
    if (state?.status === "error") {
      if (state.message) return state.message;
      if (state.errors?.name) return state.errors.name;
      if (state.errors?.email) return state.errors.email;
      if (state.errors?.phone) return state.errors.phone;
      if (state.errors?.images) return state.errors.images;
    }
    return null;
  };

  const errorMessage = getErrorMessage();

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

      <form action={formAction} className="flex w-full flex-col gap-5 px-10 py-10 lg:px-64">
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
            type="number"
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
