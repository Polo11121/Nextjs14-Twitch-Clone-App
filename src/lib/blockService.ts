import { getCurrentDbUser } from "@/lib/authService";
import { db } from "@/lib/db";

export const isBlockedByUser = async (id: string) => {
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
      return false;
    }

    const existingBlock = await db.block.findFirst({
      where: {
        blockerId: currentDbUser.id,
        blockedId: otherUser.id,
      },
    });

    return Boolean(existingBlock);
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const currentDbUser = await getCurrentDbUser();

  if (currentDbUser.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findFirst({
    where: {
      blockerId: currentDbUser.id,
      blockedId: otherUser.id,
    },
  });

  if (existingBlock) {
    throw new Error("Already blocked user");
  }

  const block = await db.block.create({
    data: {
      blockerId: currentDbUser.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const currentDbUser = await getCurrentDbUser();

  if (currentDbUser.id === id) {
    throw new Error("Cannot unblock yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findFirst({
    where: {
      blockerId: currentDbUser.id,
      blockedId: otherUser.id,
    },
  });

  if (!existingBlock) {
    throw new Error("Not blocking user");
  }

  const block = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};
