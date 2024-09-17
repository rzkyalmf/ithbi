"use client";

import Image from "next/image";
import React from "react";
import YouTube from "react-youtube";

interface TestimonialData {
  id: number;
  videoId: string;
  name: string;
  account: string;
  avatar: string;
}

const testimonialData: TestimonialData[] = [
  {
    id: 1,
    videoId: "HGBHAa1GZCs", // Ini adalah ID video untuk "Rick Astley - Never Gonna Give You Up"
    name: "Ustadz Abdurahman Dani",
    account: "@rzkyalmf",
    avatar: "/images/ustdani.png",
  },
  {
    id: 2,
    videoId: "6y6-p85aw5k", // Ini adalah ID video untuk "PSY - GANGNAM STYLE(강남스타일)"
    name: "Pasien Contoh 2",
    account: "@pasien2",
    avatar: "/images/ustdani.png", // Gunakan avatar yang sesuai
  },
  {
    id: 3,
    videoId: "49cUGUjcCOA", // Ini adalah ID video untuk "Luis Fonsi - Despacito ft. Daddy Yankee"
    name: "Pasien Contoh 3",
    account: "@pasien3",
    avatar: "/images/ustdani.png", // Gunakan avatar yang sesuai
  },
  {
    id: 3,
    videoId: "49cUGUjcCOA", // Ini adalah ID video untuk "Luis Fonsi - Despacito ft. Daddy Yankee"
    name: "Pasien Contoh 3",
    account: "@pasien3",
    avatar: "/images/ustdani.png", // Gunakan avatar yang sesuai
  },
  {
    id: 3,
    videoId: "49cUGUjcCOA", // Ini adalah ID video untuk "Luis Fonsi - Despacito ft. Daddy Yankee"
    name: "Pasien Contoh 3",
    account: "@pasien3",
    avatar: "/images/ustdani.png", // Gunakan avatar yang sesuai
  },
  {
    id: 3,
    videoId: "49cUGUjcCOA", // Ini adalah ID video untuk "Luis Fonsi - Despacito ft. Daddy Yankee"
    name: "Pasien Contoh 3",
    account: "@pasien3",
    avatar: "/images/ustdani.png", // Gunakan avatar yang sesuai
  },
  {
    id: 3,
    videoId: "49cUGUjcCOA", // Ini adalah ID video untuk "Luis Fonsi - Despacito ft. Daddy Yankee"
    name: "Pasien Contoh 3",
    account: "@pasien3",
    avatar: "/images/ustdani.png", // Gunakan avatar yang sesuai
  },
  {
    id: 3,
    videoId: "49cUGUjcCOA", // Ini adalah ID video untuk "Luis Fonsi - Despacito ft. Daddy Yankee"
    name: "Pasien Contoh 3",
    account: "@pasien3",
    avatar: "/images/ustdani.png", // Gunakan avatar yang sesuai
  },
  {
    id: 3,
    videoId: "49cUGUjcCOA", // Ini adalah ID video untuk "Luis Fonsi - Despacito ft. Daddy Yankee"
    name: "Pasien Contoh 3",
    account: "@pasien3",
    avatar: "/images/ustdani.png", // Gunakan avatar yang sesuai
  },
];

export const TestimonialVideo: React.FC = () => {
  const web = {
    height: "200",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="bg-gray-100 py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-24 text-center">
          <h1 className="text-5xl text-green-600">
            <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Testimoni Pasien</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((item) => (
            <div key={item.id} className="flex flex-col justify-between gap-5 rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6">
                <YouTube videoId={item.videoId} opts={web} />
              </div>
              <div className="flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <Image src={item.avatar} alt={item.name} width={48} height={48} className="h-full w-full object-cover" />
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
