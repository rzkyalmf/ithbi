import { Event } from "@prisma/client";
import slugify from "slugify";

import prisma from "@/utils/prisma";

export const EventServices = {
  createEvent: async (
    eventData: Pick<
      Event,
      | "title"
      | "description"
      | "price"
      | "coverImage"
      | "date"
      | "time"
      | "location"
      | "linkMaps"
    >
  ) => {
    try {
      const slug = slugify(eventData.title, { lower: true });

      const newEvent = await prisma.event.create({
        data: {
          title: eventData.title,
          slug,
          description: eventData.description,
          price: eventData.price,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          linkMaps: eventData.linkMaps,
          coverImage: eventData.coverImage,
        },
      });

      return newEvent;
    } catch (error) {
      console.log(error);
    }
  },

  getAllEvents: async () => {
    const data = await prisma.event.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return data;
  },

  getEventDetail: async (idOrSlug: string) => {
    const data = await prisma.event.findFirst({
      where: {
        OR: [
          {
            id: idOrSlug,
          },
          {
            slug: idOrSlug,
          },
        ],
      },
    });

    return data;
  },

  updateEvent: async (
    id: string,
    title: string,
    description: string,
    price: number,
    date: string,
    time: string,
    location: string,
    linkMaps: string,
    coverImage?: string
  ) => {
    const slug = slugify(title, { lower: true });

    await prisma.event.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        description,
        price,
        date,
        time,
        location,
        linkMaps,
        coverImage,
      },
    });
  },
};
