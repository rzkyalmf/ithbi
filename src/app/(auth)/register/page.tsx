"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xl p-8 py-20">
        <div className="flex flex-col items-center justify-center gap-8 py-10 text-center">
          <Image src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi%201.png" alt="logo" width={100} height={100} />

          <h1 className="text-4xl text-green-600 lg:text-5xl">
            <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Registrasi Akun</span>
          </h1>
          <p className="text-md font-normal text-gray-500">
            &quot;Lengkapi Email & Password Kamu, Atau Masuk Melalui Media Sosial&quot;
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">Nama :</label>
            <Input className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300" placeholder="abdullah" name="name" />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">Email :</label>
            <Input
              className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
              placeholder="abdullah@gmail.com"
              name="email"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">Password :</label>
            <Input
              className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
              placeholder="Password"
              name="password"
              type="password"
            />
          </div>

          <Button type="submit" className="w-full py-6">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
