"use client";

import { ReactNode, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useCreatorSidebar, useSidebar } from "@/store";
import { cn } from "@/lib/utils";

type ContentContainerProps = {
  children: ReactNode;
  store: "sidebar" | "creatorSidebar";
};

export const ContentContainer = ({
  children,
  store,
}: ContentContainerProps) => {
  const useStore = store === "sidebar" ? useSidebar : useCreatorSidebar;
  const { isOpen, collapseHandler, expandHandler } = useStore((state) => state);
  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (matches) {
      collapseHandler();
    } else {
      expandHandler();
    }
  }, [matches, collapseHandler, expandHandler]);

  return (
    <div className={cn("flex-1", isOpen ? "ml-[70px] lg:ml-60" : "ml-[70px]")}>
      {children}
    </div>
  );
};
