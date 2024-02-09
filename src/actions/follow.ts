"use server";

import { followUser, unfollowUser } from "@/lib/followService";
import { revalidatePath } from "next/cache";

export const follow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch {
    throw new Error("User not found");
  }
};

export const unfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch {
    throw new Error("User not found");
  }
};
