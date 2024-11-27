import { Form } from "@prisma/client";
import React from "react";

import { formatDate } from "@/libs/dates-format";
import { FormServices } from "@/services/form.services";

export default async function Page() {
  const form: Form[] = await FormServices.getAllForm();

  return (
    <>
      <section className="pb-8 text-center">
        <h2 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight">
          Data Formulir Download Apps
        </h2>
        <p className="font-light tracking-normal text-gray-500">
          data-data yang download
        </p>
      </section>
      <table className="min-w-full bg-white">
        <thead className="border-y border-slate-200 bg-white text-sm font-semibold tracking-normal text-gray-700 sm:text-base">
          <tr>
            <th className="px-3 py-3">No</th>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">No Telephone</th>
            <th className="px-2 py-3">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {form.map((data, index) => {
            return (
              <tr
                key={data.id}
                className="border-b border-slate-200 bg-white text-center font-light tracking-normal text-gray-500"
              >
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phoneNumber}</td>
                <td>{formatDate(data.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
