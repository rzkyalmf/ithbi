import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface TestimonialData {
  id: number;
  content: string;
  name: string;
  followers: string;
  avatar: string;
}

const testimonialData: TestimonialData[] = [
  {
    id: 1,
    content:
      "Sangat bersyukur bisa belajar disini, banyak sekali ilmu yang di dapat, dan juga sangat berpengalaman sekali guru guru didalamnya, alhamdulillah selesai dari sini saya sudah banyak melakukan terapi dan banyak juga yang merasakan manfaatnya setelah saya lakukan terapi",
    name: "Alumni",
    followers: "Alumni Darul Hadist Yaman",
    avatar: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi1.png",
  },
];

export const TestimonialStudent: React.FC = () => {
  return (
    <div className="py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10">
        <h1 className="text-5xl text-green-600">
          <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Testimoni Alumni</span>
        </h1>

        <div className="w-full px-10 lg:w-8/12">
          <Carousel>
            <CarouselContent>
              {testimonialData.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="flex w-full flex-col items-center rounded-xl p-6">
                    <div className="mb-10 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-8 w-8 fill-current text-yellow-400" />
                      ))}
                    </div>

                    <h4 className="mb-10 text-center">&quot;{item.content}&quot;</h4>

                    <div className="flex items-center">
                      <div className="mr-4 h-16 w-16 overflow-hidden rounded-xl">
                        <Image src={item.avatar} alt={item.name} width={48} height={48} className="h-full w-full object-contain" />
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
            <CarouselPrevious className="mx-6" />
            <CarouselNext className="mx-6" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
