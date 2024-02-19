import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Skeleton,
  LiveBadge,
} from "@/components/ui";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
type UserAvatarProps = {
  imageUrl: string | null;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
} & VariantProps<typeof avatarSizes>;

export const UserAvatar = ({
  imageUrl,
  username,
  isLive,
  size,
  showBadge,
}: UserAvatarProps) => (
  <div className="relative">
    <Avatar
      className={cn(
        isLive && "ring-2 ring-rose-500 border border-background",
        avatarSizes({ size })
      )}
    >
      <AvatarImage src={imageUrl || ""} className="object-cover" />
      <AvatarFallback>
        {username[0]}
        {username[username.length - 1]}
      </AvatarFallback>
    </Avatar>
    {isLive && showBadge && (
      <div className="absolute -bottom-3 left-1/2 transform-translate-x-1/2">
        <LiveBadge />
      </div>
    )}
  </div>
);

export const UserAvatarSkeleton = ({
  size,
}: VariantProps<typeof avatarSizes>) => (
  <Skeleton className={cn(avatarSizes({ size }), "rounded-full")} />
);
