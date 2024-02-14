"use client";

import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { LiveVideo, LoadingVideo, OfflineVideo } from "@/components/stream";
import { Skeleton } from "@/components/ui";

type VideoProps = {
  hostIdentity: string;
  hostName: string;
};

export const Video = ({ hostIdentity, hostName }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter(({ participant }) => participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
};

export const VideoSkeleton = () => (
  <div className="aspect-video border-x border-background">
    <Skeleton className="h-full w-full rounded-none" />
  </div>
);
