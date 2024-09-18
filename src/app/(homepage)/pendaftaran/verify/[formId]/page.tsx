"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  params: {
    formId: string;
  };
}

export default function Page({ params }: Props) {
  const { formId } = params;

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-28">
      <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
        <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Masukan Kode</span>
      </h1>

      <form className="flex w-full flex-col gap-5 px-36 py-10">
        <input hidden value={formId} />

        <div className="space-y-2">
          <label className="text-lg font-normal text-gray-800">Kode :</label>
          <Input className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300" placeholder="masukan kode" name="code" />
        </div>

        <Button type="submit" className="w-full py-6">
          Download Aplikasi
        </Button>
      </form>
    </div>
  );
}
