"use client";

import { useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { Skeleton, Switch } from "@/components/ui";
import { toast } from "sonner";

type FieldTypes = "isChatEnable" | "isChatDelayed" | "isChatFollowersOnly";

type ToggleCardProps = {
  field: FieldTypes;
  label: string;
  value: boolean;
};

export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const updateHandler = () =>
    startTransition(async () => {
      console.log("elo 2");
      try {
        await updateStream({ [field]: !value });
        toast.success("Chat settings updated!");
      } catch (error) {
        toast.error("Failed to update chat settings");
      }
    });

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={updateHandler}
            disabled={isPending}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => (
  <Skeleton className="rounded-xl p-10 w-full" />
);
