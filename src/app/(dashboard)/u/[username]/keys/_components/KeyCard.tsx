"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { CopyButton } from "@/app/(dashboard)/u/[username]/keys/_components";

type KeyCardProps = {
  value: string | null;
};

export const KeyCard = ({ value }: KeyCardProps) => {
  const [isShown, setIsShown] = useState(false);

  const showHandler = () => setIsShown(!isShown);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={isShown ? "text" : "password"}
              disabled
              placeholder="Stream key"
            />
            <CopyButton />
          </div>
          <Button size="sm" variant="link" onClick={showHandler}>
            {isShown ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};
