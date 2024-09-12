import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import logoithbi from "@/public/images/ithbi1.png";
import logoustdani from "@/public/images/logoustdani.jpg";
import ustdani from "@/public/images/ustdani.png";

export const Hero = () => {
  return (
    <div className="mx-auto my-12 flex w-[1280px] flex-col items-center">
      <div className="mb-24 flex items-center justify-between">
        <div className="w-1/2">
          <h3 className="relative pb-5">
            <span className="absolute -left-5 bottom-1 -rotate-1 rounded-sm border-b-2 bg-yellow-100 px-4 py-2 font-medium text-yellow-600 shadow-sm">
              Gratis Khusus 1000 Orang Pertama !
            </span>
          </h3>
          <h1 className="pb-5 text-emerald-600">Kuliah Thibbun Nabawi & Kedokteran Arab Klasik</h1>
          <h4 className="pb-5 text-slate-600">
            Download Sekarang Juga Aplikasi Diklat Kuliah Kesehatan Akademi Ath Thibbul Badil Indonesia!
          </h4>
          <Button size={"lg"} className="text-md bg-yellow-400 px-12 py-7 text-black hover:text-white">
            Download Sekarang
          </Button>
        </div>
        <div className="flex h-[600px] w-1/2 items-center justify-end">
          <Image src={ustdani} alt="logo" width={400} height={400} />
        </div>
      </div>

      <div className="w-full rounded-sm px-5 py-4">
        <div className="flex items-center justify-center gap-8">
          <p className="text-sm font-medium tracking-normal text-gray-400">Supported :</p>
          <Image src={logoithbi} alt="logo" className="" width={35} height={35} />
          <Image src={logoustdani} alt="logo" className="" width={45} height={45} />
        </div>
      </div>
    </div>
  );
};
