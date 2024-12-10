import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Card } from "@/components/isomorphic/card";
import { EventServices } from "@/services/event.services";

import { QuantitySelector } from "./components/quantity";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const event = await EventServices.getEventDetail(params.slug);

  if (!event?.isPublished) {
    redirect("/");
  }

  return (
    <main className="my-20">
      <section className="m-auto my-12 grid max-w-7xl grid-cols-3 gap-10">
        <div className="col-span-2 space-y-4">
          <div className="relative h-[380px] w-full ">
            <Image
              src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/events/${event.id}/${event.coverImage}`}
              alt={event.title}
              fill
              className="rounded-xl"
            />
          </div>
        </div>

        <Card className="space-y-2 p-8">
          <div className="py-3 flex flex-col gap-12">
            <h3 className="border-b-2 pb-5">{event.title}</h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-green-500" />
                <p className="font-light">{event.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                <p className="font-light">{event.time}</p>
              </div>
              <Link href={event.linkMaps}>
                <div className="flex items-center gap-2 py-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <p className="font-light hover:underline">{event.location}</p>
                </div>
              </Link>
            </div>
          </div>
        </Card>
      </section>
      <section className="m-auto my-12 grid max-w-7xl grid-cols-3 gap-10">
        <div className="col-span-2 space-y-4">
          <h3>Deskripsi :</h3>
          <div>{event.description}</div>
        </div>

        <Card className="space-y-2 p-4">
          <QuantitySelector event={event} />
        </Card>
      </section>
    </main>
  );
}
