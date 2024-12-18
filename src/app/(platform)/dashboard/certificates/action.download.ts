"use server";

import fs from "fs/promises";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import { S3Services } from "@/services/s3.services";
import prisma from "@/utils/prisma";

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (currentLine.length + word.length + 1 <= maxChars) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export async function downloadCertificateAction(
  _: unknown,
  formData: FormData
) {
  try {
    const certificateId = formData.get("certificateId") as string;

    const certificate = await prisma.certificate.findFirst({
      where: { id: certificateId },
      include: { user: true, course: true },
    });

    if (!certificate) {
      return { success: false, error: "Sertifikat tidak ditemukan" };
    }

    const templatePath = path.resolve("public", "CertificateTemplate.pdf");
    const templateBytes = await fs.readFile(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];
    const { width, height } = page.getSize();

    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Nama peserta
    const name = certificate.user.name.toUpperCase();
    const nameWidth = helveticaBold.widthOfTextAtSize(name, 24);
    page.drawText(name, {
      x: (width - nameWidth) / 2,
      y: height / 2 + 50,
      size: 24,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    // Nama kelas dengan font lebih kecil
    const courseName = certificate.course?.title ?? "";
    const wrappedCourseLines = wrapText(courseName, 45); // Menambah max chars karena font lebih kecil
    const lineHeight = 20; // Mengurangi spasi antar baris
    const courseFontSize = 16; // Ukuran font dikurangi

    wrappedCourseLines.forEach((line, index) => {
      const courseTextWidth = helveticaBold.widthOfTextAtSize(
        line,
        courseFontSize
      );
      page.drawText(line, {
        x: (width - courseTextWidth) / 2,
        y: height / 2 - index * lineHeight,
        size: courseFontSize,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });
    });

    // Posisi untuk penilaian (tetap)
    const assessmentText = "Mumtaz Murta'fi";
    const startY = height / 2 - 88; // Posisi Y tetap
    const lineSpacing = 20;
    const xPosition = width / 2 + 48;

    // Akhlak & Adab
    page.drawText(assessmentText, {
      x: xPosition,
      y: startY,
      size: 12,
      font: helvetica,
      color: rgb(0, 0, 0),
    });

    // Kehadiran
    page.drawText(assessmentText, {
      x: xPosition,
      y: startY - lineSpacing,
      size: 12,
      font: helvetica,
      color: rgb(0, 0, 0),
    });

    // Tugas
    page.drawText(assessmentText, {
      x: xPosition,
      y: startY - lineSpacing * 2,
      size: 12,
      font: helvetica,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const fileName = `${certificate.userId}/${certificate.id}.pdf`;

    await S3Services.uploadFile({
      key: fileName,
      folder: "certificates",
      body: Buffer.from(pdfBytes),
    });

    return {
      success: true,
      data: pdfBytes,
      filename: `${certificate.user.name.replace(/\s+/g, "_")}_certificate.pdf`,
      contentType: "application/pdf",
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Gagal membuat sertifikat",
    };
  }
}
