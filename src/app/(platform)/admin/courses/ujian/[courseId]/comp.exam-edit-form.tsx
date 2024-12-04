"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { examDetailAtom, openExamEditModalAtom } from "@/context/atom";

import { updateExamAction } from "./action.edit-exam";

export const ExamEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openExamEditModalAtom);
  const [examDetail] = useAtom(examDetailAtom);

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
          <DialogTitle className="text-xl font-medium tracking-tight">
            Edit Exam
          </DialogTitle>
          <form
            action={async (formData) => {
              await updateExamAction(formData);
              setOpenModal(false);
            }}
            className="space-y-2"
          >
            <Input name="id" defaultValue={examDetail?.id} type="hidden" />
            <Input name="title" defaultValue={examDetail?.title} />
            <Button>Save</Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
