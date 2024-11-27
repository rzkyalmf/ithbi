"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { CourseServices } from "@/services/course.services";
import { S3Services } from "@/services/s3.services";

const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(8),
  description: z.string().min(1),
  price: z.number(),
  coverImage: z.instanceof(File),
});

export async function editCourseAction(_state: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const coverImage = formData.get("coverImage") as string;

  const validation = courseSchema.safeParse({
    id,
    title,
    description,
    price,
    coverImage,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: { id, title, description, price, coverImage },
    };
  }

  if (validation.data.coverImage.name == "undefined") {
    await CourseServices.updateCourse(id, title, description, price);
    redirect("/admin/courses");
  }

  if (
    validation.data.coverImage.type !== "image/png" &&
    validation.data.coverImage.type !== "image/jpeg"
  ) {
    return {
      status: "error",
      message: "File harus PNG/JPG!",
    };
  }

  const find = await CourseServices.getCourseDetail(id);

  if (!find) {
    return {
      status: "error",
      message: "Konsultan tidak ditemukan!",
    };
  }

  await S3Services.deleteFile({
    folder: `courses/${id}`,
    key: find.coverImage,
  });

  await CourseServices.updateCourse(
    id,
    title,
    description,
    price,
    validation.data.coverImage.name
  );

  // upload file R2
  await S3Services.uploadFile({
    key: validation.data.coverImage.name,
    body: validation.data.coverImage,
    folder: `courses/${id}`,
  });

  redirect("/admin/courses");
}
