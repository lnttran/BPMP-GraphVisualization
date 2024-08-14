import { cn } from "../../lib/utils";
import React, { useContext, useState } from "react";
import { Button } from "./button";
import { useRouteContext } from "../context/RouteContext";

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
  onClick: (isSelected: boolean) => boolean;
}) => {
  const [isClicked, setIsClicked] = useState(true);
  const [isAdded, setIsAdded] = useState(onClickedDefault);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (onClick(isClicked)) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
      console.log("IsAdded not success");
    }
  };
  return (
    <div>
      <Button
        style={{ left: x * 100, top: y * 100 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          "absolute rounded-full w-12 h-12 bg-background border-2 hover:bg-accent hover:text-white hover:font-bold -translate-x-1/2 -translate-y-1/2",
          {
            "bg-accent text-white": isAdded,
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

export default Node;
