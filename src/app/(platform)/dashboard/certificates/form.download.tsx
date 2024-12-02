"use client";

import React, { useActionState } from "react";

import { Button } from "@/components/ui/button";

import { downloadCertificateAction } from "./action.download";

export const DownloadBtn = ({ certificateId }: { certificateId: string }) => {
  const [_, formAction, pending] = useActionState(
    downloadCertificateAction,
    null
  );

  return (
    <form action={formAction}>
      <input name="certificateId" value={certificateId} type="hidden" />
      <Button disabled={pending} variant="outline" size="sm" className="w-fit">
        Download Certificate
      </Button>
    </form>
  );
};
