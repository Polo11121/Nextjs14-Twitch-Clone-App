"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Input, Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ChatInfo } from "@/components/chat";

const TIMEOUT = 30000;

type ChatFormProps = {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isFollowing: boolean;
  isHidden: boolean;
  isFollowersOnly?: boolean;
  isDelayed?: boolean;
};

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isFollowing,
  isHidden,
  isFollowersOnly,
  isDelayed,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!value || isDisabled) {
      return;
    }

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, TIMEOUT);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      className="flex flex-col items-center gap-y-4 p-3"
      onSubmit={submitHandler}
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={changeHandler}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            isFollowersOnly && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => (
  <div className="flex flex-col items-center gap-y-4 p-3">
    <Skeleton className="w-full h-10" />
    <div className="flex items-center gap-x-2 ml-auto">
      <Skeleton className="w-7 h-7" />
      <Skeleton className="h-7 w-12" />
    </div>
  </div>
);
