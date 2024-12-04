import Image from "next/image";
import Link from "next/link";

import { TruncatedText } from "@/components/isomorphic/truncated-text";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { CourseServices } from "@/services/course.services";

export default async function Page() {
  const courses = await CourseServices.getAllCourses();

  return (
    <main className="space-y-8 p-12">
      <section className="flex items-center justify-between">
        <h3>Courses</h3>
        <Link href="/admin/courses/new">
          <Button className="w-full">Create course</Button>
        </Link>
      </section>
      <section className="grid grid-cols-4 gap-6">
        {courses.map((course) => {
          return (
            <div
              key={course.id}
              className="relative overflow-hidden rounded-xl border bg-white p-5 shadow-sm"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/courses/${course.id}/${course.coverImage}`}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <section className="space-y-3 p-4 border">
                <TruncatedText content={course.title} maxLength={28} />
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/admin/courses/${course.slug}/stats`}>
                    <Button variant={"outline"} className="w-full">
                      Stats
                    </Button>
                  </Link>
                  <Link href={`/admin/courses/${course.slug}`}>
                    <Button variant={"outline"} className="w-full">
                      Edit Content
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link href={`/admin/courses/ujian/${course.id}`}>
                    <Button variant={"outline"} className="w-full">
                      Tambah Ujian
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link href={`/admin/courses/edit/${course.id}`}>
                    <Button variant={"default"} className="w-full">
                      Edit Kelas
                    </Button>
                  </Link>
                </div>
              </section>
            </div>
          );
        })}
      </section>
    </main>
  );
}
