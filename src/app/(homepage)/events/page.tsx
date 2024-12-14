import Image from "next/image";
import Link from "next/link";

import { TruncatedText } from "@/components/isomorphic/truncated-text";
import { currencyFormat } from "@/libs/currency-format";
import { formatDate } from "@/libs/dates-format";
import { EventServices } from "@/services/event.services";

export default async function Page() {
  const events = await EventServices.getAllEvents();

  // Filter published events first
  const publishedEvents = events.filter((event) => event.isPublished);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="bg-opacity-50 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishedEvents.map((event) => (
            <main
              key={event.id}
              className="relative bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              <Link href={`/events/${event.slug}`}>
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <Image
                    src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/events/${event.id}/${event.coverImage}`}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 py-6 pl-6">
                  <h4 className="font-normal text-xl">
                    <TruncatedText maxLength={18} content={event.title} />
                  </h4>
                  <p className="text-slate-400 font-normal text-">
                    <td>{formatDate(event.date)}</td>
                  </p>
                  <h4 className="font-semibold">
                    {currencyFormat(event.price)}
                  </h4>
                </div>
              </Link>
            </main>
          ))}
        </div>
      </div>
    </div>
  );
}
