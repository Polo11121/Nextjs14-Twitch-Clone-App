"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Hint, Slider } from "@/components/ui";

type VolumeControlProps = {
  onToggle: () => void;
  onChange: (volume: number) => void;
  value: number;
};

export const VolumeControl = ({
  onToggle,
  onChange,
  value,
}: VolumeControlProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 0.5;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? "Unmute" : "Mute";

  const changeHandler = (value: number[]) => onChange(value[0]);

  return (
    <div className="flex items-center gap-2">
      <Hint asChild label={label}>
        <button
          onClick={onToggle}
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
        >
          <Icon className="w-6 h-6" />
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={changeHandler}
        value={[value]}
        step={1}
        min={0}
        max={100}
      />
    </div>
  );
};
