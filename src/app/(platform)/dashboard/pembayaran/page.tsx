import { redirect } from "next/navigation";

import { currencyFormat } from "@/libs/currency-format";
import { formatDate } from "@/libs/dates-format";
import serverAuth from "@/libs/server.auth";
import { TransactionServices } from "@/services/transaction.services";

export default async function Page() {
  const user = await serverAuth();

  if (!user) {
    redirect("/login");
  }

  const transactions = await TransactionServices.getUserTransactions(user.id);

  return (
    <main className="space-y-6 py-12">
      <section className="space-y-1 px-12">
        <h3>Pesanan</h3>
        <p className="text-slate-500 font-normal">Riwayat dan Detail Pesanan</p>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="border-y border-slate-200 bg-white text-left">
            <tr>
              <th className="py-5 pl-12">No</th>
              <th>Judul Kelas</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Waktu</th>
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
                  <td>{transaction.course?.title}</td>
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
