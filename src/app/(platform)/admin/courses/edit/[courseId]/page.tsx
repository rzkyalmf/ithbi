import { CourseServices } from "@/services/course.services";

import { EditCourse } from "./comp.edit-consultant";

type Params = Promise<{ courseId: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const course = await CourseServices.getCourseDetail(params.courseId);

  return (
    <main className="m-auto max-w-lg space-y-6">
      <EditCourse
        id={course?.id}
        title={course?.title}
        description={course?.description}
        price={course?.price}
        coverImage={course?.coverImage}
      />
    </main>
  );
}
