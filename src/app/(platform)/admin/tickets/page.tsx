import { EventServices } from "@/services/event.services";

import { CekTicket } from "./comp.cek-tiket";

export default async function Page() {
  const events = await EventServices.getAllEvents();

  return (
    <main className="m-auto max-w-xl space-y-4 py-12">
      <h3>Cek Tiket Event</h3>
      <CekTicket events={events} />
    </main>
  );
}
