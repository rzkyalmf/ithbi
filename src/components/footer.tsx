import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "@/public/images/ithbi1.png";

export const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-[#1F2937]">
      <div className="flex w-[1280px] flex-col items-center justify-center gap-6 px-5 py-20 text-white">
        <Link href={"/"} className="rounded-full border-b-4 border-yellow-500 bg-white px-9 py-6">
          <Image src={logo} alt="logo" width={60} height={60} />
        </Link>
        <div className="flex gap-8">
          <Link href={"/"}>
            <h5 className="text-white hover:text-yellow-500">Home</h5>
          </Link>
          <Link href={"/"}>
            <h5 className="text-white hover:text-yellow-500">Program Kami</h5>
          </Link>
          <Link href={"/"}>
            <h5 className="text-white hover:text-yellow-500">Tentang Kami</h5>
          </Link>
          <Link href={"/"}>
            <h5 className="text-white hover:text-yellow-500">Pendaftaran</h5>
          </Link>
        </div>

        {/* Ikon media sosial dari Lucide */}
        <div className="flex gap-8">
          <Link href={"https://facebook.com"} target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6 text-white hover:text-blue-600" />
          </Link>
          <Link href={"https://instagram.com"} target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6 text-white hover:text-pink-600" />
          </Link>
          <Link href={"https://twitter.com"} target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 text-white hover:text-blue-400" />
          </Link>
          <Link href={"https://youtube.com"} target="_blank" rel="noopener noreferrer">
            <Youtube className="h-6 w-6 text-white hover:text-red-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};
