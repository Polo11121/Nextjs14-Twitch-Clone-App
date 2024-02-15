"use server";

import { getCurrentDbUser } from "@/lib/authService";
import { blockUser, unblockUser } from "@/lib/blockService";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const block = async (id: string) => {
  const currentDbUser = await getCurrentDbUser();
  let blockedUser;

  try {
    blockedUser = await blockUser(id);
  } catch {}

  try {
    await roomService.removeParticipant(currentDbUser.id, id);
  } catch {}

  revalidatePath(`/u/${currentDbUser.username}/community`);

  return blockedUser;
};

export const unblock = async (id: string) => {
  const unblockedUser = await unblockUser(id);

  revalidatePath("/");

  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }

  return unblockedUser;
};
