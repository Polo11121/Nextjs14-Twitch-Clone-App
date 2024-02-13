"use client";

import { useRef, useState, useEffect } from "react";
import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";
import { FullScreenControl, VolumeControl } from "@/components/stream";
import { useEventListener } from "usehooks-ts";

type LiveVideoProps = {
  participant: Participant;
};

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach(({ publication }) => {
      if (videoRef.current) {
        publication.track?.attach(videoRef.current);
      }
    });

  const changeVolumeHandler = (value: number) => {
    setVolume(+value);

    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const muteToggleHandler = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  const fullScreenCHangeHandler = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrentlyFullScreen);
  };

  useEventListener("fullscreenchange", fullScreenCHangeHandler, wrapperRef);

  const toggleHandler = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    changeVolumeHandler(0);
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute  bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={changeVolumeHandler}
            onToggle={muteToggleHandler}
            value={volume}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleHandler}
          />
        </div>
      </div>
    </div>
  );
};
