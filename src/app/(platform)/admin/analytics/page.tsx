import React from "react";

import { Card } from "@/components/isomorphic/card";
import { TruncatedText } from "@/components/isomorphic/truncated-text";
import { currencyFormat } from "@/libs/currency-format";
import { formatDate } from "@/libs/dates-format";
import { TransactionServices } from "@/services/transaction.services";
import prisma from "@/utils/prisma";

export default async function Page() {
  const transactions = await TransactionServices.getTransactions();
  const currentRevenues = await TransactionServices.getCurrentRevenues();
  const totalUsers = await prisma.user.count();
  const totalCourses = await prisma.course.count();

  return (
    <main className="space-y-4 py-12">
      <section className="space-y-2 px-12">
        <h3>Analytics</h3>
        <p className="text-slate-500 font-normal">Here is all time analytics</p>
      </section>
      <section className="grid grid-cols-3 gap-4 px-12">
        <Card>
          <h2>{currencyFormat(currentRevenues)}</h2>
          <p>Current Revenues</p>
        </Card>
        <Card>
          <h2>{totalUsers}</h2>
          <p>Total Users</p>
        </Card>
        <Card>
          <h2>{totalCourses}</h2>
          <p>Total Course</p>
        </Card>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200 bg-white text-left">
            <tr>
              <th className="w-[10%] py-5 pl-12">No</th>
              <th className="w-[20%]">Kelas</th>
              <th className="w-[20%]">Event</th>
              <th className="w-[20%]">User</th>
              <th className="w-[10%]">Harga</th>
              <th className="w-[10%]">Status</th>
              <th className="w-[10%]">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <tr
                  className="border-b text-slate-500 font-normal"
                  key={transaction.id}
                >
                  <td className="py-5 pl-12">{index + 1}</td>
                  <td className="pr-4">
                    <TruncatedText
                      content={transaction.course?.title}
                      maxLength={20}
                    />
                  </td>
                  <td className="pr-4">
                    <TruncatedText
                      content={transaction.event?.title}
                      maxLength={25}
                    />
                  </td>
                  <td className="pr-4">
                    <TruncatedText
                      content={transaction.user.name}
                      maxLength={25}
                    />
                  </td>
                  <td>{currencyFormat(transaction.amount)}</td>
                  <td>
                    {transaction.paymentStatus === "UNPAID" ? (
                      <div className="msg w-fit  msg-error text-sm font-normal">
                        {transaction.paymentStatus}
                      </div>
                    ) : (
                      <div className="msg w-fit msg-success text-sm font-normal">
                        {transaction.paymentStatus}
                      </div>
                    )}
                  </td>
                  <td>{formatDate(transaction.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
