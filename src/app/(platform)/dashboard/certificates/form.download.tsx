"use client";
import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { downloadCertificateAction } from "./action.download";

export const DownloadBtn = ({ certificateId }: { certificateId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDownload = () => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("certificateId", certificateId);
        const result = await downloadCertificateAction(null, formData);

        if (result.success && result.data) {
          // Buat blob dari PDF bytes
          const blob = new Blob([result.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);

          // Download file
          const link = document.createElement("a");
          link.href = url;
          link.download = result.filename;
          document.body.appendChild(link);
          link.click();

          // Cleanup
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          console.error(result.error ?? "Download failed");
        }
      } catch (error) {
        console.error("Error downloading certificate:", error);
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
