"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button, Hint } from "@/components/ui";
import { useSidebar } from "@/store";

export const Toggle = () => {
  const { isOpen, toggleHandler } = useSidebar((state) => state);

  const label = isOpen ? "Collapse sidebar" : "Expand sidebar";

  return isOpen ? (
    <div className="p-3 pl-6 mb-2 flex items-center w-full">
      <p className="font-semibold text-primary">For you</p>
      <Hint label={label} side="right" asChild>
        <Button
          onClick={toggleHandler}
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
        <Button onClick={toggleHandler} variant="ghost" className="h-auto p-2">
          <ArrowRightFromLine className="h-4 w-4" />
        </Button>
      </Hint>
    </div>
  );
};
