import React, { useState } from "react";
import { FaMinus, FaStickyNote } from "react-icons/fa";
import { TfiLineDashed } from "react-icons/tfi";
import { IoIosArrowForward } from "react-icons/io";
import { RxDividerHorizontal } from "react-icons/rx";
import { number } from "prop-types";

const lineTypesBPMP = [
  {
    icon: <TfiLineDashed size={40} className="text-accent" />,
    arrow: <IoIosArrowForward size={24} className="text-accent" />,
    title: "Unselected arc with available cargo",
    id: "dashed text-accent",
  },
  {
    icon: <RxDividerHorizontal size={40} className="text-accent" />,
    arrow: <IoIosArrowForward size={24} className="text-accent" />,
    title: "Selected arc with empty truck",
    id: "solid text-accent",
  },
  {
    icon: <RxDividerHorizontal size={40} className="text-accent-foreground" />,
    arrow: <IoIosArrowForward size={24} className="text-accent-foreground" />,
    title: "Selected arc with selected cargo",
    id: "solid text-accent-foreground",
  },
  {
    icon: <TfiLineDashed size={40} className="text-accent-foreground" />,
    arrow: <IoIosArrowForward size={24} className="text-accent-foreground" />,
    title: "Selected cargo",
    id: "dashed text-accent-foreground",
  },
];

const lineTypesSP = [
  {
    icon: <TfiLineDashed size={40} className="text-accent" />,
    arrow: <IoIosArrowForward size={24} className="text-accent" />,
    title: "Unselected edge",  
    id: "dashed text-accent",
  },
  {
    icon: <RxDividerHorizontal size={40} className="text-accent" />,
    arrow: <IoIosArrowForward size={24} className="text-accent" />,
    title: "Selected edge",  
    id: "solid text-accent",
  },
  {
    icon: <RxDividerHorizontal size={40} className="text-accent-foreground" />,
    arrow: <IoIosArrowForward size={24} className="text-accent-foreground" />,
    title: "Selected arc with selected cargo",
    id: "solid text-accent-foreground",
  },
  {
    icon: <TfiLineDashed size={40} className="text-accent-foreground" />,
    arrow: <IoIosArrowForward size={24} className="text-accent-foreground" />,
    title: "Selected cargo",
    id: "dashed text-accent-foreground",
  },
];

const lineTypesMST = [
  {
    icon: <TfiLineDashed size={40} className="text-accent" />,
    arrow: <IoIosArrowForward size={24} className="text-accent" />,
    title: "Unselected edge",  
    id: "dashed text-accent",
  },
  {
    icon: <RxDividerHorizontal size={40} className="text-accent" />,
    arrow: <IoIosArrowForward size={24} className="text-accent" />,
    title: "Selected edge",  
    id: "solid text-accent",
  },
];

const NoteBox = ({
  isVisible,
  currentLineType,
  children,
  numberOfLine = 4,
  mode = "bpmp", 
}: {
  isVisible: boolean;
  currentLineType: string;
  children: React.ReactNode;
  numberOfLine?: number;
  mode?: "bpmp" | "sp" | "mst";  
}) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const lineTypes = mode === "sp" ? lineTypesSP : mode === "mst" ? lineTypesMST : lineTypesBPMP;
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
return (
  <div
    className={`absolute bottom-0 m-5 ${
      !isOpen
        ? "w-[40px] h-[40px] p-1.5 rounded-full"
        : "p-3 rounded-xl w-fit"
    } bg-[#1B4332] bg-opacity-50 text-white z-60 flex items-center justify-center`}
  >
    {!isOpen ? (
      <div className="p-1 cursor-pointer" onClick={handleToggle}>
        <FaStickyNote />
      </div>
    ) : (
      <div className="flex flex-col w-fit gap-2">
        <div className="flex justify-end">
          <div
            className="bg-[#1B4332] bg-opacity-70 hover:bg-opacity-90 p-1 rounded-md cursor-pointer"
            onClick={handleToggle}
          >
            <FaMinus />
          </div>
        </div>
        {children && (
  <div className="grid grid-cols-2 gap-x-4 gap-y-0 text-sm border-b border-white border-opacity-30 pb-2">
    {String(children).split('\n').filter(Boolean).map((line, i) => {
      const [label, value] = line.split(': ');
      return (
        <div key={i} className="flex gap-1">
          <span className="opacity-70 whitespace-nowrap">{label}:</span>
          <span className="font-medium whitespace-nowrap">{value}</span>
        </div>
      );
    })}
  </div>
)}
        {mode !== "mst" && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-accent-foreground border-2 shrink-0"></div>
            <p className="text-sm">Destination Node</p>
          </div>
        )}
        <div>
          <p className="font-bold text-sm mb-1">Line Types:</p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {lineTypes.slice(0, numberOfLine).map((lineType, index) => (
              <div
                key={index}
                className={`flex flex-row items-center gap-1 px-1 rounded-md ${
                  currentLineType === lineType.id ? "bg-background" : ""
                }`}
              >
                <div className="flex flex-row items-center shrink-0">
                  {lineType.icon}
                  {mode !== "sp" && mode !== "mst" && lineType.arrow}
                </div>
                <p
                  className={`text-sm whitespace-nowrap ${
                    currentLineType === lineType.id
                      ? "text-destructive"
                      : "text-white"
                  }`}
                >
                  {lineType.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default NoteBox;