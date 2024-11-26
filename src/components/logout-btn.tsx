/* eslint-disable @typescript-eslint/require-await */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "./ui/button";

async function logoutAction() {
  "use server";

  const cookie = await cookies();
  cookie.set({
    name: "token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  redirect("/login");
}

export async function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" className="w-full">
        Logout
      </Button>
    </form>
  );
}
