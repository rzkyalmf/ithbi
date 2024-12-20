import {
  Award,
  CalendarCheck2,
  CalendarPlus,
  ChartNoAxesCombined,
  CirclePlus,
  ContactRound,
  FileBadge2,
  House,
  MonitorDown,
  Search,
  Ticket,
  TicketPercent,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { LogoutButton } from "@/components/logout-btn";
import { Menu } from "@/components/menu-usepath";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import serverAuth from "@/libs/server.auth";

export default async function Layout({ children }: React.PropsWithChildren) {
  const auth = await serverAuth();

  if (!auth) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[220px] flex-col justify-between p-6 text-slate-950 md:flex">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center">
              <Link href="/">
                <Image
                  src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi%201.png"
                  alt="logo"
                  className="w-10 pb-5 sm:w-20"
                  priority
                  width={150}
                  height={150}
                />
              </Link>
            </div>
            <div>
              <p className="pb-2 font-medium">Main Menu</p>
              <Menu href="/dashboard/kelas-online" icon={<House size={19} />}>
                Dashboard
              </Menu>
              <Menu href="/dashboard/events" icon={<Ticket size={19} />}>
                Tiket Acara
              </Menu>
              <Menu
                href="/dashboard/certificates"
                icon={<FileBadge2 size={19} />}
              >
                Sertifikat
              </Menu>
              <Menu href="/dashboard/pembayaran" icon={<Wallet size={19} />}>
                Pembayaran
              </Menu>
            </div>
            {auth.role === "ADMIN" && (
              <div>
                <p className="pb-2 font-medium">Menu Admin</p>
                <Menu href="/admin/courses" icon={<CirclePlus size={19} />}>
                  Tambah Kelas
                </Menu>
                <Menu href="/admin/events" icon={<CalendarPlus size={19} />}>
                  Buat Event
                </Menu>
                <Menu href="/admin/tickets" icon={<CalendarCheck2 size={19} />}>
                  Cek Tiket
                </Menu>
                <Menu
                  href="/admin/flash-sales"
                  icon={<TicketPercent size={19} />}
                >
                  Flash Sale
                </Menu>
                <Menu
                  href="/admin/certificates-approvals"
                  icon={<Award size={19} />}
                >
                  Certificate
                </Menu>
                <Menu
                  href="/admin/analytics"
                  icon={<ChartNoAxesCombined size={19} />}
                >
                  Analytics
                </Menu>
                <Menu href="/admin/users" icon={<ContactRound size={19} />}>
                  Users
                </Menu>
                <Menu
                  href="/admin/form-download"
                  icon={<MonitorDown size={19} />}
                >
                  Data Form
                </Menu>
              </div>
            )}
          </div>

          <div>
            <LogoutButton />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <header className="flex items-center justify-end gap-5 p-4 sm:p-6">
            <Search className="text-slate-400" size={20} />
            <button className="rounded-full bg-slate-100 p-2 hover:bg-slate-200">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
            </button>
          </header>
          <div className="m-3 mr-8 rounded-xl border p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
