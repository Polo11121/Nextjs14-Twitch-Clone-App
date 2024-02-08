"use client";

import { ReactNode } from "react";
import { useSidebar } from "@/store";
import { cn } from "@/lib/utils";
import {
  ToggleSkeleton,
  RecommendedSkeleton,
} from "@/app/(browse)/_components";
import { useIsClient } from "usehooks-ts";

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
  const isOpen = useSidebar((state) => state.isOpen);
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
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
