import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "@/public/images/ithbi1.png";

export const Header = () => {
  return (
    <div className="mt-3 flex items-center justify-center">
      <div className="flex w-[1280px] items-center justify-start gap-20 py-6">
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={60} height={60} />
        </Link>
        <div className="flex gap-16">
          <Link href={"/"}>
            <h5 className="hover:text-yellow-500">Home</h5>
          </Link>
          <Link href={"/"}>
            <h5 className="hover:text-yellow-500">Program Kami</h5>
          </Link>
          <Link href={"/"}>
            <h5 className="hover:text-yellow-500">Tentang Kami</h5>
          </Link>
          <Link href={"/"}>
            <h5 className="hover:text-yellow-500">Pendaftaran</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};
