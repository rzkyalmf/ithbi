import Image from "next/image";
import React from "react";

import logoithbi from "@/public/images/ithbi1.png";
import logoustdani from "@/public/images/logoustdani.jpg";

export const Supported = () => {
  return (
    <div className="w-full rounded-sm px-5 py-4">
      <div className="flex items-center justify-center gap-8">
        <p className="text-sm font-medium tracking-normal text-gray-400">
          Supported :
        </p>
        <Image src={logoithbi} alt="logo" className="" width={35} height={35} />
        <Image
          src={logoustdani}
          alt="logo"
          className=""
          width={45}
          height={45}
        />
      </div>
    </div>
  );
};
