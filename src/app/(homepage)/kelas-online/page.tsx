import Image from "next/image";
import Link from "next/link";
import React from "react";

import { TruncatedText } from "@/components/isomorphic/truncated-text";
import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/libs/currency-format";
import { CourseServices } from "@/services/course.services";

export default async function Page() {
  const courses = await CourseServices.getAllCourses();

  return (
    <div className="space-y-28 py-10">
      <div className="mx-auto my-12 flex flex-col items-start gap-36 px-10 sm:px-10 lg:flex-row lg:gap-10 lg:px-10 xl:px-0">
        <div className="grid grid-cols-3 gap-10 rounded-xl bg-green-100 bg-opacity-50 px-20 py-14">
          {courses.map((course) => {
            return (
              <main key={course.id} className="relative space-y-4">
                <>
                  {course.isPublished ? (
                    <>
                      <h4 className="text-black-600">
                        <TruncatedText content={course.title} />
                      </h4>
                      <div className="overflow-hidden rounded-xl bg-white">
                        <Image
                          src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/courses/${course.id}/${course.coverImage}`}
                          alt={course.title}
                          width={1000}
                          height={500}
                        />
                      </div>

                      {course.flashSales?.id && (
                        <div className="absolute right-4 top-4 z-10 rounded-lg bg-red-600 px-3 py-2 font-bold text-white">
                          Flash Sale!
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-2">
                        <>
                          {course.flashSales?.id ? (
                            <Link
                              href={`/kelas-online/${course.slug}`}
                              className="col-span-2"
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className=" py-5 text-sm w-full space-x-2"
                              >
                                {currencyFormat(course.flashSales.newAmount)}
                              </Button>
                            </Link>
                          ) : (
                            <Link
                              href={`/kelas-online/${course.slug}`}
                              className="col-span-2"
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full py-5 text-sm"
                              >
                                {currencyFormat(course.price)}
                              </Button>
                            </Link>
                          )}
                        </>

                        <Link href={`/kelas-online/${course.slug}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full py-5 text-sm"
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </>
                  ) : null}
                </>
              </main>
            );
          })}
        </div>
      </div>
    </div>
  );
}
