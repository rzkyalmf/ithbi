import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ustdani from "@/public/images/ustdani.png";

interface TestimonialData {
  id: number;
  content: string;
  name: string;
  followers: string;
  avatar: StaticImageData;
}

const testimonialData: TestimonialData[] = [
  {
    id: 1,
    content:
      "Sangat bersyukur bisa belajar disini, banyak sekali ilmu yang di dapat, dan juga sangat berpengalaman sekali guru guru didalamnya, alhamdulillah selesai dari sini saya sudah banyak melakukan terapi dan banyak juga yang merasakan manfaatnya setelah saya lakukan terapi",
    name: "Ustadz Abdurahman Dani",
    followers: "Alumni Darul Hadist Yaman",
    avatar: ustdani,
  },
  {
    id: 1,
    content:
      "Sangat bersyukur bisa belajar disini, banyak sekali ilmu yang di dapat, dan juga sangat berpengalaman sekali guru guru didalamnya, alhamdulillah selesai dari sini saya sudah banyak melakukan terapi dan banyak juga yang merasakan manfaatnya setelah saya lakukan terapi",
    name: "Ustadz Abdurahman Dani",
    followers: "Alumni Darul Hadist Yaman",
    avatar: ustdani,
  },
];

export const TestimonialStudent: React.FC = () => {
  return (
    <div className="py-16">
      <div className="mx-auto flex w-[1280px] flex-col items-center gap-10">
        <h1 className="text-green-600">
          <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Testimoni Alumni</span>
        </h1>

        <div className="w-1/2">
          <Carousel>
            <CarouselContent>
              {testimonialData.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="flex w-full flex-col items-center p-6">
                    <div className="mb-10 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-8 w-8 fill-current text-yellow-400" />
                      ))}
                    </div>

                    <h4 className="mb-10 text-center">{item.content}</h4>

                    <div className="flex items-center">
                      <div className="mr-4 h-16 w-16 overflow-hidden rounded-full">
                        <Image src={item.avatar} alt={item.name} width={48} height={48} className="h-full w-full object-cover" />
                      </div>
                      <div className="mr-8 text-left">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.followers}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
