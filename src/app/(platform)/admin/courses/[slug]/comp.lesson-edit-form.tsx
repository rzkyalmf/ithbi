"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lessonDetailAtom, openLessonEditModalAtom } from "@/context/atom";

import { updateLessonAction } from "./action.edit-lesson";

export const LessonEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openLessonEditModalAtom);
  const [lessonDetail] = useAtom(lessonDetailAtom);

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
          <DialogTitle className="text-xl font-medium tracking-tight">
            Edit Lesson
          </DialogTitle>
          <form
            action={async (formData) => {
              await updateLessonAction(formData);
              setOpenModal(false);
            }}
            className="space-y-2"
          >
            <Input name="id" defaultValue={lessonDetail?.id} type="hidden" />
            <Input name="title" defaultValue={lessonDetail?.title} />
            <Input name="videoUrl" defaultValue={lessonDetail?.videoUrl} />
            <Button>Save</Button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
