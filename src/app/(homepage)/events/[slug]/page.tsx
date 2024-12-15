import { Banknote, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Card } from "@/components/isomorphic/card";
import { RenderHTML } from "@/components/isomorphic/render-html";
import { currencyFormat } from "@/libs/currency-format";
import { formatDate, formatTime } from "@/libs/dates-format";
import { EventServices } from "@/services/event.services";

import Countdown from "./components/countdown";
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
                <p className="font-light text-gray-700">
                  <td>{formatDate(event.date)}</td>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-500" />
                <p className="font-light text-gray-700">
                  {formatTime(event.timeStart)} - {formatTime(event.timeEnd)}{" "}
                  {event.timeZone}
                </p>
              </div>

              <Link href={event.linkMaps}>
                <div className="flex items-center gap-3 pt-4 hover:text-green-600 transition-colors">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <p className="font-light underline">{event.location}</p>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-green-500" />
                <p
                  className={`font-light ${
                    event.eventsAccess.length >= Number(event.kuota)
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  {event.eventsAccess.length} / {event.kuota} Peserta telah
                  terdaftar
                </p>
              </div>

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
          <h4 className="font-bold">Deskripsi Acara :</h4>
          <RenderHTML
            content={event.description}
            className="prose-sm text-gray-800 rounded-xl border p-10"
          />
          <section className="relative h-[445px] w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${event.videoUrl}`}
              allowFullScreen
              className=" rounded-xl"
            />
          </section>
        </div>
        <div className="relative">
          <div className="sticky top-4">
            <Card className="space-y-2 p-4 rounded-xl mb-4">
              <QuantitySelector event={event} />
            </Card>
            <Card className="space-y-2 p-4 rounded-xl">
              <Countdown
                eventDate={event.date}
                eventStartTime={event.timeStart}
              />
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
