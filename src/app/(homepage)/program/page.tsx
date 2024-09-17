import Image from "next/image";
import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselItemData {
  id: number;
  image: string;
  alt: string;
}

const carouselData: CarouselItemData[] = [
  { id: 1, image: "/images/brosur1.jpeg", alt: "picture" },
  { id: 2, image: "/images/brosur2.jpeg", alt: "picture" },
  { id: 3, image: "/images/brosur3.jpeg", alt: "picture" },
  { id: 4, image: "/images/brosur4.jpeg", alt: "picture" },
  { id: 5, image: "/images/brosur5.jpeg", alt: "picture" },
];

export default function Page() {
  return (
    <div className="py-24">
      <div className="relative px-10">
        {/* Added horizontal padding */}
        <Carousel className="space-y-14">
          <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
            <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Program Kami</span>
          </h1>
          <CarouselContent>
            {carouselData.map((item) => (
              <CarouselItem key={item.id} className="flex items-center justify-center">
                <Image width={500} height={500} src={item.image} alt={item.alt} className="w-9/12 rounded-xl lg:w-1/3" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 bg-green-700 text-white lg:left-1/4" />
          <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-700 text-white lg:right-1/4" />
        </Carousel>
      </div>
    </div>
  );
}
