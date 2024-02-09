"use client";

import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  NavItem,
  NavItemSkeleton,
} from "@/app/(dashboard)/u/[username]/_components";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user?.username) {
    return (
      <ul className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <NavItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  const { username } = user;

  const routes = [
    {
      label: "Stream",
      href: `/u/ ${username}`,
      Icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${username}/keys`,
      Icon: KeyRound,
    },
    { label: "Chat", href: `/u/${username}/chat`, Icon: MessageSquare },
    { label: "Community", href: `/u/${username}/community`, Icon: Users },
  ];

  return (
    <ul>
      {routes.map(({ label, href, Icon }) => (
        <NavItem
          key={href}
          label={label}
          Icon={Icon}
          href={href}
          isActive={pathname === href}
        />
      ))}
    </ul>
  );
};
