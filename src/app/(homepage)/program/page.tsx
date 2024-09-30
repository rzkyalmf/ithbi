import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CarouselItemData {
  id: number;
  image: string;
  alt: string;
}

const carouselData: CarouselItemData[] = [
  { id: 1, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur1.png", alt: "picture" },
  { id: 2, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur2.png", alt: "picture" },
  { id: 3, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur3.png", alt: "picture" },
];

export default function Page() {
  return (
    <div className="mx-auto flex items-center justify-center py-28">
      <div className="grid grid-cols-3 gap-28">
        {carouselData.map((item) => (
          <div key={item.id}>
            <Link href="/program/program-1">
              <Image
                src={item.image}
                alt={item.alt}
                width={500}
                height={500}
                className="h-[370px] w-[370px] rounded-xl object-cover shadow-md duration-300 ease-in-out hover:scale-105"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
