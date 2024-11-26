import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CourseServices } from "@/services/course.services";

import { AddSectionBtn } from "./comp.add-section";
import { LessonEditForm } from "./comp.lesson-edit-form";
import { SectionCard } from "./comp.section-card";
import { SectionEditForm } from "./comp.section-edit-form";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params

  const course = await CourseServices.getCourseDetail(params.slug);

  if (!course) {
    redirect("/admin/courses");
  }

  return (
    <main className="m-auto max-w-2xl space-y-8">
      <section className="space-y-2">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <Button size="sm" className="w-fit">
          Publish Course
        </Button>
      </section>

      <section className="space-y-2">
        <AddSectionBtn courseId={course.id} />

        <section>
          {course.sections.map((section) => {
            return <SectionCard key={section.id} section={section} />;
          })}
        </section>
      </section>
      <LessonEditForm />
      <SectionEditForm />
    </main>
  );
}
