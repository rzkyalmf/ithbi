import Image, { StaticImageData } from "next/image";
import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import brosur1 from "@/public/images/brosur1.jpeg";
import brosur2 from "@/public/images/brosur2.jpeg";
import brosur3 from "@/public/images/brosur3.jpeg";
import brosur4 from "@/public/images/brosur4.jpeg";
import brosur5 from "@/public/images/brosur5.jpeg";

interface CarouselItemData {
  id: number;
  image: StaticImageData;
  alt: string;
}

const carouselData: CarouselItemData[] = [
  { id: 1, image: brosur1, alt: "picture" },
  { id: 2, image: brosur2, alt: "picture" },
  { id: 3, image: brosur3, alt: "picture" },
  { id: 4, image: brosur4, alt: "picture" },
  { id: 5, image: brosur5, alt: "picture" },
];

export default function Page() {
  return (
    <div className="py-16">
      <div className="relative px-12">
        {/* Added horizontal padding */}
        <Carousel className="space-y-20">
          <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
            <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Program Kami</span>
          </h1>
          <CarouselContent>
            {carouselData.map((item) => (
              <CarouselItem key={item.id} className="flex items-center justify-center">
                <Image width={500} height={500} src={item.image.src} alt={item.alt} className="w-9/12 rounded-xl lg:w-1/3" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1/2 top-1/2 -translate-y-1/2 bg-green-700 text-white lg:left-1/4" />
          <CarouselNext className="absolute right-1/2 top-1/2 -translate-y-1/2 bg-green-700 text-white lg:right-1/4" />
        </Carousel>
      </div>
    </div>
  );
}
