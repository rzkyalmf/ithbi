import Image from "next/image";
import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselItemData {
  id: number;
  image: string;
  alt: string;
}

const carouselData: CarouselItemData[] = [
  { id: 1, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur1.jpeg", alt: "picture" },
  { id: 2, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur2.jpeg", alt: "picture" },
  { id: 3, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur3.jpeg", alt: "picture" },
  { id: 4, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur4.jpeg", alt: "picture" },
  { id: 5, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur5.jpeg", alt: "picture" },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl space-y-28 py-64">
      <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
        <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Program Kami</span>
      </h1>

      <div className="mx-auto my-12 flex flex-col items-center gap-36 px-10 sm:px-10 lg:flex-row lg:gap-10 lg:px-10 xl:px-0">
        <div className="items-center justify-start space-y-8 pr-8 lg:w-1/2">
          <h2 className="font-medium leading-tight tracking-tight text-emerald-900">
            Solusi tepat sehatkan sakitmu, sayangi anak dan keluarga di masa sekarang maupun yang akan datang
          </h2>
          <h5 className="text-justify indent-14">
            &quot;Jangan hanya bisa mengantar anak istri kerumah sakit saja, Dorong kursi roda bayar mengikuti alur yg tak tentu arah
            tanpa kepastian Belajar sama sama ilmu Kesehatan sederhana sehat dari rumah hanya dengan merubah Pola Makan Agar kualitas
            hidup lebih baik untuk beribadah & kumpul bersama Anak Cucu di hari tua yg produktif nantinya, Belajar sekali seumur hidup
            Kesehatan Pola Makan Panas dan Dingin dengan Ust Abdurrahman Dani & Team Kupas tuntas Sehat dengan Pola Makan dan Diagnosa
            Karakter Panas dan Dingin Bonus Bimbingan dan Mentoring Group Selama 3 Bulan dan Bonus Zoom Privat khusus dengan team jika
            tidak di mengerti atau belum bisa di terapkan ilmunya Gratis Kelas Offline di Kantor ITHBI menyesuaikan waktu pengajar
            Daftar kan diri anda sekarang juga, Kuota Terbatas.&quot;
          </h5>
          <h5 className="text-justify">
            <ul className="list-disc space-y-5 pl-6">
              <li>
                <b>Pembelajaran Bulan Pertama</b> Via Zoom Online, Fokus Bimbingan dan Mentoring Kepada Memahami Diagnosa, Teori dan
                Cara Kerja.
              </li>
              <li>
                <b>Pembelajaran Bulan ke Dua</b> Via Zoom Online Private Bimbingan dan Mentoring Per Kelas zoom dibagi hanya 10 Orang
                Penjelasan Singkat Rangkuman Materi di bulan sebelumnya dan tanya Jawab khusus sampai benar2 memahami materinya.
              </li>
              <li>
                <b>Menyelenggarakan Riset Kesehatan</b> yang berlandaskan As-Sunnah dan inovatif.
              </li>
            </ul>
          </h5>
        </div>

        <Carousel className="lg:w-1/2">
          <CarouselContent>
            {carouselData.map((item) => (
              <CarouselItem key={item.id} className="flex justify-center">
                <Image width={500} height={500} src={item.image} alt={item.alt} className="w-10/12 rounded-xl" />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-4 flex justify-center">
            <CarouselPrevious
              className="relative inset-0 mx-2 translate-y-0"
              style={{
                color: "white",
                fontSize: "30px",
                background: "rgba(0,0,0,0.5)",
              }}
            />
            <CarouselNext
              className="relative inset-0 mx-2 translate-y-0"
              style={{
                color: "white",
                fontSize: "30px",
                background: "rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
