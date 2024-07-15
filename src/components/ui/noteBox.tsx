import React, { useState } from "react";
import { FaMinus, FaStickyNote } from "react-icons/fa";

const NoteBox = ({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children: React.ReactNode;
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
  };
  return (
    <div
      className={`absolute bottom-0 m-5 ${
        isMinimized
          ? "w-[50px] h-[50px] p-1.5 rounded-full"
          : "w-[300px] h-[300px] p-2 rounded-xl"
      } bg-[#1B4332] bg-opacity-50 text-white z-60  flex items-center justify-center`}
    >
      {isMinimized ? (
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
        </div>
      )}
    </div>
  );
};

export default NoteBox;
