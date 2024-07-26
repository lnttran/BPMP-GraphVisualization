import { Button } from "@/components/ui/button";
import { useState } from "react";

export const CargoCard = ({
  x,
  y,
  w,
  onClick,
  isAdd,
}: {
  w: number;
  y: number;
  x: number;
  isAdd: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="relative h-fit bg-popover rounded-xl w-full p-2 flex flex-row justify-items-start justify-between mb-2">
      <div>{`${x} : ${y} `}</div>
      <div>{w}</div>
      <Button
        onClick={onClick}
        className="bg-accent hover:bg-destructive text-white w-6 h-6 rounded-md "
      >
        {isAdd ? "+" : "-"}
      </Button>
    </div>
  );
};

//
