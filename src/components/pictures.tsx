import Image, { StaticImageData } from "next/image";
import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import konten from "@/public/images/konten.jpg";

// Perbarui interface untuk menggunakan StaticImageData
interface CarouselItemData {
  id: number;
  image: StaticImageData;
  alt: string;
}

// Data contoh untuk carousel
const carouselData1: CarouselItemData[] = [
  { id: 1, image: konten, alt: "picture" },
  { id: 2, image: konten, alt: "picture" },
  { id: 3, image: konten, alt: "picture" },
  { id: 4, image: konten, alt: "picture" },
  { id: 5, image: konten, alt: "picture" },
  { id: 6, image: konten, alt: "picture" },
  { id: 7, image: konten, alt: "picture" },
  { id: 8, image: konten, alt: "picture" },
];

const carouselData2: CarouselItemData[] = [
  { id: 1, image: konten, alt: "picture" },
  { id: 2, image: konten, alt: "picture" },
  { id: 3, image: konten, alt: "picture" },
  { id: 4, image: konten, alt: "picture" },
  { id: 5, image: konten, alt: "picture" },
  { id: 6, image: konten, alt: "picture" },
  { id: 7, image: konten, alt: "picture" },
  { id: 8, image: konten, alt: "picture" },
];

const carouselData3: CarouselItemData[] = [
  { id: 1, image: konten, alt: "picture" },
  { id: 2, image: konten, alt: "picture" },
  { id: 3, image: konten, alt: "picture" },
  { id: 4, image: konten, alt: "picture" },
  { id: 5, image: konten, alt: "picture" },
  { id: 6, image: konten, alt: "picture" },
  { id: 7, image: konten, alt: "picture" },
  { id: 8, image: konten, alt: "picture" },
];

export const Pictures: React.FC = () => {
  return (
    <div className="py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-36 px-10 lg:flex-row lg:gap-16 lg:px-5">
        {/* Cara Download */}
        <Carousel>
          <div className="flex flex-col items-center space-y-2 pb-8 text-center">
            <h4 className="relative inline-block">
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-sm bg-yellow-100 px-2 py-1 font-medium text-yellow-600 shadow-sm">
                Panduan
              </span>
            </h4>
            <h3 className="text-green-600">Cara Download Aplikasi</h3>
          </div>

          <CarouselContent>
            {carouselData1.map((item) => (
              <CarouselItem key={item.id} className="flex justify-center">
                <Image width={1000} height={1000} src={item.image.src} alt={item.alt} className="w-8/12 rounded-xl lg:w-screen" />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-4 flex justify-center">
            <CarouselPrevious
              className="relative inset-0 mx-2 translate-y-0"
              style={{
                color: "white",
                fontSize: "30px",
                background: "rgba(0,0,0,0.5)",
              }}
            />
            <CarouselNext
              className="relative inset-0 mx-2 translate-y-0"
              style={{
                color: "white",
                fontSize: "30px",
                background: "rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </Carousel>

        {/* Cara Menggunakan Aplikasi */}
        <Carousel>
          <div className="flex flex-col items-center space-y-2 pb-8 text-center">
            <h4 className="relative inline-block">
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-sm bg-yellow-100 px-2 py-1 font-medium text-yellow-600 shadow-sm">
                Panduan
              </span>
            </h4>
            <h3 className="text-green-600">Cara Menggunakan Aplikasi</h3>
          </div>

          <CarouselContent>
            {carouselData2.map((item) => (
              <CarouselItem key={item.id} className="flex justify-center">
                <Image width={1000} height={1000} src={item.image.src} alt={item.alt} className="w-8/12 rounded-xl lg:w-screen" />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-4 flex justify-center">
            <CarouselPrevious
              className="relative inset-0 mx-2 translate-y-0"
              style={{
                color: "white",
                fontSize: "30px",
                background: "rgba(0,0,0,0.5)",
              }}
            />
            <CarouselNext
              className="relative inset-0 mx-2 translate-y-0"
              style={{
                color: "white",
                fontSize: "30px",
                background: "rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </Carousel>

        {/* Cara Update Aplikasi  */}
        <Carousel>
          <div className="flex flex-col items-center space-y-2 pb-8 text-center">
            <h4 className="relative inline-block">
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-sm bg-yellow-100 px-2 py-1 font-medium text-yellow-600 shadow-sm">
                Panduan
              </span>
            </h4>
            <h3 className="text-green-600">Cara Update Aplikasi</h3>
          </div>

          <CarouselContent>
            {carouselData3.map((item) => (
              <CarouselItem key={item.id} className="flex justify-center">
                <Image width={1000} height={1000} src={item.image.src} alt={item.alt} className="w-8/12 rounded-xl lg:w-screen" />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-4 flex justify-center">
            <CarouselPrevious
              className="relative inset-0 mx-2 translate-y-0"
              style={{
                color: "white",
                fontSize: "30px",
                background: "rgba(0,0,0,0.5)",
              }}
            />
            <CarouselNext
              className="relative inset-0 mx-2 translate-y-0"
              style={{
                color: "white",
                fontSize: "30px",
                background: "rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};
