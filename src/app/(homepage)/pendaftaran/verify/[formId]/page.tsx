"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { verifyAction } from "./action";

interface Props {
  params: {
    formId: string;
  };
}

export default function Page({ params }: Props) {
  const { formId } = params;
  const [state, formAction] = useActionState(verifyAction, null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-96">
      <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
        <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Masukan Kode</span>
      </h1>
      <p className="w-[360px] pt-5 text-center text-lg font-light text-slate-500">
        Silahkan periksa email anda untuk melihat kode downloadnya
      </p>

      <form action={formAction} className="flex w-full flex-col gap-5 px-36 py-10">
        <input hidden defaultValue={formId} name="id" />

        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Kode :</label>
          <Input className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300" placeholder="masukan kode" name="code" />
        </div>

        <Button type="submit" className="w-full py-6">
          Download Aplikasi
        </Button>

        {state?.status === "error" && <p className="text-red-500">{state.message}</p>}

        {state?.downloadUrl && (
          <a href={state.downloadUrl} download="aplikasi-ithbi.apk" className="mt-4 text-center text-blue-500 hover:underline">
            Klik di sini untuk mengunduh aplikasi
          </a>
        )}

        <p className="text-sm font-normal text-slate-400">
          *Setiap 1 orang hanya memiliki 1 kode OTP untuk download, Silahkan gunakan link yang telah dikirim melalui email jika ingin
          mendownload ulang.
        </p>
      </form>
    </div>
  );
}
