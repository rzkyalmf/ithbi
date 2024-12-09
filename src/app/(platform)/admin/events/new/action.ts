"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { EventServices } from "@/services/event.services";
import { S3Services } from "@/services/s3.services";

const eventSchema = z.object({
  title: z.string().min(8),
  date: z.string().min(1),
  time: z.string().min(1),
  location: z.string().min(1),
  linkMaps: z.string().min(1),
  price: z.number(),
  description: z.string().min(1),
  coverImage: z.instanceof(File),
});

export async function createEventAction(_: unknown, formData: FormData) {
  const title = formData.get("title");
  const date = formData.get("date");
  const time = formData.get("time");
  const location = formData.get("location");
  const linkMaps = formData.get("linkMaps");
  const price = Number(formData.get("price"));
  const description = formData.get("description");
  const coverImage = formData.get("coverImage");

  const validation = eventSchema.safeParse({
    title,
    date,
    time,
    location,
    linkMaps,
    price,
    description,
    coverImage,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: { title, description, price, coverImage, date, time, location },
    };
  }

  const newEvent = await EventServices.createEvent({
    title: validation.data.title,
    description: validation.data.description,
    price: validation.data.price,
    date: validation.data.date,
    time: validation.data.time,
    location: validation.data.location,
    linkMaps: validation.data.linkMaps,
    coverImage: validation.data.coverImage.name,
  });

  if (!newEvent) {
    return {
      status: "error",
      message: "Error creating event",
    };
  }

  // ! Implement upload file
  await S3Services.uploadFile({
    key: newEvent.coverImage,
    body: validation.data.coverImage,
    folder: `events/${newEvent.id}`,
  });

  redirect("/admin/events");
}
