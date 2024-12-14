"use client";

import { Course } from "@prisma/client";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateTicketAction } from "./action.update-ticket";

interface Props {
  events: Course[];
}

export const CekTicket = ({ events }: Props) => {
  const [state, formAction, pending] = useActionState(updateTicketAction, {
    status: "",
    message: "",
  });

  return (
    <form className="space-y-4" action={formAction}>
      <Input
        name="name"
        placeholder="Nama Pengguna"
        type="text"
        maxLength={10}
        minLength={1}
        required
        className="py-6 text-base font-normal"
      />
      <Input
        name="code"
        placeholder="Kode Tiket"
        type="text"
        maxLength={10}
        minLength={1}
        required
        className="py-6 text-base font-normal"
      />

      <Select name="eventId">
        <SelectTrigger className="w-full py-6">
          <SelectValue placeholder="Pilih Event" />
        </SelectTrigger>
        <SelectContent>
          {events.map((event) => (
            <SelectItem key={event.id} value={event.id}>
              {event.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="w-full py-6" disabled={pending}>
        Cek Tiket
      </Button>

      {state.status === "error" && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      {state.status === "success" && (
        <p className="text-sm text-green-500">{state.message}</p>
      )}
    </form>
  );
};
