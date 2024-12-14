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
      | "price2"
      | "price3"
      | "coverImage"
      | "date"
      | "timeStart"
      | "timeEnd"
      | "timeZone"
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
          price2: eventData.price2,
          price3: eventData.price3,
          date: eventData.date,
          timeStart: eventData.timeStart,
          timeEnd: eventData.timeEnd,
          timeZone: eventData.timeZone,
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
    price2: number,
    price3: number,
    date: Date,
    timeStart: Date,
    timeEnd: Date,
    timeZone: string,
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
        price2,
        price3,
        date,
        timeStart,
        timeEnd,
        timeZone,
        location,
        linkMaps,
        coverImage,
      },
    });
  },

  getUserEvents: async (eventId: string) => {
    const courseAccess = await prisma.eventAccess.findMany({
      where: {
        eventId,
      },
      include: {
        user: true,
      },
    });

    return courseAccess;
  },
};
