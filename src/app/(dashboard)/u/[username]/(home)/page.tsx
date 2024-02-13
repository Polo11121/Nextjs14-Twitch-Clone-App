import { StreamPlayer } from "@/components/stream";
import { getCurrentDbUser } from "@/lib/authService";
import { getUserByUsername } from "@/lib/userService";

type CreatorPageProps = {
  params: {
    username: string;
  };
};

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const currentDbUser = await getCurrentDbUser();
  const user = await getUserByUsername(params.username);

  if (!user || user?.externalUserId !== currentDbUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div>
      <StreamPlayer user={user} isFollowing />
    </div>
  );
};

export default CreatorPage;
