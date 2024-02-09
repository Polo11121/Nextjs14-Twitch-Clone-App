import { db } from "@/lib/db";
import { getCurrentDbUser } from "@/lib/authService";

export const isFollowingUser = async (id: string) => {
  try {
    const currentDbUser = await getCurrentDbUser();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === currentDbUser.id) {
      return true;
    }

    const isFollowing = await db.follow.findFirst({
      where: {
        followerId: currentDbUser.id,
        followingId: otherUser.id,
      },
    });

    return Boolean(isFollowing);
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const currentDbUser = await getCurrentDbUser();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === currentDbUser.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: currentDbUser.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following user");
  }

  const follow = await db.follow.create({
    data: {
      followerId: currentDbUser.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const currentDbUser = await getCurrentDbUser();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === currentDbUser.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: currentDbUser.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following user");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};

export const getFollowedUsers = async () => {
  try {
    const currentDbUser = await getCurrentDbUser();

    const followedUsers = db.follow.findMany({
      where: {
        followerId: currentDbUser.id,
        following: {
          blocking: {
            none: {
              blockedId: currentDbUser.id,
            },
          },
        },
      },
      include: {
        following: true,
      },
    });

    return followedUsers;
  } catch {
    return [];
  }
};
