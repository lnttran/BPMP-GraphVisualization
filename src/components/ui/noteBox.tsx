import React, { useState } from "react";
import { FaMinus, FaStickyNote } from "react-icons/fa";
import { TfiLineDashed } from "react-icons/tfi";
import { IoIosArrowForward } from "react-icons/io";
import { RxDividerHorizontal } from "react-icons/rx";
import { TbLineDotted } from "react-icons/tb";
import { useGlobalComponentManager } from "../context/UIContext";
import { useCargoContext } from "../context/CargoContext";
import { useRouteContext } from "../context/RouteContext";

const lineTypes = [
  {
    icon: <TfiLineDashed size={40} className="text-accent" />,
    arrow: <IoIosArrowForward size={24} className="text-accent" />,
    title: "Unselected route with available cargo",
    id: "dashed text-accent",
  },
  {
    icon: <RxDividerHorizontal size={40} className="text-accent" />,
    arrow: <IoIosArrowForward size={24} className="text-accent" />,
    title: "Selected route with empty truck",
    id: "solid text-accent",
  },
  {
    icon: <RxDividerHorizontal size={40} className="text-accent-foreground" />,
    arrow: <IoIosArrowForward size={24} className="text-accent-foreground" />,
    title: "Selected route with selected cargo",
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
}: {
  isVisible: boolean;
  currentLineType: string;
  children: React.ReactNode;
}) => {
  const { state, setComponentState } = useGlobalComponentManager();
  const [isOpen, setIsOpen] = useState(true);
  const { maxCapacity } = useCargoContext();
  const { maxDistance } = useRouteContext();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    // setComponentState("noteBox", {
    //   isVisible: !state["noteBox"]["isVisible"], // Fixed typo from isVisble to isVisible
    // });
  };

  return (
    <div
      className={`absolute bottom-0 m-5 ${
        // !state["noteBox"]["isVisible"]
        !isOpen
          ? "w-[50px] h-[50px] p-1.5 rounded-full"
          : "w-fill h-fill p-2 rounded-xl"
      } bg-[#1B4332] bg-opacity-50 text-white z-60  flex items-center justify-center`}
    >
      {
        // !state["noteBox"]["isVisible"]
        !isOpen ? (
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
            {/* Line Type Node */}
            <div className="flex mx-3 mt-2 flex-col">
              <p className="mb-2 font-bold">Line Types:</p>
              {lineTypes.map((lineType, index) => (
                <div
                  key={index}
                  className={`px-2 rounded-md ${
                    currentLineType === lineType.id ? "bg-background" : ""
                  }`}
                >
                  <div key={index} className="flex flex-row items-center gap-8">
                    <div className="flex flex-row items-center">
                      {lineType.icon}
                      {lineType.arrow}
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
        )
      }
    </div>
  );
};

export default NoteBox;
