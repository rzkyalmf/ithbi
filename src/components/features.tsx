import React from "react";

const contentData = [
  {
    number: "01",
    title: "Ilmu Terintegrasi",
    description: "Kombinasi unik antara kesehatan klasik & thibbun nabawi",
  },
  {
    number: "02",
    title: "Pengajar Berpengalaman",
    description: "Ust Abdurahman Dani memiliki pengalaman luas dalam kesehatan Arab Klasik & Thibbun Nabawi",
  },
  {
    number: "03",
    title: "Pendekatan Personal",
    description: "Materi disesuaikan dengan kebutuhan individu",
  },
  {
    number: "04",
    title: "Kelas Interaktif",
    description: "Interaksi langsung dengan pengajar dalam sesi online & Offline",
  },
  {
    number: "05",
    title: "Testimoni Terbukti",
    description: "Banyak alumni & pasien merasakan manfaat nyata",
  },
];

export const Features = () => {
  return (
    <div className="mx-auto w-[1080px]">
      <div className="flex flex-row gap-10">
        <div className="w-1/2 space-y-5">
          <h1 className="text-green-600">
            <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">5 Alasan Utama </span>
          </h1>
          <h2>Kenapa harus belajar di Akademi Ath Thibbul Badil ?</h2>
        </div>

        <div className="w-1/2">
          {contentData.map((item, index) => (
            <div className="mb-6 flex items-start gap-4" key={index}>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                <span className="text-sm font-semibold text-yellow-600">{item.number}</span>
              </div>

              <div className="mb-5 flex-grow">
                <h4 className="text-black">{item.title}</h4>
                <p className="text-base font-normal tracking-normal text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
