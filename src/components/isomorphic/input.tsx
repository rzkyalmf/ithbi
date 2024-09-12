"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const style = tv({
  base: "block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 font-normal shadow-md shadow-slate-100 transition duration-200 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#C2B59B]",
});

type TInput = VariantProps<typeof style>;
interface Props extends TInput, React.ComponentPropsWithRef<"input"> {}

export const Input = (props: Props) => {
  return <input {...props} className={twMerge(style({ ...props }), props.className)} />;
};
