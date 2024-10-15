import { resend } from "@/utils/resend";

import { UserServices } from "./user.services";

export const EmailServices = {
  sendVerificationCode: async (userId: string, code: string) => {
    const user = await UserServices.findUser(userId);

    if (user) {
      const { data, error } = await resend.emails.send({
        from: "ITHBI <admission@ithbi.id>",
        to: [user.email],
        subject: "Verifikasi Akun ITHBI!",
        html: `
          <p>Kode OTP : <b>${code}</b></p>
          <p>Link Verifikasi Akun : <a href="https://nukilan-salaf.vercel.app/verify/${userId}">Klik Disini!</a></p>
          `,
      });

      console.log({ data, error });
    }
  },
};
