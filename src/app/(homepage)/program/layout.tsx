import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto max-w-7xl py-32">
      <h1 className="text-center text-4xl text-green-600 lg:text-5xl">
        <span className="rounded-lg border-b-2 bg-green-100 px-5 shadow-sm">
          Program Kami
        </span>
      </h1>
      <div>{children}</div>
    </div>
  );
}
