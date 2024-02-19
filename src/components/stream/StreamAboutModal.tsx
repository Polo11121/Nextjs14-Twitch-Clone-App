"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import { updateUser } from "@/actions/user";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
} from "@/components/ui";
import { toast } from "sonner";

type StreamAboutModalProps = {
  initialValue: string | null;
};

export const StreamAboutModal = ({ initialValue }: StreamAboutModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || "");
  const closeRef = useRef<ElementRef<typeof DialogClose>>(null);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      startTransition(async () => {
        await updateUser({ bio: value });
        toast("User bio updated");
        closeRef.current?.click();
      });
    } catch {
      toast.error("Failed to update user bio");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={submitHandler}>
          <Textarea
            disabled={isPending}
            placeholder="User bio"
            className="resize-none"
            value={value}
            onChange={changeHandler}
          />
          <div className="flex justify-between">
            <DialogClose>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
