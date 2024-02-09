"use client";

import { useTransition } from "react";
import { follow, unfollow } from "@/actions/follow";
import { Button } from "@/components/ui";
import { toast } from "sonner";
import { blockUser, unblockUser } from "@/lib/blockService";

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

  const blockHandler = () =>
    startTransition(async () => {
      try {
        await blockUser(userId);
        toast.success("User has been blocked");
      } catch {
        toast.error("Failed to block user");
      }
    });

  const unblockHandler = () =>
    startTransition(async () => {
      try {
        await unblockUser(userId);
        toast.success("User has been unblocked");
      } catch {
        toast.error("Failed to unblock user");
      }
    });

  return (
    <>
      <Button
        disabled={isPending}
        onClick={isFollowing ? unflollowHandler : followHandler}
        variant="primary"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={blockHandler} disabled={isPending}>
        Block
      </Button>
    </>
  );
};
