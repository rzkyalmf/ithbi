import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CourseServices } from "@/services/course.services";

import { PublishAction, unPublishAction } from "./action.publish";
import { AddSectionBtn } from "./comp.add-section";
import { LessonEditForm } from "./comp.lesson-edit-form";
import { SectionCard } from "./comp.section-card";
import { SectionEditForm } from "./comp.section-edit-form";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const course = await CourseServices.getCourseDetail(params.slug);

  if (!course) {
    redirect("/admin/courses");
  }

  return (
    <main className="m-auto max-w-2xl space-y-8">
      <section className="space-y-4">
        <h3>{course.title}</h3>
        <p className="text-slate-500 font-normal">{course.description}</p>
        {!course.isPublished ? (
          <form action={PublishAction}>
            <input name="courseId" value={course.id} type="hidden" />
            <Button className="w-fit">Publish Course</Button>
          </form>
        ) : (
          <form action={unPublishAction}>
            <input name="courseId" value={course.id} type="hidden" />
            <Button variant="outline" className="w-fit">
              Unpublish Course
            </Button>
          </form>
        )}
      </section>

      <section className="space-y-8">
        <section className="space-y-4">
          {course.sections.map((section) => {
            return <SectionCard key={section.id} section={section} />;
          })}
        </section>

        <AddSectionBtn courseId={course.id} />
      </section>
      <LessonEditForm />
      <SectionEditForm />
    </main>
  );
}
