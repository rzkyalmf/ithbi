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
      | "kuota"
      | "videoUrl"
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
          kuota: eventData.kuota,
          videoUrl: eventData.videoUrl,
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
      include: {
        eventsAccess: true,
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
    kuota: string,
    videoUrl: string,
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
        kuota,
        videoUrl,
        coverImage,
      },
    });
  },

  getUserEvents: async (eventOrUser: string) => {
    const courseAccess = await prisma.eventAccess.findMany({
      where: {
        OR: [
          {
            eventId: eventOrUser,
          },
          {
            userId: eventOrUser,
          },
        ],
      },
      include: {
        user: true,
        event: true,
      },
    });

    return courseAccess;
  },
};
