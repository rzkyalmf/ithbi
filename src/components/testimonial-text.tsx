import Image, { StaticImageData } from "next/image";
import React from "react";

import ustdani from "@/public/images/ustdani.png";

interface TestimonialData {
  id: number;
  content: string;
  name: string;
  account: string;
  avatar: StaticImageData;
}

const testimonialData: TestimonialData[] = [
  {
    id: 1,
    content:
      "Sangat bersyukur bisa belajar disini, banyak sekali ilmu yang di dapat, dan juga sangat berpengalaman sekali guru guru didalamnya, alhamdulillah selesai dari sini saya sudah banyak melakukan terapi dan banyak juga yang merasakan manfaatnya setelah saya lakukan terapi",
    name: "Ustadz Abdurahman Dani",
    account: "@rzkyalmf",
    avatar: ustdani,
  },
  {
    id: 2,
    content:
      "Sangat bersyukur bisa belajar disini, banyak sekali ilmu yang di dapat, dan juga sangat berpengalaman sekali guru guru didalamnya, alhamdulillah selesai dari sini saya sudah banyak melakukan terapi dan banyak juga yang merasakan manfaatnya setelah saya lakukan terapi",
    name: "Ustadz Abdurahman Dani",
    account: "@rzkyalmf",
    avatar: ustdani,
  },
  {
    id: 3,
    content:
      "Sangat bersyukur bisa belajar disini, banyak sekali ilmu yang di dapat, dan juga sangat berpengalaman sekali guru guru didalamnya, alhamdulillah selesai dari sini saya sudah banyak melakukan terapi dan banyak juga yang merasakan manfaatnya setelah saya lakukan terapi",
    name: "Ustadz Abdurahman Dani",
    account: "@rzkyalmf",
    avatar: ustdani,
  },
  {
    id: 4,
    content:
      "Sangat bersyukur bisa belajar disini, banyak sekali ilmu yang di dapat, dan juga sangat berpengalaman sekali guru guru didalamnya, alhamdulillah selesai dari sini saya sudah banyak melakukan terapi dan banyak juga yang merasakan manfaatnya setelah saya lakukan terapi",
    name: "Ustadz Abdurahman Dani",
    account: "@rzkyalmf",
    avatar: ustdani,
  },
  {
    id: 5,
    content:
      "Sangat bersyukur bisa belajar disini, banyak sekali ilmu yang di dapat, dan juga sangat berpengalaman sekali guru guru didalamnya, alhamdulillah selesai dari sini saya sudah banyak melakukan terapi dan banyak juga yang merasakan manfaatnya setelah saya lakukan terapi",
    name: "Ustadz Abdurahman Dani",
    account: "@rzkyalmf",
    avatar: ustdani,
  },
];

export const TestimonialText: React.FC = () => {
  return (
    <div className="bg-gray-50 py-28">
      <div className="mx-auto w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-24 text-center">
          <h1 className="text-5xl text-green-600">
            <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">
              Testimoni Pasien
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-5 rounded-lg bg-white p-6 shadow-md"
            >
              <p className="mb-6 text-gray-700">{item.content}</p>

              <div className="flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.account}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
