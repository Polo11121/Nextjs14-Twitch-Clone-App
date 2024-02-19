"use client";

import { useTransition } from "react";
import { unblock } from "@/actions/block";
import { Button } from "@/components/ui";
import { toast } from "sonner";

type UnblockButtonProps = {
  userId: string;
};

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const blockHandler = () =>
    startTransition(async () => {
      try {
        await unblock(userId);
        toast.success("User unblocked");
      } catch {
        toast.error("Failed to unblock user");
      }
    });

  return (
    <Button
      disabled={isPending}
      onClick={blockHandler}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
