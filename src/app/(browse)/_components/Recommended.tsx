"use client";

import { useSidebar } from "@/store";
import { Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "@/app/(browse)/_components";

type RecommendedProps = {
  data: (User & {
    stream: Pick<Stream, "isLive"> | null;
  })[];
};

export const Recommended = ({ data }: RecommendedProps) => {
  const isOpen = useSidebar(({ isOpen }) => isOpen);
  const showLabel = Boolean(isOpen && data.length);

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map(({ id, username, imageUrl, stream }) => (
          <div key={id}>
            <UserItem
              key={id}
              imageUrl={imageUrl}
              username={username}
              isLive={stream?.isLive}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => (
  <ul className="px-2">
    {[...Array(3)].map((_, i) => (
      <UserItemSkeleton key={i} />
    ))}
  </ul>
);
