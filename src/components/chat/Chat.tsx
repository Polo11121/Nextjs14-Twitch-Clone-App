"use client";

import { ChatVariant, useChatSidebar } from "@/store/useChatSidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  ChatCommunity,
  ChatForm,
  ChatFormSkeleton,
  ChatHeader,
  ChatHeaderSkeleton,
  ChatList,
  ChatListSkeleton,
} from "@/components/chat";

type ChatProps = {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled?: boolean;
  isChatDelayed?: boolean;
  isChatFollowersOnly?: boolean;
};

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const [value, setValue] = useState("");
  const { variant, expandHandler } = useChatSidebar((state) => state);
  const matches = useMediaQuery("(max-width: 1024px)");
  const { chatMessages: messages, send } = useChat();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  useEffect(() => {
    if (matches) {
      expandHandler();
    }
  }, [matches, expandHandler]);

  const reversedMessages = useMemo(
    () =>
      messages.sort(
        (message1, message2) => message2.timestamp - message1.timestamp
      ),
    [messages]
  );

  const changeHandler = (value: string) => setValue(value);

  const submitHandler = () => {
    if (!send) {
      return;
    }
    send(value);
    setValue("");
  };

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT ? (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={submitHandler}
            value={value}
            onChange={changeHandler}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      ) : (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};

export const ChatSkeleton = () => (
  <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
    <ChatHeaderSkeleton />
    <ChatListSkeleton />
    <ChatFormSkeleton />
  </div>
);
