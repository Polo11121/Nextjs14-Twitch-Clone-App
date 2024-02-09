"use server";

import { db } from "@/lib/db";
import { getCurrentDbUser } from "@/lib/authService";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const currentDbUser = await getCurrentDbUser();

    const currentDbUserStream = await db.stream.findUnique({
      where: {
        userId: currentDbUser.id,
      },
    });

    if (!currentDbUserStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const stream = await db.stream.update({
      where: {
        id: currentDbUserStream.id,
      },
      data: { ...validData },
    });

    revalidatePath(`/u/${currentDbUser.username}`);
    revalidatePath(`/${currentDbUser.username}`);
    revalidatePath(`/u/${currentDbUser.username}/chat`);

    return stream;
  } catch {
    throw new Error("Internal Error");
  }
};
