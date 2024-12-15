import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export const Hero: React.FC = () => {
  return (
    <div>
      <div className="mx-auto my-12 flex max-w-7xl flex-col items-center px-10 sm:px-10 lg:flex-row lg:px-10 xl:px-0">
        <div className="flex flex-col items-center space-y-5 py-10 lg:w-7/12 lg:items-start lg:py-0">
          <h3 className="relative inline-block text-xl lg:text-2xl">
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 -rotate-1 whitespace-nowrap rounded-sm border-b-2 bg-yellow-100 px-4 py-2 font-medium text-yellow-600 shadow-sm md:left-3 lg:left-48">
              Gratis Khusus 1000 Orang Pertama !
            </span>
          </h3>

          <h1 className="text-center text-emerald-600 lg:text-left lg:text-7xl">
            Sekolah Thibbun Nabawi & Kedokteran Arab Klasik
          </h1>

          <h4 className="w-10/12 text-center text-slate-600 lg:text-left">
            Download Sekarang Juga Aplikasi Diklat Kuliah Kesehatan Akademi Ath
            Thibbul Badil Indonesia!
          </h4>

          <Link href="/download-app">
            <Button
              size={"lg"}
              className="text-md bg-yellow-400 px-12 py-7 text-black hover:text-white"
            >
              Download Sekarang
            </Button>
          </Link>
        </div>

        <div className="flex h-[600px] w-1/2 pb-12 items-center text-end justify-end">
          <Image
            src="https://pub-c203e6e53e5e4f39abd18a3b25c37b06.r2.dev/ithbi-lms/hero-image.png"
            alt="hero"
            width={450}
            height={450}
          />
        </div>
      </div>

      <div className="w-full rounded-sm px-5 py-4">
        <div className="flex items-center justify-center gap-8">
          <p className="text-sm font-medium tracking-normal text-gray-400">
            Supported :
          </p>
          <Image
            src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi%201.png"
            alt="logo"
            className=""
            width={35}
            height={35}
          />
          <Image
            src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/logoustdani.jpg"
            alt="logo"
            className=""
            width={45}
            height={45}
          />
        </div>
      </div>
    </div>
  );
};
