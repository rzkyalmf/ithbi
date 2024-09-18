"use server";

import { z } from "zod";

const verifySchema = z.object({
  id: z.string(),
  code: z.string(),
});

export function pendaftaranAction(_state: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const code = formData.get("code") as string;

  console.log({ id, code });

  const validation = verifySchema.safeParse({
    id,
    code,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        id,
        code,
      },
    };
  }
}
