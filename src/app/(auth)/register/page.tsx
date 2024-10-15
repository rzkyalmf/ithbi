"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { registrationAction } from "./action";

export default function Page() {
  const [state, formAction] = useActionState(registrationAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xl p-8 py-20">
        <div className="flex flex-col items-center justify-center gap-8 py-10 text-center">
          <Link href={"/"}>
            <Image src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi%201.png" alt="logo" width={100} height={100} />
          </Link>

          <h1 className="text-4xl text-green-600 lg:text-5xl">
            <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">Registrasi Akun</span>
          </h1>
          <p className="text-md font-normal text-gray-500">
            &quot;Lengkapi Email & Password Kamu, Atau Masuk Melalui Media Sosial&quot;
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">Nama :</label>
            <Input
              className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
              placeholder="abdullah"
              name="name"
              defaultValue={state?.data?.name}
            />
            {state?.errors && <p className="text-red-500">{state.errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">Email :</label>
            <Input
              className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
              placeholder="abdullah@gmail.com"
              name="email"
              type="email"
              defaultValue={state?.data?.email}
            />
            {state?.errors && <p className="text-red-500">{state.errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">No Telephone :</label>
            <Input
              className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
              placeholder="+62"
              name="phone"
              type="number"
              defaultValue={state?.data?.phoneNumber}
            />
            {state?.errors && <p className="text-red-500">{state.errors.phoneNumber}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">Password :</label>
            <Input
              className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
              placeholder="Password"
              name="password"
              type="password"
            />
            {state?.errors && <p className="text-red-500">{state.errors.password}</p>}
          </div>

          {/* <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">Kode Referral :</label>
            <Input
              className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
              placeholder="Kosongkan Jika Tidak Ada!"
              name="kode"
            />
          </div> */}

          <Button type="submit" className="w-full py-6">
            Register
          </Button>
        </form>

        <section className="py-10">
          <Link href="/" className="flex flex-row items-center justify-center gap-2 hover:text-green-600">
            <ArrowLeft size={22} strokeWidth={1.4} />
            <p className="font-light tracking-normal">Kembali Ke Halaman Utama</p>
          </Link>
        </section>
      </div>
    </div>
  );
}
