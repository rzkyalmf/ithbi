"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text }) => (
  <Link href={href}>
    <h5 className="transition-colors duration-300 hover:text-yellow-500">{text}</h5>
  </Link>
);

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="mx-auto mt-6 max-w-7xl px-10 sm:px-10 lg:px-10 xl:px-0">
      <div className="flex items-center justify-between py-6">
        <Link href="/">
          <Image src="/images/ithbi1.png" alt="logo" width={60} height={60} />
        </Link>

        {/* Menu Desktop */}
        <div className="hidden gap-12 md:flex">
          <NavLink href="/" text="Home" />
          <NavLink href="/program" text="Program Kami" />
          <NavLink href="/" text="Tentang Kami" />
          <NavLink href="/" text="Pendaftaran" />
        </div>

        {/* Tombol Menu Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col gap-4 py-4">
            <NavLink href="/" text="Home" />
            <NavLink href="/program" text="Program Kami" />
            <NavLink href="/" text="Tentang Kami" />
            <NavLink href="/" text="Pendaftaran" />
          </div>
        </div>
      )}
    </div>
  );
};
