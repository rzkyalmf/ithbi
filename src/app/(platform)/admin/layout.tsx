import { redirect } from "next/navigation";
import React from "react";

import serverAuth from "@/libs/server.auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await serverAuth();

  if (auth?.role !== "ADMIN") {
    redirect("/dashboard/kelas-online");
  }

  return <div>{children}</div>;
}
