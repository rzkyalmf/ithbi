import React from "react";

import { currencyFormat } from "@/libs/currency-format";
import { formatDate } from "@/libs/dates-format";
import { TransactionServices } from "@/services/transaction.services";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const transactions = await TransactionServices.getTransactionsByCourse(
    params.slug
  );

  return (
    <main className="space-y-4 py-12">
      <section className="space-y-1 px-12">
        <h3>Course Statistic</h3>
        <p className="text-slate-500 font-normal">Here is all time analytics</p>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200 bg-white text-left">
            <tr>
              <th className="py-5 pl-12">No</th>
              <th>Student Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <tr key={transaction.id}>
                  <td className="py-5 pl-12">{index + 1}</td>
                  <td>{transaction.user.name}</td>
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
