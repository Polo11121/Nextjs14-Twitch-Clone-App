"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { CheckCheck, Copy } from "lucide-react";

type CopyButtonProps = {
  value?: string;
};

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyHandler = () => {
    if (!value) {
      return;
    }
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={copyHandler}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
};
