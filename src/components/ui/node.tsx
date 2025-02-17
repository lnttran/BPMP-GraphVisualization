import { cn } from "../../lib/utils";
import React, { useContext, useEffect, useState } from "react";
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
  resetSignal,
  filename,
  isDepot,
}: {
  x: number;
  y: number;
  classname?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClickedDefault?: boolean;
  onClick: (isSelected: boolean) => boolean;
  filename: string;
  resetSignal: boolean;
  isDepot: boolean;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(onClickedDefault);

  const handleClick = () => {
    const newIsClicked = !isClicked;
    setIsClicked(newIsClicked);
    console.log("isClicked in the node", newIsClicked);
    if (onClick(newIsClicked)) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
      console.log("IsAdded not success");
    }
  };

  useEffect(() => {
    setIsAdded(onClickedDefault);
    setIsClicked(false);
  }, [resetSignal, filename, onClickedDefault]);

  return (
    <div>
      <Button
        style={{ left: x * 100, top: y * 100 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          "absolute rounded-full w-12 h-12 border-2 hover:bg-accent hover:text-white hover:font-bold -translate-x-1/2 -translate-y-1/2",
          {
            "bg-accent-foreground text-white": isDepot && !isAdded,
            "bg-accent text-white": isAdded,
            "bg-background": !isDepot && !isAdded,
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
