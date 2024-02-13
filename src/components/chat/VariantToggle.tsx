"use client";

import { ChatVariant, useChatSidebar } from "@/store/useChatSidebar";
import { MessageSquare, Users } from "lucide-react";
import { Hint, Button } from "@/components/ui";

export const VariantToggle = () => {
  const { variant, changeVariantHandler } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;
  const label = isChat ? "Community" : "Go back to chat";

  const toggleHandler = () => {
    if (isChat) {
      changeVariantHandler(ChatVariant.COMMUNITY);
    } else {
      changeVariantHandler(ChatVariant.CHAT);
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
