"use client";

import { Button, Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type NavItemProps = {
  Icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
};

export const NavItem = ({ Icon, label, href, isActive }: NavItemProps) => {
  const isOpen = useCreatorSidebar(({ isOpen }) => isOpen);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        isOpen ? "justify-start" : "justify-center",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", isOpen ? "mr-2" : "mr-0")} />
          {isOpen && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => (
  <li className="flex items-center gap-x-2 px-3 py-2">
    <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
    <div className="flex-1 hidden lg:block">
      <Skeleton className="h-6" />
    </div>
  </li>
);
