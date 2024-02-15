import { Actions } from "@/app/(browse)/[username]/_components";
import { StreamPlayer } from "@/components/stream";
import { isBlockingUser, isCurrentUserBlocked } from "@/lib/blockService";
import { isFollowingUser } from "@/lib/followService";
import { getUserByUsername } from "@/lib/userService";
import { notFound } from "next/navigation";

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isBlocked = await isCurrentUserBlocked(user.id);

  if (isBlocked) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockingUser(user.id);

  return <StreamPlayer user={user} isFollowing={isFollowing} />;
};

export default UserPage;
