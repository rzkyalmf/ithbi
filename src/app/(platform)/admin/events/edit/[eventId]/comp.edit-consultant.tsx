"use client";

import Image from "next/image";
import React, { ChangeEvent, useActionState, useState } from "react";

import { FileInput } from "@/components/isomorphic/file-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { editEventAction } from "./action";

interface Props {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  price: number | undefined;
  price2: number | undefined;
  price3: number | undefined;
  date: string | undefined;
  time: string | undefined;
  location: string | undefined;
  linkMaps: string | undefined;
  coverImage: string | undefined;
}

export const EditEvent: React.FC<Props> = ({
  id,
  title,
  description,
  price,
  price2,
  price3,
  date,
  time,
  location,
  linkMaps,
  coverImage,
}) => {
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Inisialisasi state dengan null, bukan object kosong
  const [_state, formAction] = useActionState(editEventAction, null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      setPreview("");
      setSelectedFile(null);
      return;
    }
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(formData: FormData) {
    if (selectedFile) {
      formData.set("coverImage", selectedFile);
    }
    formAction(formData);
  }

  return (
    <>
      <section>
        <h3>Edit Event</h3>
      </section>
      <section>
        <form action={handleSubmit} className="space-y-2">
          <input name="id" defaultValue={id} hidden />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="title"
            placeholder="Judul Event"
            maxLength={50}
            minLength={3}
            required
            defaultValue={title}
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="date"
            placeholder="dd-mm-yyyy"
            maxLength={150}
            minLength={3}
            required
            defaultValue={date}
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="time"
            placeholder="00:00 - 00:00 WIB"
            maxLength={150}
            minLength={3}
            required
            defaultValue={time}
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="location"
            placeholder="Lokasi Event"
            maxLength={150}
            minLength={3}
            required
            defaultValue={location}
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="linkMaps"
            placeholder="Link Maps"
            maxLength={150}
            minLength={3}
            required
            defaultValue={linkMaps}
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
            defaultValue={price}
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
            defaultValue={price2}
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
            defaultValue={price3}
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="description"
            placeholder="Deskripsi Event"
            maxLength={150}
            minLength={3}
            required
            defaultValue={description}
          />
          <FileInput
            name="coverImage"
            accept="image/png,image/jpeg"
            placeholder="Wajib ukuran 724x340px"
            onChange={handleCreatePreview}
          />
          {preview ? (
            <Image
              src={preview}
              alt="Cover kursus"
              width={800}
              height={300}
              className="pt-3"
            />
          ) : coverImage && id ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/ithbi-lms/events/${id}/${coverImage}`}
              alt="preview"
              width={800}
              height={300}
            />
          ) : null}

          <Button type="submit">Simpan Draft</Button>
        </form>
      </section>
    </>
  );
};
