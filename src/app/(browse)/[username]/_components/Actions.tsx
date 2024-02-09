"use client";

import { useTransition } from "react";
import { follow, unfollow } from "@/actions/follow";
import { Button } from "@/components/ui";
import { toast } from "sonner";
import { block, unblock } from "@/actions/block";

type ActionsType = {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
};

export const Actions = ({ isFollowing, isBlocking, userId }: ActionsType) => {
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
        await block(userId);
        toast.success("User has been blocked");
      } catch {
        toast.error("Failed to block user");
      }
    });

  const unblockHandler = () =>
    startTransition(async () => {
      try {
        await unblock(userId);
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
      <Button
        onClick={isBlocking ? unblockHandler : blockHandler}
        disabled={isPending}
      >
        {isBlocking ? "Unblock" : "Block"}
      </Button>
    </>
  );
};
