"use server";

import { redirect } from "next/navigation";

import serverAuth from "@/libs/server.auth";
import { TransactionServices } from "@/services/transaction.services";
import { UserServices } from "@/services/user.services";
import prisma from "@/utils/prisma";

export async function buyCourseAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const amount = formData.get("amount") as string;
  const slug = formData.get("slug") as string;

  const user = await serverAuth();

  if (!user) {
    redirect("/login");
  }

  const cekUser = await UserServices.findUser(user.id);

  if (cekUser?.coursesAccess.find((course) => course.courseId === courseId)) {
    redirect(`/dashboard/kelas-online/${slug}`);
  }

  // Free Transaction
  if (amount <= "499") {
    // update Transaction => Paid
    await TransactionServices.freeTransaction(
      courseId,
      user.id,
      Number(amount)
    );

    // create Access
    await prisma.courseAccess.create({
      data: {
        userId: user.id,
        courseId: courseId,
      },
    });

    // create certificate Placeholder
    await prisma.certificate.create({
      data: {
        userId: user.id,
        courseId: courseId,
      },
    });

    redirect(`/dashboard/kelas-online/${slug}`);
  }

  const data = await TransactionServices.createTransaction(
    courseId,
    user.id,
    Number(amount)
  );

  redirect(data.paymentLink);
}