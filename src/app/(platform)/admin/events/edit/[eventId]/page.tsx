import { EventServices } from "@/services/event.services";

import { EditEvent } from "./comp.edit-consultant";

type Params = Promise<{ eventId: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const events = await EventServices.getEventDetail(params.eventId);

  return (
    <main className="m-auto max-w-lg space-y-6">
      <EditEvent
        id={events?.id}
        title={events?.title}
        description={events?.description}
        price={events?.price}
        date={events?.date}
        time={events?.time}
        location={events?.location}
        linkMaps={events?.linkMaps}
        coverImage={events?.coverImage}
      />
    </main>
  );
}
