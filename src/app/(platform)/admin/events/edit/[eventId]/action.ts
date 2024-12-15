"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { sanitizeHTML } from "@/libs/sanitize";
import { EventServices } from "@/services/event.services";
import { S3Services } from "@/services/s3.services";

// Definisi tipe untuk data event dasar
interface EventBaseData {
  id: string;
  title: string;
  date: string; // Ubah ke string
  timeStart: string; // Ubah ke string
  timeEnd: string; // Ubah ke string
  timeZone: "WIB" | "WITA" | "WIT";
  location: string;
  linkMaps: string;
  price: number;
  price2: number;
  price3: number;
  description: string;
}

// Definisi tipe untuk data event dengan gambar
type EventWithImageData = EventBaseData & {
  coverImage: File;
};

// Schema dasar untuk update tanpa gambar
const eventBaseSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  date: z.string().min(1), // Terima string
  timeStart: z.string().min(1), // Terima string
  timeEnd: z.string().min(1), // Terima string
  timeZone: z.enum(["WIB", "WITA", "WIT"]),
  location: z.string().min(1),
  linkMaps: z.string().min(1),
  price: z.number(),
  price2: z.number(),
  price3: z.number(),
  description: z.string().min(1),
});

// Schema dengan gambar untuk update lengkap
const eventWithImageSchema = eventBaseSchema.extend({
  coverImage: z.instanceof(File),
});

export async function editEventAction(_state: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const timeStart = formData.get("timeStart") as string;
  const timeEnd = formData.get("timeEnd") as string;
  const timeZone = formData.get("timeZone") as "WIB" | "WITA" | "WIT";
  const location = formData.get("location") as string;
  const linkMaps = formData.get("linkMaps") as string;
  const price = Number(formData.get("price"));
  const price2 = Number(formData.get("price2"));
  const price3 = Number(formData.get("price3"));
  const description = formData.get("description") as string;
  const coverImage = formData.get("coverImage") as File;

  const sanitizedDescription = sanitizeHTML(description);

  // Cek apakah update dengan gambar baru atau tidak
  const isUpdatingWithoutImage = coverImage.name === "undefined";

  if (isUpdatingWithoutImage) {
    // Data untuk update tanpa gambar
    const baseData: EventBaseData = {
      id,
      title,
      date, // Simpan sebagai string
      timeStart, // Simpan sebagai string
      timeEnd, // Simpan sebagai string
      timeZone,
      location,
      linkMaps,
      price,
      price2,
      price3,
      description,
    };

    // Validasi data dasar
    const validation = eventBaseSchema.safeParse(baseData);

    if (!validation.success) {
      return {
        status: "error",
        errors: validation.error.flatten().fieldErrors,
        data: baseData,
      };
    }

    await EventServices.updateEvent(
      id,
      title,
      sanitizedDescription,
      price,
      price2,
      price3,
      new Date(date), // Konversi ke Date
      new Date(`${date} ${timeStart}`), // Konversi ke Date
      new Date(`${date} ${timeEnd}`), // Konversi ke Date
      timeZone,
      location,
      linkMaps
    );

    redirect("/admin/events");
  } else {
    // Data untuk update dengan gambar
    const withImageData: EventWithImageData = {
      id,
      title,
      date, // Simpan sebagai string
      timeStart, // Simpan sebagai string
      timeEnd, // Simpan sebagai string
      timeZone,
      location,
      linkMaps,
      price,
      price2,
      price3,
      description,
      coverImage,
    };

    // Validasi data dengan gambar
    const validation = eventWithImageSchema.safeParse(withImageData);

    if (!validation.success) {
      return {
        status: "error",
        errors: validation.error.flatten().fieldErrors,
        data: withImageData,
      };
    }

    const find = await EventServices.getEventDetail(id);
    if (!find) {
      return {
        status: "error",
        message: "Event tidak ditemukan!",
      };
    }

    // Hapus file lama
    await S3Services.deleteFile({
      folder: `events/${id}`,
      key: find.coverImage,
    });

    // Update event dengan gambar baru
    await EventServices.updateEvent(
      id,
      title,
      sanitizedDescription,
      price,
      price2,
      price3,
      new Date(date), // Konversi ke Date
      new Date(`${date} ${timeStart}`), // DateTime lengkap
      new Date(`${date} ${timeEnd}`), // DateTime lengkap
      timeZone,
      location,
      linkMaps,
      coverImage.name
    );

    // Upload file baru ke R2
    await S3Services.uploadFile({
      key: coverImage.name,
      body: coverImage,
      folder: `events/${id}`,
    });

    redirect("/admin/events");
  }
}
