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
    const result = onClick(newIsClicked);

    if (result !== isClicked) {
      setIsClicked(result);
      setIsAdded(result);
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
            className="absolute px-3 py-1 rounded-full truncate text-sm font-medium bg-blue-50 border border-background text-accent shadow-sm"
            style={{
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            {correspondingLoc}
          </div>
        )}
      </div>
    </div>
  );
};

export default Node;
