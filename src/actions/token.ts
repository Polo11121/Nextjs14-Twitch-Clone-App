"use server";

import { v4 } from "uuid";
import { getCurrentDbUser } from "@/lib/authService";
import { getUserById } from "@/lib/userService";
import { isBlockingUser } from "@/lib/blockService";
import { AccessToken } from "livekit-server-sdk";

export const createViewerToken = async (hostIdentity: string) => {
  let currentDbUser;

  try {
    currentDbUser = await getCurrentDbUser();
  } catch {
    const id = v4();
    const username = `guest#${v4()}`;
    currentDbUser = {
      id,
      username,
    };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("Host not found");
  }

  const isBlocked = await isBlockingUser(host.id);

  if (isBlocked) {
    throw new Error("User is blocked");
  }

  const isHost = currentDbUser.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: isHost ? `host-${currentDbUser.id}` : currentDbUser.id,
      name: currentDbUser.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
