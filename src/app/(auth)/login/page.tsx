"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { loginAction } from "./action";

export default function Page() {
  const [state, formAction] = useActionState(loginAction, null);

  const getErrorMessage = () => {
    if (state?.status === "error") {
      if (state.message) return state.message;
      if (!state.data.email) return "Email tidak boleh kosong";
      if (!state.data.password) return "Password tidak boleh kosong";
      if (state.errors?.email) return state.errors.email;
      if (state.errors?.password) return state.errors.password;
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xl p-8 py-20">
        <div className="flex flex-col items-center justify-center gap-8 py-10 text-center">
          <Link href={"/"}>
            <Image
              src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi%201.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          <h1 className="text-4xl text-green-600 lg:text-5xl">
            <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">
              Login Akun
            </span>
          </h1>
          <p className="text-md font-normal text-gray-500">
            &quot;Masukan Id & Password Kamu Atau Masuk Melalui Media
            Sosial&quot;
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">Email :</label>
            <Input
              className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
              placeholder="abdullah@gmail.com"
              name="email"
              type="email"
              defaultValue={state?.data.email}
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-normal text-gray-800">
              Password :
            </label>
            <Input
              className="py-6 text-lg font-normal text-gray-500 placeholder:text-gray-300"
              placeholder="Password"
              name="password"
              type="password"
            />
          </div>

          <Button type="submit" className="w-full py-6">
            Masuk
          </Button>

          {errorMessage && (
            <div className="mt-4 text-red-600" role="alert">
              <p>{errorMessage}</p>
            </div>
          )}
        </form>

        <section className="py-10">
          <Link
            href="/"
            className="flex flex-row items-center justify-center gap-2 hover:text-green-600"
          >
            <ArrowLeft size={22} strokeWidth={1.4} />
            <p className="font-light tracking-normal">
              Kembali Ke Halaman Utama
            </p>
          </Link>
        </section>

        <Link href="/register">
          <Button
            variant={"outline"}
            type="submit"
            className="w-full py-6 font-normal"
          >
            Belum Memiliki Akun ? Klik Disini!
          </Button>
        </Link>
      </div>
    </div>
  );
}
