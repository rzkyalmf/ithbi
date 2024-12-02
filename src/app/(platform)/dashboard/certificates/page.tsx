import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { Card } from "@/components/isomorphic/card";
import { TruncatedText } from "@/components/isomorphic/truncated-text";
import { Button } from "@/components/ui/button";
import serverAuth from "@/libs/server.auth";
import { CourseServices } from "@/services/course.services";

import { requestCertificateAction } from "./action.request";
import { DownloadBtn } from "./form.download";

export default async function Page() {
  const auth = await serverAuth();

  if (!auth) {
    redirect("/login");
  }

  const userCourses = await CourseServices.getUserCourses(auth.id);

  return (
    <main className="m-auto max-w-2xl space-y-6 py-12">
      <section className="space-y-1">
        <h3>Certificates</h3>
        <p className="text-slate-500 font-normal">
          Here is your all available certificates
        </p>
      </section>
      <section className="space-y-6">
        {userCourses.map(({ course }) => {
          return (
            <Card
              key={course.id}
              className="flex items-center gap-6 rounded-xl p-4"
            >
              <Image
                src={`${process.env.R2_PUBLIC_URL}/ithbi-lms/courses/${course.id}/${course.coverImage}`}
                alt={course.title}
                width={140}
                height={140}
                className="rounded-lg"
              />
              <section className="space-y-3">
                <h3>
                  <TruncatedText content={course.title} />
                </h3>
                <div>
                  {course.certificates.map((certificate) => {
                    return (
                      <div key={certificate.id}>
                        {certificate.status === "APPROVED" && (
                          <DownloadBtn certificateId={certificate.id} />
                        )}
                        {certificate.status === "NO_REQUEST" && (
                          <form action={requestCertificateAction}>
                            <input
                              name="certificateId"
                              value={certificate.id}
                              type="hidden"
                            />
                            <Button
                              size="sm"
                              className="w-fit"
                              variant="outline"
                            >
                              Request Sertifikat
                            </Button>
                          </form>
                        )}
                        {certificate.status === "UNDER_REVIEW" && (
                          <p className="msg">Sertifkat sedang diproses</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </Card>
          );
        })}
      </section>
      {userCourses.length === 0 && (
        <Card className="text-balance bg-slate-50 text-center">
          <h5>You have no course</h5>
        </Card>
      )}
    </main>
  );
}
