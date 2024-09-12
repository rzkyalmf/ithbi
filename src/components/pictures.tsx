import Image, { StaticImageData } from "next/image";
import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// Import gambar dan tipe StaticImageData
import konten from "@/public/images/konten.jpg";

// Perbarui interface untuk menggunakan StaticImageData
interface CarouselItemData {
  id: number;
  image: StaticImageData;
  alt: string;
}

// Data contoh untuk carousel
const carouselData: CarouselItemData[] = [
  { id: 1, image: konten, alt: "Logo UTS Dani" },
  { id: 2, image: konten, alt: "Logo UTS Dani" },
  { id: 3, image: konten, alt: "Logo UTS Dani" },
  { id: 4, image: konten, alt: "Logo UTS Dani" },
  { id: 5, image: konten, alt: "Logo UTS Dani" },
  { id: 6, image: konten, alt: "Logo UTS Dani" },
  { id: 7, image: konten, alt: "Logo UTS Dani" },
  { id: 8, image: konten, alt: "Logo UTS Dani" },
];

export const Pictures: React.FC = () => {
  return (
    <div className="py-16">
      <div className="mx-auto flex w-[1280px] items-center justify-between gap-16">
        {/* Cara Download */}
        <Carousel>
          <div className="flex flex-col items-center space-y-2 pb-8 text-center">
            <h4 className="relative inline-block">
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-sm bg-yellow-100 px-2 py-1 font-medium text-yellow-600 shadow-sm">
                Panduan
              </span>
            </h4>
            <h3 className="text-green-600 underline">Cara Download Aplikasi</h3>
          </div>
          <CarouselContent>
            {carouselData.map((item) => (
              <CarouselItem key={item.id}>
                <div
                  style={{
                    border: "2px solid black",
                    borderRadius: "10px",
                    overflow: "hidden",
                    width: "fit-content",
                    height: "fit-content",
                  }}
                >
                  <Image
                    src={item.image.src}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
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
            <h3 className="text-green-600 underline">Cara Menggunakan Aplikasi</h3>
          </div>
          <CarouselContent>
            {carouselData.map((item) => (
              <CarouselItem key={item.id}>
                <div
                  style={{
                    border: "2px solid black",
                    borderRadius: "10px",
                    overflow: "hidden",
                    width: "fit-content",
                    height: "fit-content",
                  }}
                >
                  <Image
                    src={item.image.src}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
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
            <h3 className="text-green-600 underline">Cara Update Aplikasi</h3>
          </div>
          <CarouselContent>
            {carouselData.map((item) => (
              <CarouselItem key={item.id}>
                <div
                  style={{
                    border: "2px solid black",
                    borderRadius: "10px",
                    overflow: "hidden",
                    width: "fit-content",
                    height: "fit-content",
                  }}
                >
                  <Image
                    src={item.image.src}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
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
