"use server";

import fontkit from "@pdf-lib/fontkit";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";

import { S3Services } from "@/services/s3.services";
import prisma from "@/utils/prisma";

export async function downloadCertificateAction(
  _: unknown,
  formData: FormData
) {
  const certificateId = formData.get("certificateId") as string;

  const certificate = await prisma.certificate.findFirst({
    where: {
      id: certificateId,
    },
    include: {
      user: true,
      course: true,
    },
  });

  if (!certificate) {
    redirect("/dashboard/certificates");
  }

  // reading file template
  const certificateTemplatePath = path.resolve(
    "public",
    "CertificateTemplate.pdf"
  );
  const certificateTemplate = await fs.readFile(certificateTemplatePath);
  const fontPath = path.resolve("public", "Inter-Bold.ttf");
  const font = await fs.readFile(fontPath);
  const pdfDoc = await PDFDocument.load(certificateTemplate);

  // first page of PDF
  const page = pdfDoc.getPage(0);
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(font);
  const letterSpacing = -5;

  // modify template
  let nameXPos = 132;
  for (const char of certificate.user.name) {
    page.drawText(char, {
      x: nameXPos,
      y: 480,
      size: 25,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    nameXPos += customFont.widthOfTextAtSize(char, 40) + letterSpacing;
  }

  let titleXPos = 190;
  for (const char of certificate.course?.title ?? "") {
    page.drawText(char, {
      x: titleXPos,
      y: 420,
      size: 16,
      color: rgb(0, 0, 0),
    });
    titleXPos += customFont.widthOfTextAtSize(char, 30) + letterSpacing;
  }

  // upload file ke S3
  const pdfBytes = await pdfDoc.save();

  await S3Services.uploadFile({
    key: `${certificate.userId}/${certificate.id}.pdf`,
    folder: "certificates",
    body: pdfBytes,
  });

  // redirect ke URL S3
  redirect(
    `${process.env.R2_PUBLIC_URL}/ithbi-lms/certificates/${certificate.userId}/${certificate.id}.pdf`
  );
}
