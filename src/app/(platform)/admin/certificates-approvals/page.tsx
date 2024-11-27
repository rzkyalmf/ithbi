import { Button } from "@/components/ui/button";
import { CertificateServices } from "@/services/certificate.services";

import { approveCertificateAction } from "./action";

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
                  <td>{cert.course.title}</td>
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
                  <td>
                    <form action={approveCertificateAction}>
                      <input
                        name="certificateId"
                        value={cert.id}
                        type="hidden"
                        required
                      />
                      <Button
                        disabled={
                          cert.status === "APPROVED" ||
                          cert.status === "NO_REQUEST"
                        }
                        className="w-fit"
                      >
                        Approve
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
