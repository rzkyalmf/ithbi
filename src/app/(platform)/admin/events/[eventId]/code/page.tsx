import React from "react";

import { formatDate, formatTime } from "@/libs/dates-format";
import { EventServices } from "@/services/event.services";

type Params = Promise<{ eventId: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const events = await EventServices.getUserEvents(params.eventId);

  return (
    <main className="space-y-4 py-12">
      <section className="px-12 flex items-center justify-between">
        <div className="space-y-1 ">
          <h3>Event Code</h3>
          <p className="text-slate-500 font-normal">Data kode tiket peserta</p>
        </div>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200 bg-white text-left">
            <tr>
              <th className="py-5 pl-12">No</th>
              <th>Nama</th>
              <th>Kode</th>
              <th>Status Tiket</th>
              <th>Pengguna</th>
              <th>Waktu</th>
              <th>Pukul</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => {
              return (
                <tr key={event.id}>
                  <td className="py-5 pl-12">{index + 1}</td>
                  <td>{event.user.name}</td>
                  <td>{event.code}</td>
                  <td className="">
                    {!event.isActive ? (
                      <div className="msg w-fit  msg-success text-sm font-normal">
                        Belum Digunakan
                      </div>
                    ) : (
                      <div className="msg w-fit msg-error text-sm font-normal">
                        Telah Digunakan
                      </div>
                    )}
                  </td>
                  <td>{event.name}</td>
                  <td>
                    {event.updateAt ? formatDate(event.updateAt as Date) : "-"}
                  </td>
                  <td>
                    {event.updateAt ? formatTime(event.updateAt as Date) : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
