import { resend } from "@/utils/resend";

import { FormServices } from "./form.services";

export const EmailServices = {
  sendVerificationCode: async (formulirId: string, code: string) => {
    const formulir = await FormServices.findForm(formulirId);

    if (formulir) {
      const { data, error } = await resend.emails.send({
        from: "ITHBI <admission@ithbi.id>",
        to: [formulir.email],
        subject: "Verifikasi Code ITHBI!",
        html: `
          <p>Kode OTP : <b>${code}</b></p>
          <p>Link Verifikasi Code Untuk Download Aplikasi : <a href="http://localhost:3000/pendaftaran/verify/${formulirId}">Klik Disini!</a></p>
          `,
      });

      console.log({ data, error });
    }
  },
};
