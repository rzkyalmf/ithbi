"use client";

import { Event } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
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
        return event.price2 ?? event.price * 3; // Perbaikan disini
      case 4:
        return (event.price2 ?? event.price * 3) + event.price;
      case 5:
        return event.price3 ?? event.price * 5; // fallback jika null
      default:
        return event.price;
    }
  };

  return (
    <div className="space-y-2 p-4">
      <h4>Harga mulai dari :</h4>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="h-8 w-8 rounded-full p-0"
            disabled={quantity === 1}
          >
            <Minus className="h-2 w-4" /> {/* Icon minus */}
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            onClick={() => quantity < 5 && setQuantity(quantity + 1)}
            className="h-8 w-8 rounded-full p-0"
            disabled={quantity === 5}
          >
            <Plus className="h-4 w-4" /> {/* Icon plus */}
          </Button>
        </div>
      </div>
      <form action={buyCourseAction}>
        <input type="hidden" value={event.id} name="eventId" />
        <input type="hidden" value={event.slug} name="slug" />
        <input type="hidden" value={getPrice()} name="amount" />
        <input type="hidden" value={quantity} name="quantity" />
        <Button className="w-full py-6 shadow-md">
          {currencyFormat(getPrice())}
        </Button>
      </form>
    </div>
  );
};
