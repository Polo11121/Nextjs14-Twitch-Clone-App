"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button, Hint, Skeleton } from "@/components/ui";
import { useSidebar } from "@/store/useSidebar";
import { useCreatorSidebar } from "@/store/useCreatorSidebar";

type SidebarToggleProps = {
  sidebarLabel: string;
  store: "sidebar" | "creatorSidebar";
};

export const SidebarToggle = ({ sidebarLabel, store }: SidebarToggleProps) => {
  const useStore = store === "sidebar" ? useSidebar : useCreatorSidebar;
  const { isOpen, collapseHandler, expandHandler } = useStore((state) => state);

  const label = isOpen ? "Collapse sidebar" : "Expand sidebar";

  return isOpen ? (
    <div className="p-3 pl-6 mb-2 flex items-center w-full">
      <p className="font-semibold text-primary">{sidebarLabel}</p>
      <Hint label={label} side="right" asChild>
        <Button
          onClick={collapseHandler}
          className="h-auto p-2 ml-auto"
          variant="ghost"
        >
          <ArrowLeftFromLine className="h-4 w-4" />
        </Button>
      </Hint>
    </div>
  ) : (
    <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
      <Hint label={label} side="right" asChild>
        <Button onClick={expandHandler} variant="ghost" className="h-auto p-2">
          <ArrowRightFromLine className="h-4 w-4" />
        </Button>
      </Hint>
    </div>
  );
};

export const SidebarToggleSkeleton = () => (
  <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
    <Skeleton className="h-6 w-[100px]" />
    <Skeleton className="h-6 w-6" />
  </div>
);
