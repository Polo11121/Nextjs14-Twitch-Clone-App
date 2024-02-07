"use client";

import { ReactNode } from "react";
import { useSidebar } from "@/store";
import { cn } from "@/lib/utils";

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
  const isOpen = useSidebar((state) => state.isOpen);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        !isOpen && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
