import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";

type HintProps = {
  label: string;
  children: ReactNode;
  asChild?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
};

export const Hint = ({
  label,
  children,
  asChild = false,
  side = "top",
  align = "center",
}: HintProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent className="text-black bg-white" side={side} align={align}>
        <p className="font-semibold">{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
