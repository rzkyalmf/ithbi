"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { sanitizeHTML } from "@/libs/sanitize";
import { EventServices } from "@/services/event.services";
import { S3Services } from "@/services/s3.services";

const eventSchema = z.object({
  title: z.string().min(8),
  date: z.string().min(1),
  timeStart: z.string().min(1),
  timeEnd: z.string().min(1),
  timeZone: z.enum(["WIB", "WITA", "WIT"]),
  location: z.string().min(1),
  linkMaps: z.string().min(1),
  price: z.number(),
  price2: z.number(),
  price3: z.number(),
  description: z.string().min(1),
  coverImage: z.instanceof(File),
});

export async function createEventAction(_: unknown, formData: FormData) {
  const title = formData.get("title");
  const date = formData.get("date");
  const timeStart = formData.get("timeStart");
  const timeEnd = formData.get("timeEnd");
  const timeZone = formData.get("timeZone") as "WIB" | "WITA" | "WIT";
  const location = formData.get("location");
  const linkMaps = formData.get("linkMaps");
  const price = Number(formData.get("price"));
  const price2 = Number(formData.get("price2"));
  const price3 = Number(formData.get("price3"));
  const description = formData.get("description") as string;
  const coverImage = formData.get("coverImage");

  const sanitizedDescription = sanitizeHTML(description);

  const validation = eventSchema.safeParse({
    title,
    date,
    timeStart,
    timeEnd,
    timeZone,
    location,
    linkMaps,
    price,
    price2,
    price3,
    description,
    coverImage,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        title,
        description,
        price,
        price2,
        price3,
        coverImage,
        date,
        timeStart,
        timeEnd,
        timeZone,
        location,
      },
    };
  }

  const newEvent = await EventServices.createEvent({
    title: validation.data.title,
    description: sanitizedDescription,
    price: validation.data.price,
    price2: validation.data.price2,
    price3: validation.data.price3,
    date: new Date(validation.data.date),
    timeStart: new Date(`${validation.data.date} ${validation.data.timeStart}`),
    timeEnd: new Date(`${validation.data.date} ${validation.data.timeEnd}`),
    timeZone: validation.data.timeZone,
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
