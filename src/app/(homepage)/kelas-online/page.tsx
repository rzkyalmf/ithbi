import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/libs/currency-format";
import { CourseServices } from "@/services/course.services";

export default async function Page() {
  const courses = await CourseServices.getAllCourses();

  return (
    <div className="space-y-28 py-10">
      <div className="mx-auto my-12 flex flex-col items-start gap-36 px-10 sm:px-10 lg:flex-row lg:gap-10 lg:px-10 xl:px-0">
        <div className="grid grid-cols-3 gap-10">
          {courses.map((course) => {
            return (
              <main key={course.id} className="relative space-y-4">
                <h3 className="text-green-600">{course.title}</h3>

                <div className="overflow-hidden rounded-xl bg-white">
                  <Image
                    src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/courses/${course.id}/${course.coverImage}`}
                    alt={course.title}
                    width={1000}
                    height={500}
                  />
                </div>

                {course.flashSales?.id && (
                  <div className="absolute right-4 top-4 z-10 rounded-lg bg-slate-950 px-3 py-2 font-bold text-white">Flash Sale!</div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" variant="default" className="col-span-2 w-full py-5 text-base">
                    {course.flashSales?.id ? currencyFormat(course.flashSales.newAmount) : currencyFormat(course.price)}
                  </Button>
                  <Link href={`/kelas-online/${course.slug}`}>
                    <Button size="sm" variant="outline" className="w-full py-5 text-base">
                      View
                    </Button>
                  </Link>
                </div>
              </main>
            );
          })}
        </div>
      </div>
    </div>
  );
}
