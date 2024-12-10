import { resend } from "@/utils/resend";

import { EventServices } from "./event.services";
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

  sendEventCode: async (userId: string, code: string, eventId: string) => {
    const user = await UserServices.findUser(userId);
    const event = await EventServices.getEventDetail(eventId);

    if (!event) {
      throw new Error("Event not found!");
    }

    if (user) {
      const { data, error } = await resend.emails.send({
        from: "ITHBI <admission@ithbi.id>",
        to: [user.email],
        subject: `Kode Ticket ${event.title}!`,
        html: `
          <p>Kode Ticket : <b>${code}</b></p>
          `,
      });

      console.log({ data, error });
    }
  },

  sendMultipleEventCodes: async (
    userId: string,
    codes: string[],
    eventId: string
  ) => {
    const user = await UserServices.findUser(userId);
    const event = await EventServices.getEventDetail(eventId);

    if (!event) {
      throw new Error("Event not found!");
    }

    if (user) {
      // Generate HTML untuk kode ticket sesuai jumlah codes
      const ticketCodesHTML = codes
        .map(
          (code, index) =>
            `<p>Kode Ticket ${(index + 1).toString()} : <b>${code}</b></p>`
        )
        .join("");

      const { data, error } = await resend.emails.send({
        from: "ITHBI <admission@ithbi.id>",
        to: [user.email],
        subject: `Kode Ticket ${event.title}!`,
        html: `
        ${ticketCodesHTML}
      `,
      });

      console.log({ data, error });
    }
  },
};
