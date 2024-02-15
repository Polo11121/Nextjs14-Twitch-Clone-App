"use client";

import { useSidebar } from "@/store";
import { Follow, Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "@/app/(browse)/_components";

type FollowedProps = {
  data: (Follow & {
    following: User & {
      stream: Pick<Stream, "isLive"> | null;
    };
  })[];
};

export const Followed = ({ data }: FollowedProps) => {
  const isOpen = useSidebar(({ isOpen }) => isOpen);

  return data.length ? (
    <div>
      {isOpen && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map(({ following: { id, username, imageUrl, stream } }) => (
          <UserItem
            imageUrl={imageUrl}
            key={id}
            username={username}
            isLive={stream?.isLive}
          />
        ))}
      </ul>
    </div>
  ) : null;
};

export const FollowedSkeleton = () => (
  <ul className="px-2 p5-2 lg:pt-0">
    {[...Array(3)].map((_, index) => (
      <UserItemSkeleton key={index} />
    ))}
  </ul>
);
