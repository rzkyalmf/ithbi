import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-[#1F2937]">
      <div className="flex w-[1280px] flex-col items-center justify-center gap-6 px-5 py-20 text-white">
        <Link href={"/"} className="rounded-full border-b-4 border-yellow-500 bg-white px-9 py-6">
          <Image src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi1.png" alt="logo" width={60} height={60} />
        </Link>
        <div className="flex gap-6">
          <Link href={"/"}>
            <h5 className="text-sm text-white hover:text-yellow-500 lg:text-lg">Home</h5>
          </Link>
          <Link href={"/"}>
            <h5 className="text-sm text-white hover:text-yellow-500 lg:text-lg">Program Kami</h5>
          </Link>
          <Link href={"/"}>
            <h5 className="text-sm text-white hover:text-yellow-500 lg:text-lg">Tentang Kami</h5>
          </Link>
          <Link href={"/"}>
            <h5 className="text-sm text-white hover:text-yellow-500 lg:text-lg">Pendaftaran</h5>
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
