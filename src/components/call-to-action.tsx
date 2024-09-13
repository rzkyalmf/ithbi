import React from "react";

import { Button } from "./ui/button";

export const CallToAction = () => {
  return (
    <>
      <div className="mx-auto max-w-5xl py-16 text-center">
        <div className="space-y-8 px-10 lg:px-0">
          <h2 className="relative inline-block text-xl lg:text-4xl">
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 -rotate-1 whitespace-nowrap rounded-sm border-b-2 bg-yellow-100 px-4 py-2 font-medium text-yellow-600 shadow-sm">
              Gratis Khusus 1000 Orang Pertama !
            </span>
          </h2>
          <h1 className="text-5xl text-emerald-600 lg:text-7xl">
            Download Sekarang juga Aplikasi Kuliah Kesehatan di Akademi Ath Thibbul Badil
          </h1>
          <Button size="lg" className="text-md bg-yellow-400 px-12 py-7 text-black hover:text-white">
            Download Sekarang
          </Button>
        </div>
      </div>
    </>
  );
};
