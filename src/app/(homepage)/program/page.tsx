import Image from "next/image";
import React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselItemData {
  id: number;
  image: string;
  alt: string;
}

const carouselData: CarouselItemData[] = [
  { id: 1, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur1.png", alt: "picture" },
  { id: 2, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur2.png", alt: "picture" },
  { id: 3, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur3.png", alt: "picture" },
  { id: 4, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur4.jpg", alt: "picture" },
  { id: 5, image: "https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/program/brosur5.png", alt: "picture" },
];

export default function Page() {
  return (
    <div className="space-y-28 py-10">
      <div className="mx-auto my-12 flex flex-col items-start gap-36 px-10 sm:px-10 lg:flex-row lg:gap-10 lg:px-10 xl:px-0">
        <div className="items-center justify-start space-y-8 lg:w-1/2 lg:pr-8">
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

          <div className="space-y-4">
            <div>
              <h5 className="font-bold">1. Kelas Basic :</h5>
              <h5 className="lg:text-justify">
                <ul className="list-disc pl-6">
                  <li>Bulan Ke-1 : Bimbingan & Mentoring</li>
                  <li>Bulan Ke-2 : Privat & Mentoring</li>
                  <li>Bulan Ke-3 : Mentoring, Evaluasi & Bedah Kasus</li>
                </ul>
              </h5>
            </div>
            <div>
              <h5 className="font-bold">2. Tugas Basic :</h5>
              <h5 className="lg:text-justify">
                <ul className="list-disc pl-6">
                  <li>Merangkum Video Ustadz Abdurahman Dani</li>
                  <li>Kumpulkan 10 Data Pasien Dari Berbagai Kasus (5 Pasien Unsur Dingin & 5 Pasien Unsur Panas)</li>
                </ul>
              </h5>
            </div>
            <div>
              <h5 className="font-bold">3. Ujian Basic :</h5>
              <h5 className="lg:text-justify">
                <ul className="list-disc pl-6">
                  <li>Ujian Standarisasi & Wawancara</li>
                </ul>
              </h5>
            </div>
            <div>
              <h5 className="font-bold">4. Kelas Advance :</h5>
              <h5 className="lg:text-justify">
                <ul className="list-disc pl-6">
                  <li>Bulan Ke-4 : Bimbingan & Mentoring</li>
                  <li>Bulan Ke-5 : Privat & Mentoring</li>
                  <li>Bulan Ke-6 : Mentoring, Evaluasi & Bedah Kasus</li>
                </ul>
              </h5>
            </div>
            <div>
              <h5 className="font-bold">5. Tugas Advance :</h5>
              <h5 className="lg:text-justify">
                <ul className="list-disc pl-6">
                  <li>Kumpulkan 10 Data Pasien Dari Berbagai Kasus (5 Pasien Unsur Dingin & 5 Pasien Unsur Panas)</li>
                  <li>Membantu Mengajar Privat Mentoring (Syarat Mengikuti Ujian & Menjadi Trainer)</li>
                </ul>
              </h5>
            </div>
            <div>
              <h5 className="font-bold">6. Ujian Advance :</h5>
              <h5 className="lg:text-justify">
                <ul className="list-disc pl-6">
                  <li>Ujian Standarisasi & Wawancara</li>
                </ul>
              </h5>
            </div>
            <div>
              <h5 className="font-bold">Biaya :</h5>
              <h5 className="lg:text-justify">
                <ul className="list-disc pl-6">
                  <li>Pendaftaran : Rp. 500.000</li>
                  <li>Biaya Kelas : Rp. 2.000.000</li>
                </ul>
              </h5>
              <h5 className="pt-2 text-sm font-light italic">
                *Bisa dicicil selama 4 Bulan dengan cicilan biaya bulanan hanya 500.000
              </h5>
            </div>
          </div>
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
