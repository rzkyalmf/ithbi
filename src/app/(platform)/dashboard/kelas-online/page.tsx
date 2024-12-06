import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { Card } from "@/components/isomorphic/card";
import { TruncatedText } from "@/components/isomorphic/truncated-text";
import { Button } from "@/components/ui/button";
import serverAuth from "@/libs/server.auth";
import { CourseServices } from "@/services/course.services";

export default async function Page() {
  const auth = await serverAuth();

  if (!auth) {
    redirect("/login");
  }

  const userCourses = await CourseServices.getUserCourses(auth.id);

  return (
    <main className="m-auto max-w-2xl space-y-6 py-12">
      <section className="space-y-1">
        <h3>Kelas Online</h3>
        <p className="text-slate-500 font-normal">Kelas yang telah anda beli</p>
      </section>
      <section className="space-y-8">
        {userCourses.map(({ course }) => {
          return (
            <div key={course.id} className="space-y-3">
              <Link
                href={`/dashboard/kelas-online/${course.slug}`}
                className="block"
              >
                <Card className="flex cursor-pointer items-center p-4 gap-6 space-y-0 rounded-xl border bg-white transition duration-200 hover:border-yellow-400 hover:shadow-md">
                  <Image
                    src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/courses/${course.id}/${course.coverImage}`}
                    alt={course.title}
                    width={140}
                    height={140}
                    className="rounded-lg"
                  />
                  <section className="space-y-1">
                    <h3>
                      <TruncatedText content={course.title} />
                    </h3>
                    <p className="font-normal">
                      <TruncatedText
                        content={course.description}
                        maxLength={100}
                      />
                    </p>
                  </section>
                </Card>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                asChild={
                  !course.exams.some((exam) => exam.lock) &&
                  course.exams[0]?.questions?.length > 0
                }
                disabled={
                  course.exams.some((exam) => exam.lock) ||
                  !course.exams[0]?.questions?.length
                }
              >
                {!course.exams.some((exam) => exam.lock) ? (
                  course.exams[0]?.questions?.length > 0 ? (
                    <Link href={`/dashboard/kelas-online/ujian/${course.slug}`}>
                      Mulai Ujian
                    </Link>
                  ) : (
                    <span>Ujian Belum Tersedia</span>
                  )
                ) : (
                  <span>Ujian Telah Selesai</span>
                )}
              </Button>
            </div>
          );
        })}

        {userCourses.length === 0 && (
          <Card className="text-balance bg-slate-50 text-center">
            <h5>Anda tidak punya kursus</h5>
          </Card>
        )}
      </section>
    </main>
  );
}
