"use client";
import Image from "next/image";
import React, { ChangeEvent, useActionState, useState } from "react";

import { FileInput } from "@/components/isomorphic/file-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { editCourseAction } from "./action";

interface Props {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  price: number | undefined;
  coverImage: string | undefined;
}

export const EditCourse: React.FC<Props> = ({
  id,
  title,
  description,
  price,
  coverImage,
}) => {
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Inisialisasi state dengan null, bukan object kosong
  const [_state, formAction] = useActionState(editCourseAction, null);

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
        <h3>Edit Kursus</h3>
      </section>
      <section>
        <form action={handleSubmit} className="space-y-2">
          <input name="id" defaultValue={id} hidden />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="title"
            placeholder="Judul kursus"
            defaultValue={title}
            maxLength={50}
            minLength={3}
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="description"
            placeholder="Deskripsi kursus"
            defaultValue={description}
            maxLength={150}
            minLength={3}
            required
          />
          <Input
            className="py-6 text-base font-normal text-gray-500 placeholder:text-gray-300"
            name="price"
            placeholder="Harga kursus"
            defaultValue={price}
            type="text"
            pattern="[0-9]*"
            maxLength={10}
            minLength={1}
            inputMode="numeric"
            required
          />
          <FileInput
            name="coverImage"
            accept="image/png,image/jpeg"
            placeholder="Wajib ukuran 1280x720px"
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
              src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/ithbi-lms/courses/${id}/${coverImage}`}
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
