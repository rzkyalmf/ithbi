import { CalendarDays, Clock, Ticket } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { Card } from "@/components/isomorphic/card";
import { TruncatedText } from "@/components/isomorphic/truncated-text";
import { formatDate, formatTime } from "@/libs/dates-format";
import serverAuth from "@/libs/server.auth";
import { EventServices } from "@/services/event.services";

export default async function Page() {
  const auth = await serverAuth();
  if (!auth) {
    redirect("/login");
  }

  const userEvents = await EventServices.getUserEvents(auth.id);

  // Filter tiket yang masih valid (belum lewat 2 hari)
  const validEvents = userEvents.filter((eventAccess) => {
    const eventDate = new Date(eventAccess.event.date);
    const twoDaysAfterEvent = new Date(eventDate);
    twoDaysAfterEvent.setDate(eventDate.getDate() + 2);

    const currentDate = new Date();

    return currentDate <= twoDaysAfterEvent;
  });

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      {/* Header Section */}
      <section className="mb-8">
        <h3>Tiket Acara</h3>
        <p className="text-slate-500 font-normal">
          Tiket acara yang Anda miliki
        </p>
      </section>

      {/* Tickets Section */}
      <section className="space-y-4">
        {validEvents.length > 0 ? (
          validEvents.map((eventAccess) => (
            <Card
              key={eventAccess.event.id}
              className="group overflow-hidden bg-white"
            >
              {/* Banner Image */}
              <div className="relative w-full h-72">
                <Image
                  src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/events/${eventAccess.event.id}/${eventAccess.event.coverImage}`}
                  alt={eventAccess.event.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              {/* Event Details */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    {/* Title */}
                    <h4 className="font-semibold text-slate-900 text-lg">
                      <TruncatedText content={eventAccess.event.title} />
                    </h4>

                    {/* Date and Time */}
                    <div className="space-y-2">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarDays className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDate(eventAccess.event.date)}
                        </span>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {formatTime(eventAccess.event.timeStart)} -{" "}
                          {formatTime(eventAccess.event.timeEnd)}{" "}
                          {eventAccess.event.timeZone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Code */}
                  <div className="px-4 py-2 rounded-lg">
                    <p className="text-xs font-medium mb-1">Kode Tiket</p>
                    <p className="font-mono text-lg font-semibold bg-emerald-50  text-emerald-700">
                      #{eventAccess.code}
                    </p>
                    <p
                      className={`text-xs font-medium mt-2 ${
                        eventAccess.isActive
                          ? "text-rose-600"
                          : " text-emerald-600"
                      }`}
                    >
                      {eventAccess.isActive ? "Tidak Aktif" : "Aktif"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="flex flex-col items-center justify-center gap-4 py-12 bg-slate-50">
            <Ticket className="w-12 h-12 text-slate-400" />
            <div className="text-center">
              <h5 className="text-lg font-medium text-slate-700">
                Anda tidak memiliki tiket
              </h5>
              <p className="text-sm text-slate-500">
                Tiket acara yang Anda pesan akan muncul di sini
              </p>
            </div>
          </Card>
        )}
      </section>
    </main>
  );
}
