import { redirect } from "next/navigation";

import { CourseServices } from "@/services/course.services";

import { AddExamBtn } from "./com.add-exam";
import { ExamCard } from "./com.exam-card";
import { ExamEditForm } from "./comp.exam-edit-form";
import { QuestionEditForm } from "./comp.question-edit-form";

type Params = Promise<{ courseId: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const course = await CourseServices.getCourseExam(params.courseId);

  if (!course) {
    redirect("/admin/courses");
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
            return <ExamCard key={exam.id} exam={exam} />;
          })}
        </section>

        <AddExamBtn courseId={course.id} />
      </section>
      <ExamEditForm />
      <QuestionEditForm />
    </main>
  );
}
