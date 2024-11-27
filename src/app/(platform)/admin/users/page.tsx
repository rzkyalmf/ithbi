import { User } from "@prisma/client";
import React from "react";

import { UserServices } from "@/services/user.services";

import { BanUser } from "./comp.ban-user";
import { UnbanUser } from "./comp.unban-user";

export default async function Page() {
  const users: User[] = await UserServices.getAllUsers();

  return (
    <>
      <section className="pb-8 text-center">
        <h2 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight">
          Data Users Website ITHBI
        </h2>
        <p className="font-light tracking-normal text-gray-500">
          data-data users
        </p>
      </section>
      <table className="min-w-full bg-white">
        <thead className="border-y border-slate-200  bg-white text-sm font-semibold tracking-normal text-gray-700 sm:text-base">
          <tr>
            <th className="px-3 py-3">No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telephone</th>
            <th>Verifikasi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => {
            return (
              <tr
                key={data.id}
                className="border-b border-slate-200 bg-white text-center font-light tracking-normal text-gray-500"
              >
                <td className="px-3 py-3">{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phoneNumber}</td>
                <td>
                  {data.isVerified ? (
                    <p className="msg w-fit mx-auto msg-success text-sm font-normal">
                      Terverifikasi
                    </p>
                  ) : (
                    <p className="msg w-fit mx-auto msg-error text-sm font-normal">
                      Belum Terverifikasi
                    </p>
                  )}
                </td>
                <td>
                  {data.onBanned ? (
                    <UnbanUser userId={data.id} />
                  ) : (
                    <BanUser userId={data.id} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
