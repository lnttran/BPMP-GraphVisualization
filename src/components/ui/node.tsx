import { cn } from "../../lib/utils";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "./button";
import { useRouteContext } from "../context/RouteContext";
import { useRouteSPContext } from "../context/RouteSPContext";

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
  isDeparts = false,
  correspondingLoc,
  isDepot,
}: {
  x: number;
  y: number;
  classname?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClickedDefault?: boolean;
  isDeparts?: boolean;
  onClick: (isSelected: boolean) => boolean;
  filename: string;
  resetSignal: boolean;
  isDepot: boolean;
  correspondingLoc?: string;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(onClickedDefault);

  const handleClick = () => {
    if (isDeparts) {
      return;
    }
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
    setIsClicked(onClickedDefault);
  }, [resetSignal, filename, onClickedDefault]);

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: x * 100, top: y * 100 }}
    >
      <div className="relative">
        <Button
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={cn(
            "rounded-full w-12 h-12 border-2 hover:bg-accent hover:text-white hover:font-bold -translate-x-1/2 -translate-y-1/2",
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
        {correspondingLoc && (
          <div
            className={
              "mt-2 px-3 py-1 rounded-full truncate text-sm font-medium text-center w-full transition-all duration-300 bg-blue-50 border-background text-accent backdrop-blur-sm border shadow-sm -translate-x-6"
            }
          >
            {correspondingLoc}
          </div>
        )}
      </div>
    </div>
  );
};

export default Node;
