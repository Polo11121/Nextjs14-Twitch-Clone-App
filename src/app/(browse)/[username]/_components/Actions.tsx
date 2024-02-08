"use client";

import { useTransition } from "react";
import { follow, unfollow } from "@/actions/follow";
import { Button } from "@/components/ui";
import { toast } from "sonner";

type ActionsType = {
  isFollowing: boolean;
  userId: string;
};

export const Actions = ({ isFollowing, userId }: ActionsType) => {
  const [isPending, startTransition] = useTransition();
  const followHandler = () =>
    startTransition(async () => {
      try {
        const { following } = await follow(userId);

        toast.success(`You are now following ${following.username}`);
      } catch {
        toast.error("Failed to follow user");
      }
    });

  const unflollowHandler = () =>
    startTransition(async () => {
      try {
        const { following } = await unfollow(userId);

        toast.success(`You are not longer following ${following.username}`);
      } catch {
        toast.error("Failed to unfollow user");
      }
    });

  return (
    <Button
      disabled={isPending}
      onClick={isFollowing ? unflollowHandler : followHandler}
      variant="primary"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
