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
  mode?: "bpmp" | "sp";  
}) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const lineTypes = mode === "sp" ? lineTypesSP : lineTypesBPMP;
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div
      className={`absolute bottom-0 m-5 ${
        !isOpen
          ? "w-[50px] h-[50px] p-1.5 rounded-full"
          : "w-fill h-fill p-2 rounded-xl"
      } bg-[#1B4332] bg-opacity-50 text-white z-60 flex items-center justify-center`}
    >
      {!isOpen ? (
        <div className=" p-1.5 cursor-pointer" onClick={handleToggle}>
          <FaStickyNote />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full">
          <div
            className="bg-[#1B4332] bg-opacity-70 hover:bg-opacity-90 w-fit p-1.5 rounded-md self-end cursor-pointer"
            onClick={handleToggle}
          >
            <FaMinus />
          </div>
          <pre className="mx-3 mt-2">{children}</pre>
          <div className="flex items-center gap-10 mx-3 mt-2">
            <div className="w-9 h-9 rounded-full bg-accent-foreground border-2"></div>
            <p className="">Destination Node</p>
          </div>
          {/* Line Type Node */}
          <div className="flex mx-3 mt-2 flex-col">
            <p className="mb-2 font-bold">Line Types:</p>
            {lineTypes.slice(0, numberOfLine).map((lineType, index) => (
              <div
                key={index}
                className={`px-2 rounded-md ${
                  currentLineType === lineType.id ? "bg-background" : ""
                }`}
              >
                <div key={index} className="flex flex-row items-center gap-8">
                  <div className="flex flex-row items-center">
                    {lineType.icon}
                    {mode !== "sp" && lineType.arrow} 
                  </div>
                  <p
                    className={`${
                      currentLineType === lineType.id
                        ? "text-destructive"
                        : "text-white"
                    }`}
                  >
                    {lineType.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteBox;