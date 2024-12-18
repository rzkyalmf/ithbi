"use client";

import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { downloadCertificateAction } from "./action.download";

export const DownloadBtn = ({ certificateId }: { certificateId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDownload = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("certificateId", certificateId);

      const result = await downloadCertificateAction(null, formData);

      if (result.success && result.url) {
        // Buka PDF di tab baru
        window.open(result.url, "_blank");
      } else {
        // Tampilkan error jika ada
        console.error(result.error);
        // Optional: tambahkan toast notification untuk error
      }
    });
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isPending}
      variant="outline"
      size="sm"
      className="w-fit"
    >
      {isPending ? "Generating..." : "Download Certificate"}
    </Button>
  );
};
