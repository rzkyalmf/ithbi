"use client";

import { use, useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { otpAction } from "./action";

// Definisikan tipe params sebagai Promise
type Params = Promise<{ userId: string }>;

interface PageProps {
  params: Params;
}

export default function Page(props: PageProps) {
  const params = use(props.params);
  
  const { userId } = params;
  const [state, formAction] = useActionState(otpAction, null);

  const getErrorMessage = () => {
    if (state?.status === "error") {
      if (state.message) return state.message;
      if (state.errors?.code) return state.errors.code;
      if (state.errors?.userId) return state.errors.userId;
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-64">
      <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
        <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Masukan Kode</span>
      </h1>
      <p className="w-[360px] pt-5 text-center text-lg font-light text-slate-500">
        Silahkan periksa email anda untuk melihat kode verifikasinya
      </p>

      <form action={formAction} className="flex w-full flex-col gap-5 px-16 py-10 lg:px-36">
        <input hidden value={userId} name="id" />

        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Kode :</label>
          <Input className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300" placeholder="masukan kode" name="code" />
        </div>

        <Button type="submit" className="w-full py-6">
          Verifikasi Akun
        </Button>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
}
