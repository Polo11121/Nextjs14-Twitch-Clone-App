"use client";

import { Button, LiveBadge, Skeleton, UserAvatar } from "@/components/ui";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/store";
import { cn } from "@/lib/utils";
import Link from "next/link";

type UserItemProps = {
  username: string;
  imageUrl: string;
  isLive?: boolean;
};

export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname();
  const isOpen = useSidebar(({ isOpen }) => isOpen);
  const isActive = pathname.includes(username);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        isOpen ? "justify-start" : "justify-center",
        isActive && "bg-accent"
      )}
    >
      <Link href={`/${username}`}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            !isOpen && "justify-center"
          )}
        >
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {isOpen && <p className="truncate">{username}</p>}
          {isOpen && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => (
  <li className="flex items-center gap-x-4 p-3 py-2">
    <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
    <div className="flex-1">
      <Skeleton className="h-6" />
    </div>
  </li>
);
