"use client";

import { useChatSidebar } from "@/store/useChatSidebar";
import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/lib/viewerService";
import { Stream, User } from "@prisma/client";
import {
  StreamHeader,
  StreamHeaderSkeleton,
  StreamInfoCard,
  Video,
} from "@/components/stream";
import { Chat, ChatSkeleton, ChatToggle } from "@/components/chat";
import { VideoSkeleton } from "@/components/stream";
import { cn } from "@/lib/utils";

type StreamPlayerProps = {
  user: User & { stream: Stream | null };
  isFollowing: boolean;
};

export const StreamPlayer = ({ user, isFollowing }: StreamPlayerProps) => {
  const { isOpen } = useChatSidebar((state) => state);
  const { identity, name, token } = useViewerToken(user.id);

  if (!token || !identity || !name) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {!isOpen && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-500">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        className={cn(
          "grid gird-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          !isOpen && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
          <StreamHeader
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={user?.stream?.name}
          />
          <StreamInfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={user.stream?.name}
            thumbnailUrl={user.stream?.thumbnailUrl}
          />
        </div>
        <div className={cn("col-span-1", !isOpen && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={user.stream?.isChatEnabled}
            isChatDelayed={user.stream?.isChatDelayed}
            isChatFollowersOnly={user.stream?.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => (
  <div className="grid grid-cols1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
    <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
      <VideoSkeleton />
      <StreamHeaderSkeleton />
    </div>
    <div className="col-span-1 bg-background">
      <ChatSkeleton />
    </div>
  </div>
);
