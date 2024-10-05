import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex flex-row items-start justify-between bg-[#1F2937] px-5 py-28 lg:flex-col lg:items-center">
      <div className="grid w-[1280px] items-start justify-between gap-4 text-white lg:grid-cols-4">
        <div className="flex items-center">
          <Link href={"/"} className="rounded-full border-b-4 border-yellow-500 bg-white px-9 py-6">
            <Image src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi%201.png" alt="logo" width={60} height={60} />
          </Link>
        </div>

        <div className="flex flex-col items-start justify-between">
          <h5 className="text-sm text-white lg:text-lg">Menu :</h5>

          <Link href={"/"}>
            <p className="text-gray-400 hover:text-yellow-500">Home</p>
          </Link>
          <Link href={"/program"}>
            <p className="text-gray-400 hover:text-yellow-500">Program Kami</p>
          </Link>
          <Link href={"/tentang-kami"}>
            <p className="text-gray-400 hover:text-yellow-500">Tentang Kami</p>
          </Link>
          <Link href={"/download-app"}>
            <p className="text-gray-400 hover:text-yellow-500">Download App</p>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <h5 className="text-sm text-white lg:text-lg">No Telp :</h5>
            <p className="text-gray-400">0899-6514-008</p>
          </div>
          <div>
            <h5 className="text-sm text-white lg:text-lg">Email :</h5>
            <p className="text-gray-400">info@ithbi.id</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <h5 className="text-sm text-white lg:text-lg">Alamat :</h5>
            <p className="text-gray-400">perumahan bukit waringin</p>
            <p className="text-gray-400">Desa/Kelurahan Cimanggis, Kec. Bojong Gede,</p>
            <p className="text-gray-400">Kab. Bogor, Provinsi Jawa Barat,</p>
            <p className="text-gray-400">16920</p>
          </div>
        </div>

        {/* Ikon media sosial dari Lucide */}
      </div>

      <div className="mt-8 flex w-[1280px] flex-col items-start justify-between gap-10 border-white/20 px-10 pt-6 lg:flex-row lg:border-t lg:px-0">
        <p className="text-sm text-gray-400">{new Date().getFullYear()} - PT Akademi Ath Thibbul Badil, All rights reserved</p>
        <div className="flex flex-row gap-8">
          <Link href={"https://www.facebook.com/profile.php?id=100087710929348"} target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-600" />
          </Link>
          <Link href={"https://www.instagram.com/ith.bi/"} target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-600" />
          </Link>
          <Link
            href={"https://api.whatsapp.com/send/?phone=628996514008&text&type=phone_number&app_absent=0"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400" />
          </Link>
          <Link href={"https://www.youtube.com/@ithbi"} target="_blank" rel="noopener noreferrer">
            <Youtube className="h-6 w-6 text-gray-400 hover:text-red-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};
