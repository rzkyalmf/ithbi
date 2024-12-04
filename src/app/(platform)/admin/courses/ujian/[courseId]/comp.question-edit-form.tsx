"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { openQuestionEditModalAtom, questionDetailAtom } from "@/context/atom";

import { updateQuestionAction } from "./action.edit-question";

export const QuestionEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openQuestionEditModalAtom);
  const [questionDetail] = useAtom(questionDetailAtom);

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
          <DialogTitle className="text-xl font-medium tracking-tight">
            Edit Question
          </DialogTitle>
          <form
            action={async (formData) => {
              await updateQuestionAction(formData);
              setOpenModal(false);
            }}
            className="space-y-2"
          >
            <Input name="id" defaultValue={questionDetail?.id} type="hidden" />
            <Input name="title" defaultValue={questionDetail?.title} />
            <Button>Save</Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
