"use client";

import Image from "next/image";
import React, { ChangeEvent, useActionState, useState } from "react";

import { FileInput } from "@/components/isomorphic/file-input";
import { Tiptap } from "@/components/isomorphic/tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createEventAction } from "./action";

export default function Page() {
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [_state, formAction] = useActionState(createEventAction, null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
  }

  const handleSubmit = (formData: FormData) => {
    formData.append("description", description);
    formAction(formData);
  };

  return (
    <main className="m-auto max-w-lg space-y-6">
      <section>
        <h3>Buat Event Baru</h3>
      </section>
      <section>
        <form action={handleSubmit} className="space-y-2">
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="title"
            placeholder="Judul Event"
            maxLength={100}
            minLength={3}
            required
          />
          <Input
            className="py-6 text-base font-normal"
            name="date"
            type="date"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
          />
          <div className="flex items-center gap-2">
            <Input
              className="py-6 text-base font-normal "
              name="timeStart"
              type="time"
              required
              defaultValue="08:00"
            />
            <span>-</span>
            <Input
              className="py-6 text-base font-normal"
              name="timeEnd"
              type="time"
              required
              defaultValue="17:00"
            />
          </div>
          <div>
            <Select name="timeZone" defaultValue="WIB">
              <SelectTrigger className="w-full py-6 hover:border-yellow-400">
                <SelectValue placeholder="Pilih zona waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WIB">WIB</SelectItem>
                <SelectItem value="WITA">WITA</SelectItem>
                <SelectItem value="WIT">WIT</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            name="kuota"
            placeholder="Kuota Peserta"
            type="text"
            pattern="[0-9]*"
            maxLength={10}
            minLength={1}
            inputMode="numeric"
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="videoUrl"
            placeholder="Link Video Youtube"
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
            name="price2"
            placeholder="Harga 3 Ticket"
            type="text"
            pattern="[0-9]*"
            maxLength={10}
            minLength={1}
            inputMode="numeric"
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="price3"
            placeholder="Harga 5 Ticket"
            type="text"
            pattern="[0-9]*"
            maxLength={10}
            minLength={1}
            inputMode="numeric"
            required
          />
          <Tiptap content={description} onChange={setDescription} />
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
