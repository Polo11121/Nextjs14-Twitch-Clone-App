import { Actions } from "@/app/(browse)/[username]/_components";
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

  if (!user) {
    notFound();
  }

  const isBlocked = await isCurrentUserBlocked(user.id);

  if (isBlocked) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <p>{user.username}</p>
      <p>{user.externalUserId}</p>
      <Actions
        isFollowing={isFollowing}
        isBlocking={isBlocking}
        userId={user.id}
      />
    </div>
  );
};

export default UserPage;
