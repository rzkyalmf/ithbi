"use client";

import Image from "next/image";
import React, { ChangeEvent, useActionState, useState } from "react";

import { FileInput } from "@/components/isomorphic/file-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createEventAction } from "./action";

export default function Page() {
  const [preview, setPreview] = useState("");
  const [_state, formAction] = useActionState(createEventAction, null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
  }

  return (
    <main className="m-auto max-w-lg space-y-6">
      <section>
        <h3>Buat Event Baru</h3>
      </section>
      <section>
        <form action={formAction} className="space-y-2">
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="title"
            placeholder="Judul Event"
            maxLength={50}
            minLength={3}
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="date"
            placeholder="dd-mm-yyyy"
            maxLength={150}
            minLength={3}
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="time"
            placeholder="00:00 - 00:00 WIB"
            maxLength={150}
            minLength={3}
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="location"
            placeholder="Lokasi Event"
            maxLength={150}
            minLength={3}
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="linkMaps"
            placeholder="Link Maps"
            maxLength={150}
            minLength={3}
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="price"
            placeholder="Harga Event"
            type="text"
            pattern="[0-9]*"
            maxLength={10}
            minLength={1}
            inputMode="numeric"
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="description"
            placeholder="Deskripsi Event"
            maxLength={150}
            minLength={3}
            required
          />
          <FileInput
            name="coverImage"
            placeholder="Wajib ukuran 724x340px"
            accept="image/png,image/jpeg"
            onChange={handleCreatePreview}
          />
          {preview ? (
            <Image
              src={preview}
              width={800}
              height={300}
              alt="Course cover"
              className="rounded-lg"
            />
          ) : null}

          <Button>Simpan Draft</Button>
        </form>
      </section>
    </main>
  );
}
