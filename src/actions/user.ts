"use server";

import { getCurrentDbUser } from "@/lib/authService";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { db } from "@/lib/db";

export const updateUser = async (values: Partial<User>) => {
  const currentDbUser = await getCurrentDbUser();

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: {
      id: currentDbUser.id,
    },
    data: { ...validData },
  });

  revalidatePath(`/u/${currentDbUser.username}`);
  revalidatePath(`/${currentDbUser.username}`);

  return user;
};
