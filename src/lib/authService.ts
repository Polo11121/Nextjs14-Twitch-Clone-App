import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const getDbCurrentUser = async () => {
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

  return dbUser;
};
