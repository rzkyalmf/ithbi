import { redirect } from "next/navigation";

import { CourseServices } from "@/services/course.services";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const course = await CourseServices.getCourseDetail(params.slug);

  if (!course) {
    redirect("/dashboard/kelas-online");
  }

  const firstLesson = course.sections[0].lessons[0].slug;
  redirect(`/dashboard/kelas-online/${course.slug}/${firstLesson}`);
}
