"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsClient } from "usehooks-ts";
import { useSidebar } from "@/store/useSidebar";
import { useCreatorSidebar } from "@/store/useCreatorSidebar";
import { SidebarToggleSkeleton } from "@/components/ui";

type WrapperProps = {
  children: ReactNode;
  store: "sidebar" | "creatorSidebar";
  contentSkeleton: ReactNode;
};

export const SidebarWrapper = ({
  children,
  store,
  contentSkeleton,
}: WrapperProps) => {
  const useStore = store === "sidebar" ? useSidebar : useCreatorSidebar;
  const isOpen = useStore((state) => state.isOpen);
  const isClient = useIsClient();

  return isClient ? (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        !isOpen && "w-[70px]"
      )}
    >
      {children}
    </aside>
  ) : (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <SidebarToggleSkeleton />
      {contentSkeleton}
    </aside>
  );
};
