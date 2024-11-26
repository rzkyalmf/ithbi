import Link from "next/link";
import { redirect } from "next/navigation";

import { CourseServices } from "@/services/course.services";


type Params = Promise<{
  slug: string;
  lessonSlug: string;
}>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params

  const course = await CourseServices.getCourseDetail(params.slug);
  const lesson = await CourseServices.getLessonDetail(params.lessonSlug);

  if (!lesson) {
    redirect("/dashboard/my-courses");
  }

  return (
    <main className="flex h-screen">
      <aside className="w-[300px] border-r">
        {course?.sections.map((section) => {
          return (
            <div key={section.id}>
              <h4 className="p-2">{section.title}</h4>
              {section.lessons.map((lesson) => {
                return (
                  <Link key={lesson.id} href={`/dashboard/kelas-online/${course.slug}/${lesson.slug}`} className="block">
                    <div className="p-2 hover:bg-indigo-600 hover:text-white">{lesson.title}</div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </aside>
      <section className="w-[calc(100%-300px)] space-y-8 p-12">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${lesson.videoUrl}`}
          allowFullScreen
          className="h-[70vh] rounded-xl"
        ></iframe>
      </section>
    </main>
  );
}
