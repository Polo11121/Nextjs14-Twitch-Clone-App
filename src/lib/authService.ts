import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const getCurrentDbUser = async () => {
  const user = await currentUser();

  if (!user || !user.username) {
    throw new Error("Unauthorized");
  }

  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: user.id,
    },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  if (user.username !== dbUser.username) {
    throw new Error("Unauthorized");
  }

  return dbUser;
};

export const getCurrentDbUserByUsername = async (username: string) => {
  const user = await currentUser();

  if (!user || !user.username) {
    throw new Error("Unauthorized");
  }

  const dbUser = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  if (user.username !== dbUser.username) {
    throw new Error("Unauthorized");
  }

  return dbUser;
};
