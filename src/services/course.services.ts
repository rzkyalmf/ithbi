import { Course, Exam, Lesson, Question, Section } from "@prisma/client";
import slugify from "slugify";

import prisma from "@/utils/prisma";

export const CourseServices = {
  createCourse: async (
    courseData: Pick<Course, "title" | "description" | "price" | "coverImage">
  ) => {
    try {
      const slug = slugify(courseData.title, { lower: true });

      const newCourse = await prisma.course.create({
        data: {
          title: courseData.title,
          slug,
          description: courseData.description,
          price: courseData.price,
          coverImage: courseData.coverImage,
        },
      });

      return newCourse;
    } catch (error) {
      console.log(error);
    }
  },

  updateCourse: async (
    id: string,
    title: string,
    description: string,
    price: number,
    coverImage?: string
  ) => {
    const slug = slugify(title, { lower: true });

    await prisma.course.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        description,
        price,
        coverImage,
      },
    });
  },

  createSection: async (courseId: string) => {
    const totalSection = await prisma.section.count({
      where: {
        courseId,
      },
    });

    await prisma.section.create({
      data: {
        title: `New section ${(totalSection + 1).toString()}`,
        courseId,
        index: totalSection,
      },
    });
  },

  createLesson: async (sectionId: string) => {
    const totalLesson = await prisma.lesson.count({
      where: {
        sectionId,
      },
    });

    await prisma.lesson.create({
      data: {
        sectionId,
        title: `New lesson ${(totalLesson + 1).toString()}`,
        slug: slugify(`New lesson ${totalLesson.toString()}`, { lower: true }),
        videoUrl: "-",
        index: totalLesson,
      },
    });
  },

  getAllCourses: async () => {
    const data = await prisma.course.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        flashSales: true,
        exams: true,
      },
    });

    return data;
  },

  getUserCourses: async (userId: string) => {
    const courseAccess = await prisma.courseAccess.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            certificates: true,
            exams: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });

    return courseAccess;
  },

  getCourseDetail: async (idOrSlug: string) => {
    const data = await prisma.course.findFirst({
      where: {
        OR: [
          {
            id: idOrSlug,
          },
          {
            slug: idOrSlug,
          },
        ],
      },
      include: {
        flashSales: true,
        sections: {
          include: {
            lessons: {
              orderBy: {
                index: "asc",
              },
            },
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    return data;
  },

  getLessonDetail: async (idOrSlug: string) => {
    const lesson = await prisma.lesson.findFirst({
      where: {
        OR: [
          {
            id: idOrSlug,
          },
          {
            slug: idOrSlug,
          },
        ],
      },
    });

    return lesson;
  },

  deleteSection: async (sectionId: string) => {
    await prisma.section.delete({
      where: {
        id: sectionId,
      },
    });
  },

  updateSection: async (section: Pick<Section, "id" | "title">) => {
    await prisma.section.update({
      where: {
        id: section.id,
      },
      data: {
        title: section.title,
      },
    });
  },

  deleteLesson: async (lessonId: string) => {
    await prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });
  },

  updateLesson: async (lesson: Pick<Lesson, "id" | "title" | "videoUrl">) => {
    await prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        title: lesson.title,
        slug: slugify(lesson.title, { lower: true }),
        videoUrl: lesson.videoUrl,
      },
    });
  },

  createExam: async (courseId: string) => {
    const totalExam = await prisma.exam.count({
      where: {
        courseId,
      },
    });

    await prisma.exam.create({
      data: {
        title: "Soal Ujian",
        courseId,
        index: totalExam,
        questions: {
          create: [
            {
              title: "...",
              index: 0,
            },
            {
              title: "...",
              index: 1,
            },
            {
              title: "...",
              index: 2,
            },
            {
              title: "...",
              index: 3,
            },
          ],
        },
      },
    });
  },

  deleteExam: async (examId: string) => {
    // Ambil exam yang akan dihapus untuk tahu indexnya
    const examToDelete = await prisma.exam.findUnique({
      where: { id: examId },
    });

    // Delete exam
    await prisma.exam.delete({
      where: { id: examId },
    });

    // Update index semua exam yang indexnya lebih besar
    await prisma.exam.updateMany({
      where: {
        courseId: examToDelete?.courseId,
        index: {
          gt: examToDelete?.index,
        },
      },
      data: {
        index: {
          decrement: 1,
        },
      },
    });
  },

  getCourseExam: async (idOrSlug: string) => {
    const data = await prisma.course.findFirst({
      where: {
        OR: [
          {
            id: idOrSlug,
          },
          {
            slug: idOrSlug,
          },
        ],
      },
      include: {
        exams: {
          include: {
            questions: {
              orderBy: {
                index: "asc",
              },
            },
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    return data;
  },

  updateExam: async (exam: Pick<Exam, "id" | "title">) => {
    await prisma.exam.update({
      where: {
        id: exam.id,
      },
      data: {
        title: exam.title,
      },
    });
  },

  updateQuestion: async (question: Pick<Question, "id" | "title">) => {
    await prisma.question.update({
      where: {
        id: question.id,
      },
      data: {
        title: question.title,
      },
    });
  },

  getQuestionDetail: async (questionId: string) => {
    const data = await prisma.question.findFirst({
      where: {
        id: questionId,
      },
    });

    return data;
  },
};
