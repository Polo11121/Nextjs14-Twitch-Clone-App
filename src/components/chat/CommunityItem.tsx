"use client";

import { cn, stringToColor } from "@/lib/utils";
import { Button, Hint } from "@/components/ui";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { block } from "@/actions/block";
import { toast } from "sonner";

type CommunityItemProps = {
  hostName: string;
  viewerName?: string;
  participantName?: string;
  participantIdentity: string;
};

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantIdentity === viewerName;
  const isHost = participantIdentity === hostName;

  const blockHandler = () => {
    if (!participantName || isSelf || !isHost) {
      return;
    }

    startTransition(async () => {
      {
        try {
          await block(participantIdentity);
          toast.success(`${participantName} has been blocked`);
        } catch {
          toast.error("Failed to block user");
        }
      }
    });
  };
  return (
    <div
      className={cn(
        "flex group items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p
        style={{
          color,
        }}
      >
        {participantName}
      </p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant="ghost"
            onClick={blockHandler}
            disabled={isPending}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle />
          </Button>
        </Hint>
      )}
    </div>
  );
};
