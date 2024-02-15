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
  Hint,
  Input,
  Label,
} from "@/components/ui";
import { UploadDropzone } from "@/lib/uploadthing";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { UploadFileResponse } from "uploadthing/client";
import Image from "next/image";

type StreamInfoModalProps = {
  initialName?: string;
  initialThumbnailUrl?: string | null;
};

export const StreamInfoModal = ({
  initialName,
  initialThumbnailUrl,
}: StreamInfoModalProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const closeRef = useRef<ElementRef<typeof DialogClose>>(null);

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const uploadCompleteHandler = (
    res: UploadFileResponse<{
      fileUrl: string;
    }>[]
  ) => {
    setThumbnailUrl(res?.[0]?.url);
    router.refresh();
  };

  const removeThumbnailHandler = () => {
    startTransition(async () => {
      try {
        await updateStream({ thumbnailUrl: null });
        toast.success("Thumbnail removed");
        setThumbnailUrl(null);
        router.refresh();
      } catch {
        toast.error("Failed to remove thumbnail");
      }
    });
  };

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
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="remove thumbnail" asChild side="left">
                    <Button
                      type="button"
                      onClick={removeThumbnailHandler}
                      disabled={isPending}
                      className="w-auto h-auto p-1.5"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnailUrl}
                  alt="stream thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={uploadCompleteHandler}
                />
              </div>
            )}
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
