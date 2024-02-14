"use client";

import { follow, unfollow } from "@/actions/follow";
import { Button, Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type StreamActionsProps = {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
  hostName: string;
};

export const StreamActions = ({
  hostIdentity,
  isFollowing,
  isHost,
  hostName,
}: StreamActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();
  const router = useRouter();

  const toggleFollowHandler = () => {
    if (!userId) {
      router.push("/login", {});
      return;
    }
    if (isHost) {
      return;
    }

    startTransition(async () => {
      try {
        if (isFollowing) {
          await unfollow(hostIdentity);
          toast.success(`You are now following ${hostName}`);
        } else {
          await follow(hostIdentity);
          toast.success(`You are not longer following  ${hostName}`);
        }
      } catch {
        toast.error(
          isFollowing ? "Failed to unfollow user" : "Failed to follow user"
        );
      }
    });
  };

  return (
    <Button
      onClick={toggleFollowHandler}
      disabled={isPending || isHost}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const StreamActionsSkeleton = () => (
  <Skeleton className="h-10 w-full lg:w-24" />
);
