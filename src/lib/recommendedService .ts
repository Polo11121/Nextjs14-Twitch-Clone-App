import { getCurrentDbUser } from "@/lib/authService";
import { db } from "@/lib/db";

export const getRecommendedService = async () => {
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
        NOT: {
          id: userId,
        },
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
