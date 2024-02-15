import { Thumbnail, ThumbnailSkeleton } from "@/app/(browse)/_components";
import {
  LiveBadge,
  Skeleton,
  UserAvatar,
  UserAvatarSkeleton,
} from "@/components/ui";
import { User } from "@prisma/client";
import Link from "next/link";

type ResultCardProps = {
  data: {
    user: User;
    thumbnailUrl: string | null;
    isLive: boolean;
    name: string;
    id: string;
  };
};

export const ResultCard = ({ data }: ResultCardProps) => (
  <Link href={`/${data.user.username}`}>
    <div className="h-full w-full space-y-4">
      <Thumbnail
        src={data.thumbnailUrl}
        fallback={data.user.imageUrl}
        isLive={data.isLive}
        username={data.user.username}
      />
    </div>
    {data.isLive && (
      <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
        <LiveBadge />
      </div>
    )}
    <div className="flex gap-3">
      <UserAvatar
        username={data.user.username}
        imageUrl={data.user.imageUrl}
        isLive={data.isLive}
      />
      <div className="flex flex-col text-sm overflow-hidden">
        <p className="truncate font-semibold hover:text-blue-500">
          {data.name}
        </p>
        <div className="text-muted-foreground">{data.user.username}</div>
      </div>
    </div>
  </Link>
);

export const ResultCardSkeleton = () => (
  <div className="h-full w-full space-y-4">
    <ThumbnailSkeleton />
    <div className="flex gap-x-3">
      <UserAvatarSkeleton />
      <div className="flex flex-col gap-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  </div>
);
