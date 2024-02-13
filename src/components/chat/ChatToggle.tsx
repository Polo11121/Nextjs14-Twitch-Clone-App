"use client";

import { useChatSidebar } from "@/store/useChatSidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint, Button } from "@/components/ui";

export const ChatToggle = () => {
  const { isOpen, collapseHandler, expandHandler } = useChatSidebar(
    (state) => state
  );

  const Icon = isOpen ? ArrowRightFromLine : ArrowLeftFromLine;
  const label = isOpen ? "Collapse chat" : "Expand chat";

  const toggleHandler = () => {
    if (isOpen) {
      collapseHandler();
    } else {
      expandHandler();
    }
  };

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={toggleHandler}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  );
};
