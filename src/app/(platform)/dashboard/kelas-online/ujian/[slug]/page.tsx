import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CourseServices } from "@/services/course.services";

import { lockAction } from "./action.lock";
import { CompExam } from "./comp.exam";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const course = await CourseServices.getCourseExam(params.slug);

  if (!course) {
    redirect("/dashboard/kelas-online");
  }

  return (
    <main className="m-auto max-w-2xl space-y-8">
      <section className="space-y-4">
        <h3>Soal Ujian</h3>
        <p className="text-slate-500 font-normal">{course.title}</p>
      </section>

      <section className="space-y-8">
        <section className="space-y-4">
          {course.exams.map((exam) => {
            return <CompExam key={exam.id} exam={exam} />;
          })}
        </section>
      </section>

      <form action={lockAction}>
        <input name="courseId" defaultValue={course.id} hidden />
        <Button>Klik Untuk Menyelesaikan Ujian!</Button>
      </form>
    </main>
  );
}
