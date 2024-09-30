import Image from "next/image";
import React from "react";

interface MissionItem {
  text: string;
}

const missions: MissionItem[] = [
  {
    text: "Menyelenggarakan pembekalan ilmu aqidah yang lurus sebagai dasar seorang terapis",
  },
  {
    text: "Menyelenggarakan pembelajaran berbagai metode pengobatan kesehatan tradisional, dan thibbun nabawi yang disertai hasil riset ilmiah",
  },
  {
    text: "Menyelenggarakan riset kesehatan yang berlandaskan As-Sunnah & inovatif",
  },
  {
    text: "Menyelenggarakan hilirisasi hasil-hasil riset unggulan berbasis keunggulan islam & berbahan baku lokal",
  },
  {
    text: "Menyelenggarakan pengabdian masyarakat yang edukatif dan komprehensif (fisik, psikis, & Spiritual)",
  },
  {
    text: "Menyelenggarakan pendidikan yang berkualitas dan berbasis digital",
  },
  {
    text: "Menyelenggarakan tata kelola institusi berbasis digital",
  },
];

export default function Page() {
  return (
    <div className="mx-auto my-12 flex max-w-7xl flex-col items-center px-10 py-28 sm:px-10 lg:flex-row lg:px-10 xl:px-0">
      <div className="flex flex-col items-center space-y-4 py-10 lg:w-1/2 lg:items-start lg:py-0">
        <p className="text-green-400">TENTANG KAMI :</p>
        <h2 className="font-bold text-emerald-600">Visi & Misi ITHBI</h2>
        <p className="text-base font-normal tracking-normal text-gray-600">
          <b>Visi</b> ITHBI menjadi institusi pendidikan kesehatan tradisional berlandaskan Al Qur&apos;an, Hadist, dan Pendapat Ulama
          pakar kesehatan yang menghasilkan lulusan berkompeten dan siap berperan sebagai garda terdepan dakwah.
        </p>
        <p className="font-bold">Misi :</p>
        <ul className="list-disc pl-6">
          {missions.map((mission, index) => (
            <li key={index} className="mb-2 text-base font-normal tracking-normal text-gray-600">
              {mission.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-[600px] w-1/2 items-center justify-end">
        <Image src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/goal.png" alt="hero" width={400} height={400} />
      </div>
    </div>
  );
}
