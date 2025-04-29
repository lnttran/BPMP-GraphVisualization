import { distance, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import BPMPContent from "./BPMPContent";

const constVariations = {
  close: {
    width: "2rem",
    transition: {
      type: "tween",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "100%",
    maxWidth: "24rem",
    transition: {
      type: "tween",
      damping: 15,
      duration: 0.5,
    },
  },
};

const redDivVariants = {
  visible: {
    width: "100%",
    maxWidth: "22rem",
    transition: { type: "tween", damping: 15, duration: 0.5 },
  },
  hidden: {
    width: "2rem",
    transition: { type: "tween", damping: 15, duration: 0.5 },
  },
};

export default function CollapsableSheet({
  content,
}: {
  content: () => JSX.Element | null;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const containerControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen, containerControls]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <motion.nav
          variants={constVariations}
          animate={containerControls}
          initial="open"
          className="z-0 absolute right-0 flex flex-row h-full top-0"
        >
          <div
            onClick={handleOpenClose}
            className="bg-background rounded-tl-3xl rounded-bl-3xl w-[2rem] h-16 sm:h-20 cursor-pointer self-center flex items-center justify-center "
          >
            <IoReorderThreeOutline
              style={{ transform: "rotate(90deg)", fontSize: "1.5rem" }}
              className="sm:text-2xl"
            />
          </div>
          {/* <BPMPContent dataItem={dataItem} /> */}
          <div className="bg-background w-[22rem] rounded-xl border-popover mt-2 mr-2 mb-2 p-5 overflow-y-auto">
            {content()}
          </div>
        </motion.nav>
      ) : (
        <motion.nav
          variants={constVariations}
          animate={containerControls}
          initial="close"
          onClick={handleOpenClose}
          className="z-0 absolute right-0 flex flex-row h-full top-0 "
        >
          <div
            onClick={handleOpenClose}
            className="bg-background rounded-tl-3xl rounded-bl-3xl w-[2rem] h-16 sm:h-20 cursor-pointer self-center flex items-center justify-center "
          >
            <IoReorderThreeOutline
              style={{ transform: "rotate(90deg)", fontSize: "1.5rem" }}
              className="sm:text-2xl"
            />
          </div>
          {!isOpen && (
            <motion.div
              initial="visible"
              animate={isOpen ? "visible" : "hidden"}
              variants={redDivVariants}
              className="bg-background border-popover rounded-xl mt-2 mr-2 mb-2"
            ></motion.div>
          )}
        </motion.nav>
      )}
    </>
  );
}
