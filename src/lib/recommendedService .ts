import { getCurrentDbUser } from "@/lib/authService";
import { db } from "@/lib/db";

export const getRecommendedUsers = async () => {
  let userId;

  try {
    const currentDbUser = await getCurrentDbUser();
    userId = currentDbUser.id;
  } catch {
    userId = null;
  }

  let query = {};

  if (userId) {
    query = {
      where: {
        AND: [
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
      },
    };
  }

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    ...query,
  });

  return users;
};
