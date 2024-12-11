import { Banknote, CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Card } from "@/components/isomorphic/card";
import { RenderHTML } from "@/components/isomorphic/render-html";
import { currencyFormat } from "@/libs/currency-format";
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

        <Card className="space-y-2 p-8 rounded-2xl">
          <div className="py-3 flex flex-col gap-5">
            <h3 className="text-xl text-black font-semibold border-b-2 border-dashed border-gray-200 pb-5">
              {event.title}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-green-500" />
                <p className="font-light text-gray-700">{event.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-500" />
                <p className="font-light text-gray-700">{event.time}</p>
              </div>

              <Link href={event.linkMaps}>
                <div className="flex items-center gap-3 pt-4 hover:text-green-600 transition-colors">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <p className="font-light hover:underline">{event.location}</p>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                <Banknote className="h-5 w-5 text-green-500" />
                <p className="font-medium">
                  {currencyFormat(event.price)} / Tiket
                </p>
              </div>

              <div className="pt-3 border-t-2 border-dashed">
                <h5 className="text-lg font-light ">
                  * Pembelian 3 atau 5 tiket bisa{" "}
                  <b className="font-normal text-emerald-600">Lebih Murah!</b>
                </h5>
              </div>
            </div>
          </div>
        </Card>
      </section>
      <section className="m-auto my-12 grid max-w-7xl grid-cols-3 gap-10">
        <div className="col-span-2 space-y-4">
          <h3 className="border-b-2 pb-3">Deskripsi :</h3>
          <RenderHTML
            content={event.description}
            className="prose-sm text-gray-900"
          />
        </div>
        <div className="relative">
          <Card className="space-y-2 p-4 sticky top-4 rounded-2xl">
            <QuantitySelector event={event} />
          </Card>
        </div>
      </section>
    </main>
  );
}
