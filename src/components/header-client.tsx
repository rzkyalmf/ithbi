"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { AuthPayload } from "@/libs/server.auth";

import { Button } from "./ui/button";

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text }) => (
  <Link href={href}>
    <h5 className="transition-colors duration-300 hover:text-yellow-500">
      {text}
    </h5>
  </Link>
);

interface HeaderClientProps {
  auth: AuthPayload | null;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ auth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="mx-auto mt-6 w-full max-w-7xl px-10 sm:px-10 lg:px-10 xl:px-0">
      <div className="flex items-center justify-between py-6">
        <Link href="/">
          <Image
            src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi%201.png"
            alt="logo"
            width={60}
            height={60}
          />
        </Link>
        {/* Menu Desktop */}
        <div className="hidden gap-12 md:flex">
          <NavLink href="/" text="Home" />
          <NavLink href="/program" text="Program" />
          <NavLink href="/kelas-online" text="Kelas Online" />
          <NavLink href="/events" text="Events" />
          <NavLink href="/tentang-kami" text="Tentang Kami" />
          <NavLink href="/download-app" text="Download App" />
        </div>
        <div className="hidden gap-3 md:flex">
          {auth?.id ? (
            <Link href="/dashboard/kelas-online">
              <Button className="px-6 py-5" size="lg">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href={"/login"}>
                <Button size={"lg"} variant={"outline"} className="px-6 py-5">
                  Masuk
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button size={"lg"} variant={"default"} className="px-6 py-5">
                  Daftar
                </Button>
              </Link>
            </>
          )}
        </div>
        {/* Tombol Menu Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col gap-4 py-4">
            <NavLink href="/" text="Home" />
            <NavLink href="/program" text="Program" />
            <NavLink href="/kelas-online" text="Kelas Online" />
            <NavLink href="/events" text="Events" />
            <NavLink href="/tentang-kami" text="Tentang Kami" />
            <NavLink href="/download-app" text="Download App" />
            {auth?.id ? (
              <Link href="/dashboard/kelas-online">
                <Button className="w-fit" size="sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href={"/login"}>
                  <Button size={"lg"} variant={"outline"} className="px-6 py-5">
                    Masuk
                  </Button>
                </Link>
                <Link href={"/register"}>
                  <Button size={"lg"} variant={"default"} className="px-6 py-5">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
