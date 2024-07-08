import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./button";

const Node = ({
  x,
  y,
  classname,
  children,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onClickedDefault = false,
}: {
  x: number;
  y: number;
  classname?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClickedDefault?: boolean;
  onClick: (isSelected: boolean) => void;
}) => {
  const [isClicked, setIsClicked] = useState(onClickedDefault);

  const handleClick = () => {
    if (!onClickedDefault) setIsClicked(!isClicked);
    onClick(isClicked);
  };
  return (
    <div>
      <Button
        style={{ left: x, top: y }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          "absolute rounded-full w-12 h-12 bg-background border-2 hover:bg-accent hover:text-white hover:font-bold -translate-x-1/2 -translate-y-1/2",
          {
            "bg-accent text-white": isClicked,
          },
          classname
        )}
        onClick={handleClick}
      >
        {children}
      </Button>
    </div>
  );
};

// const Node = ({ x, y, children }: { x: number, y: number, children: React.ReactNode }) => {
//     return (
//         <div className="absolute w-[200px] h-[200px] rounded-full bg-background left-{} right-{}" style={{ left: x, right: y }}>
//             {children}
//         </div>
//     )
// }

export default Node;
