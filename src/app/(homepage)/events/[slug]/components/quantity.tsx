"use client";
import { Event } from "@prisma/client";
import { Minus, Plus, Ticket } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/libs/currency-format";

import { buyCourseAction } from "../action";

interface Props {
  event: Event;
}

export const QuantitySelector = ({ event }: Props) => {
  const [quantity, setQuantity] = useState(1);

  const getPrice = () => {
    switch (quantity) {
      case 1:
        return event.price;
      case 2:
        return event.price * 2;
      case 3:
        return event.price2 ?? event.price * 3;
      case 4:
        return (event.price2 ?? event.price * 3) + event.price;
      case 5:
        return event.price3 ?? event.price * 5;
      default:
        return event.price;
    }
  };

  return (
    <article className="w-full max-w-md mx-auto bg-white">
      <header className="border-b p-4">
        <h2 className="text-lg font-normal flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          Pilih Jumlah Tiket
        </h2>
      </header>

      <main className="p-4 pt-6">
        <div className="space-y-6">
          <section className="flex items-center justify-center gap-4 bg-gray-50 p-4 rounded-lg">
            <Button
              variant="outline"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="h-10 w-10 rounded-full p-0 hover:bg-gray-200"
              disabled={quantity === 1}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-16 text-center text-xl font-semibold">
              {quantity} Tiket
            </span>

            <Button
              variant="outline"
              onClick={() => quantity < 5 && setQuantity(quantity + 1)}
              className="h-10 w-10 rounded-full p-0 hover:bg-gray-200"
              disabled={quantity === 5}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </section>

          <section className="space-y-2">
            <div className="flex justify-between font-normal text-lg">
              <span>Total Pembayaran:</span>
              <span>{currencyFormat(getPrice())}</span>
            </div>
          </section>
        </div>
      </main>

      <footer className="p-4">
        <form action={buyCourseAction} className="w-full">
          <input type="hidden" value={event.id} name="eventId" />
          <input type="hidden" value={event.slug} name="slug" />
          <input type="hidden" value={getPrice()} name="amount" />
          <input type="hidden" value={quantity} name="quantity" />
          <Button className="w-full py-6 shadow-md">Beli Sekarang</Button>
        </form>
      </footer>
    </article>
  );
};

export default QuantitySelector;