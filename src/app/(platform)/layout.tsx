import { CirclePlus, CircleUserRound, ContactRound, House, MonitorDown, Search, Settings, TvMinimalPlay, Wallet } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { LogoutButton } from "@/components/logout-btn";
import { Menu } from "@/components/menu-usepath";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import serverAuth from "@/libs/server.auth";

export default function Layout({ children }: React.PropsWithChildren) {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-[220px] flex-col justify-between border-slate-200 bg-white p-6 text-slate-950 md:flex">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center">
              <Image
                src="https://pub-b3bbd8acb34f4f18b3140380b48ae46d.r2.dev/ithbi%201.png"
                alt="logo"
                className="w-10 pb-5 sm:w-20"
                priority
                width={150}
                height={150}
              />
            </div>
            <div>
              <p className="pb-2 font-medium">Main Menu</p>
              <Menu href="/dashboard" icon={<House size={19} />}>
                Dashboard
              </Menu>
              <Menu href="/dashboard/kelas-online" icon={<TvMinimalPlay size={19} />}>
                Kelas Online
              </Menu>
              <Menu href="/dashboard/pembayaran" icon={<Wallet size={19} />}>
                Pembayaran
              </Menu>
            </div>
            <div>
              <p className="pb-2 font-medium">Settings</p>
              <Menu href="/dashboard/profile" icon={<CircleUserRound size={19} />}>
                Profile
              </Menu>
              <Menu href="/dashboard/setting" icon={<Settings size={19} />}>
                Setting
              </Menu>
            </div>
            {auth.role === "ADMIN" && (
              <div>
                <p className="pb-2 font-medium">Menu Admin</p>
                <Menu href="/admin/add-class" icon={<CirclePlus size={19} />}>
                  Tambah Kelas
                </Menu>
                <Menu href="/admin/users" icon={<ContactRound size={19} />}>
                  Users
                </Menu>
                <Menu href="/admin/form-download" icon={<MonitorDown size={19} />}>
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
          <header className="flex items-center justify-end gap-5 border-slate-200 bg-white p-4 sm:p-6">
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
