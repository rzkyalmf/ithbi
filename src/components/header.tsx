"use server";

import serverAuth from "@/libs/server.auth";

import { HeaderClient } from "./header-client";

export async function Header() {
  const auth = await serverAuth();

  return <HeaderClient auth={auth} />;
}
