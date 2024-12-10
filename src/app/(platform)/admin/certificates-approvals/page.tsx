import { Button } from "@/components/ui/button";
import { CertificateServices } from "@/services/certificate.services";

import { approveCertificateAction } from "./action";
import { resetUjianAction } from "./action.reset-ujian";

export default async function Page() {
  const certificates = await CertificateServices.getAll();

  return (
    <main className="space-y-4">
      <section className="px-12 pt-12">
        <h3>Certificate Approvals</h3>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="rounded-xl border-y border-slate-200 bg-white">
            <tr className="text-left">
              <th className="py-5 pl-12">No</th>

              <th>Course</th>
              <th>Ujian</th>
              <th>Nilai Ujian</th>
              <th>User</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => {
              return (
                <tr
                  className="border-b text-slate-500 font-normal"
                  key={cert.id}
                >
                  <td className="py-5 pl-12">{index + 1}</td>
                  <td>{cert.course?.title}</td>
                  <td>
                    <div className="space-y-2">
                      {cert.course?.exams.some((exam) => exam.lock) ? (
                        <div className="msg w-fit msg-success text-sm font-normal">
                          Ujian Selesai
                        </div>
                      ) : (
                        <div className="msg w-fit msg-error text-sm font-normal">
                          Belum Ujian
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {cert.course?.exams.reduce((total, exam) => {
                      return total + (exam.result ? 10 : 0);
                    }, 0)}{" "}
                    / 100
                  </td>
                  <td>{cert.user.name}</td>
                  <td>
                    {cert.status === "APPROVED" ? (
                      <div className="msg w-fit  msg-success text-sm font-normal">
                        {cert.status}
                      </div>
                    ) : (
                      <div className="msg w-fit msg-error text-sm font-normal">
                        {cert.status}
                      </div>
                    )}
                  </td>
                  <td className="space-y-2 p-2">
                    <form action={approveCertificateAction}>
                      <input
                        name="certificateId"
                        value={cert.id}
                        type="hidden"
                        required
                      />
                      <Button
                        size="sm"
                        disabled={
                          cert.status === "APPROVED" ||
                          cert.status === "NO_REQUEST"
                        }
                        className="w-fit"
                      >
                        Approve
                      </Button>
                    </form>
                    <form action={resetUjianAction}>
                      <input
                        name="courseId"
                        value={cert.course?.id}
                        type="hidden"
                      />
                      <Button size="sm" type="submit">
                        Reset Ujian
                      </Button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
