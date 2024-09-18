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
    videoId: "HGBHAa1GZCs",
    name: "Testimoni Pasien 1",
    account: "@pasien1",
    avatar: "/images/ustdani.png",
  },
  {
    id: 2,
    videoId: "49cUGUjcCOA",
    name: "Testimoni Pasien 2",
    account: "@pasien2",
    avatar: "/images/ustdani.png",
  },
  {
    id: 3,
    videoId: "85LtR6_JocM",
    name: "Testimoni Pasien 3",
    account: "@pasien3",
    avatar: "/images/ustdani.png",
  },
  {
    id: 4,
    videoId: "ZcExDOIo62s",
    name: "Testimoni Pasien 4",
    account: "@pasien4",
    avatar: "/images/ustdani.png",
  },
  {
    id: 5,
    videoId: "_R3-8UTynOM",
    name: "Testimoni Pasien 5",
    account: "@pasien5",
    avatar: "/images/ustdani.png",
  },
  {
    id: 6,
    videoId: "Ltt1DzkQaAI",
    name: "Testimoni Pasien 6",
    account: "@pasien6",
    avatar: "/images/ustdani.png",
  },
  {
    id: 7,
    videoId: "t19aXFDBvf0",
    name: "Testimoni Pasien 7",
    account: "@pasien7",
    avatar: "/images/ustdani.png",
  },
  {
    id: 8,
    videoId: "49cUGUjcCOA",
    name: "Testimoni Pasien 8",
    account: "@pasien8",
    avatar: "/images/ustdani.png",
  },
  {
    id: 9,
    videoId: "u5q100TDNTA",
    name: "Testimoni Pasien 9",
    account: "@pasien9",
    avatar: "/images/ustdani.png",
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
