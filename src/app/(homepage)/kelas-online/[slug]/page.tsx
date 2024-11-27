import { CirclePlay, List, LockKeyhole, ScrollText } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Card } from "@/components/isomorphic/card";
import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/libs/currency-format";
import { CourseServices } from "@/services/course.services";

import { buyCourseAction } from "./action";
import { PreviewBtn } from "./components/preview";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const course = await CourseServices.getCourseDetail(params.slug);

  if (!course || !course.isPublished) {
    redirect("/");
  }

  return (
    <main className="my-20">
      <section className="bg-slate-800 rounded-b-3xl p-24 text-white">
        <div className="m-auto max-w-7xl space-y-4">
          <h2>{course.title}</h2>
          <h5 className="w-1/2 whitespace-pre-line font-light text-slate-300">
            {course.description}
          </h5>
        </div>
      </section>
      <section className="m-auto my-12 grid max-w-7xl grid-cols-3 gap-12">
        <div className="col-span-2 space-y-4">
          {course.sections.map((section) => {
            return (
              <main key={section.id} className="space-y-4">
                <h4 className="pt-5">{section.title}</h4>
                <div className="space-y-4">
                  {section.lessons.map((lesson) => {
                    return (
                      <Card
                        key={lesson.id}
                        className="flex items-center justify-between p-4 hover:border-yellow-400 hover:shadow-md"
                      >
                        <div className="flex items-center gap-2">
                          <CirclePlay size={17} />
                          {lesson.title}
                        </div>
                        {lesson.isPreview ? (
                          <PreviewBtn videoUrl={lesson.videoUrl} />
                        ) : (
                          <LockKeyhole className="text-slate-400" size={17} />
                        )}
                      </Card>
                    );
                  })}
                </div>
              </main>
            );
          })}
        </div>

        <Card className="-mt-32 h-fit space-y-2 bg-white p-4">
          <Image
            src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/courses/${course.id}/${course.coverImage}`}
            alt={course.title}
            width={1000}
            height={500}
            className="rounded-xl"
          />

          <div className="py-3 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ScrollText size={17} />
              <p className="pt-0.5 font-normal">
                {course.sections.length} Tema
              </p>
            </div>

            <div className="flex items-center gap-2">
              <List size={17} />
              <p className="pt-0.5 font-normal">
                {course.sections.reduce(
                  (acc, section) => acc + section.lessons.length,
                  0
                )}{" "}
                Pelajaran
              </p>
            </div>
          </div>

          <form action={buyCourseAction}>
            <input type="hidden" value={course.id} name="courseId" />
            <input type="hidden" value={course.slug} name="slug" />
            <input
              type="hidden"
              value={
                course.flashSales ? course.flashSales.newAmount : course.price
              }
              name="amount"
            />
            <Button className="w-full py-5">
              {" "}
              {currencyFormat(
                course.flashSales ? course.flashSales.newAmount : course.price
              )}
            </Button>
          </form>

          {course.flashSales ? (
            <div className="line-through text-center text-lg tracking-wide py-2 font-normal text-slate-700 italic">
              Harga {currencyFormat(course.price)}
            </div>
          ) : (
            <></>
          )}
        </Card>
      </section>
    </main>
  );
}
