import Image from "next/image";
import Link from "next/link";

import { TruncatedText } from "@/components/isomorphic/truncated-text";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { EventServices } from "@/services/event.services";

import { PublishAction, unPublishAction } from "./action.publish";

export default async function Page() {
  const events = await EventServices.getAllEvents();

  return (
    <main className="space-y-8 p-12">
      <section className="flex items-center justify-between">
        <h3>Events</h3>
        <Link href="/admin/events/new">
          <Button className="w-full">Create Event</Button>
        </Link>
      </section>
      <section className="grid grid-cols-4 gap-6">
        {events.map((event) => {
          return (
            <div
              key={event.id}
              className="relative overflow-hidden rounded-xl border bg-white p-5 shadow-sm"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/events/${event.id}/${event.coverImage}`}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <section className="space-y-3 p-4 border">
                <TruncatedText content={event.title} maxLength={23} />
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/admin/events/${event.slug}/stats`}>
                    <Button variant={"outline"} className="w-full">
                      Stats
                    </Button>
                  </Link>
                  <Link href={`/admin/events/edit/${event.id}`}>
                    <Button variant={"outline"} className="w-full">
                      Edit Event
                    </Button>
                  </Link>
                </div>
                <div>
                  {!event.isPublished ? (
                    <form action={PublishAction}>
                      <input name="eventId" value={event.id} type="hidden" />
                      <Button variant={"default"} className="w-full">
                        Publish Event
                      </Button>
                    </form>
                  ) : (
                    <form action={unPublishAction}>
                      <input name="eventId" value={event.id} type="hidden" />
                      <Button variant="outline" className="w-full">
                        Unpublish Event
                      </Button>
                    </form>
                  )}
                </div>
              </section>
            </div>
          );
        })}
      </section>
    </main>
  );
}
