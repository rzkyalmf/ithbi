import Image from "next/image";
import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Perbarui interface untuk menggunakan StaticImageData
interface CarouselItemData {
  id: number;
  image: string;
  alt: string;
}

// Data contoh untuk carousel
const carouselData1: CarouselItemData[] = [
  { id: 1, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/persyaratan/aplikasi-ithbi.jpg", alt: "picture" },
];

const carouselData2: CarouselItemData[] = [
  { id: 1, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-1.png", alt: "picture" },
  { id: 2, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-2.png", alt: "picture" },
  { id: 3, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-3.png", alt: "picture" },
  { id: 4, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-4.png", alt: "picture" },
  { id: 5, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-5.png", alt: "picture" },
  { id: 6, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-6.png", alt: "picture" },
  { id: 7, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-7.png", alt: "picture" },
  { id: 8, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-8.png", alt: "picture" },
  { id: 9, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-9.png", alt: "picture" },
  { id: 10, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-10.png", alt: "picture" },
  { id: 11, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-11.png", alt: "picture" },
  { id: 12, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-menggunakan/cara-12.png", alt: "picture" },
];

const carouselData3: CarouselItemData[] = [
  { id: 1, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-install/install-1.png", alt: "picture" },
  { id: 2, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-install/install-2.png", alt: "picture" },
  { id: 3, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-install/install-3.png", alt: "picture" },
  { id: 4, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-install/install-4.png", alt: "picture" },
  { id: 5, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-install/install-5.png", alt: "picture" },
  { id: 6, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/cara-install/install-6.png", alt: "picture" },
];

export const Pictures: React.FC = () => {
  return (
    <div className="py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-36 px-10 lg:flex-row lg:gap-16 lg:px-5">
        {/* Cara Download */}
        <Carousel className="lg:w-1/3">
          <div className="flex flex-col items-center space-y-2 pb-8 text-center">
            <h4 className="relative inline-block">
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-sm bg-yellow-100 px-2 py-1 font-medium text-yellow-600 shadow-sm">
                Persyaratan
              </span>
            </h4>
            <h3 className="text-green-600">Download Aplikasi</h3>
          </div>

          <CarouselContent>
            {carouselData1.map((item) => (
              <CarouselItem key={item.id} className="flex justify-center">
                <Image width={500} height={500} src={item.image} alt={item.alt} className="w-10/12 rounded-xl" />
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
        <Carousel className="lg:w-1/3">
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
              <CarouselItem key={item.id} className="flex items-center justify-center">
                <Image width={500} height={500} src={item.image} alt={item.alt} className="w-10/12 rounded-xl" />
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
        <Carousel className="lg:w-1/3">
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
                <Image width={500} height={500} src={item.image} alt={item.alt} className="w-10/12 rounded-xl" />
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
