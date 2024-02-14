"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@/components/ui";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";

type StreamInfoModalProps = {
  initialName?: string;
  initialThumbnailUrl?: string | null;
};

export const StreamInfoModal = ({
  initialName,
  initialThumbnailUrl,
}: StreamInfoModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const closeRef = useRef<ElementRef<typeof DialogClose>>(null);

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault;

    startTransition(async () => {
      try {
        await updateStream({ name });
        toast.success("Stream name updated");
        closeRef.current?.click();
      } catch (err) {
        toast.success("Failed to update stream name");
      }
    });
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
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form className="space-y-14" onSubmit={submitHandler}>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              disabled={isPending}
              onChange={changeNameHandler}
              placeholder="Stream name"
              value={name}
            />
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
