"use client";

import { ReactNode, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSidebar } from "@/store";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  const { isOpen, collapseHandler, expandHandler } = useSidebar(
    (state) => state
  );
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
