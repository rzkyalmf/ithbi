import Image from "next/image";
import Link from "next/link";
import React from "react";

import { TruncatedText } from "@/components/isomorphic/truncated-text";
import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/libs/currency-format";
import { CourseServices } from "@/services/course.services";

export default async function Page() {
  const courses = await CourseServices.getAllCourses();

  // Filter published courses first
  const publishedCourses = courses.filter((course) => course.isPublished);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="rounded-xl bg-green-100 bg-opacity-50 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedCourses.map((course) => (
            <main
              key={course.id}
              className="relative bg-white rounded-xl p-4 shadow-md"
            >
              <h4 className="text-black-600 h-10">
                <TruncatedText content={course.title} />
              </h4>

              <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                <Image
                  src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/courses/${course.id}/${course.coverImage}`}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                {course.flashSales?.id && (
                  <div className="absolute right-2 top-2 z-10 rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white">
                    Flash Sale!
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3">
                  <Link href={`/kelas-online/${course.slug}`} className="block">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full py-5 text-sm"
                    >
                      {course.flashSales?.id
                        ? currencyFormat(course.flashSales.newAmount)
                        : currencyFormat(course.price)}
                    </Button>
                  </Link>
                </div>
                <Link href={`/kelas-online/${course.slug}`} className="block">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full py-5 text-sm"
                  >
                    View
                  </Button>
                </Link>
              </div>
            </main>
          ))}
        </div>
      </div>
    </div>
  );
}
