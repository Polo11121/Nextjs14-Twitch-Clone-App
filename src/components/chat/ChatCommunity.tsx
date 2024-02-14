"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { useParticipants } from "@livekit/components-react";
import { useDebounceValue } from "usehooks-ts";
import { Input, ScrollArea } from "@/components/ui";
import { CommunityItem } from "@/components/chat";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

type ChatCommunityProps = {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
};

export const ChatCommunity = ({
  hostName,
  viewerName,
  isHidden,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("");
  const [debounceValue] = useDebounceValue<string>(value, 500);
  const participants = useParticipants();

  const changeHandler = (newValue: ChangeEvent<HTMLInputElement>) =>
    setValue(newValue.target.value);
  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p?.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter(({ name }) =>
      name?.toLowerCase().includes(debounceValue.toLowerCase())
    );
  }, [debounceValue, participants]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={changeHandler}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filteredParticipants.map(({ identity, name }) => (
          <CommunityItem
            key={identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={name}
            participantIdentity={identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
