import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useRouteContext } from "../context/RouteContext";
import { getRoute } from "../tools/GetData";
import { CargoCard } from "./CargoCard";
import { useCargoContext } from "../context/CargoContext";

const constVariations = {
  close: {
    width: "2rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "24rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const redDivVariants = {
  visible: {
    width: "22rem",
    transition: { type: "spring", damping: 15, duration: 0.5 },
  },
  hidden: {
    width: "0rem",
    transition: { type: "spring", damping: 15, duration: 0.5 },
  },
};

export default function CollapsableSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();
  const { selectedRoute } = useRouteContext();
  const { selectedCargo, calculateTotalWeight, calculateTotalDistance } =
    useCargoContext();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen]);

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
            className="bg-background rounded-tl-3xl rounded-bl-3xl w-[2rem] h-20 cursor-pointer self-center flex items-center justify-center "
          >
            <IoReorderThreeOutline
              style={{ transform: "rotate(90deg)", fontSize: "2rem" }}
            />
          </div>
          <div className="bg-background w-[22rem] rounded-xl border-popover mt-2 mr-2 mb-2 p-5">
            <div className="flex flex-col w-full justify-between place-items-start ">
              <div className="text-black">Route: {getRoute(selectedRoute)}</div>
              <div className="text-black">
                Total Cargo: {calculateTotalWeight()}{" "}
              </div>
              <div className="text-black">
                Total Distance: {calculateTotalDistance()}{" "}
              </div>
            </div>
            <ul>
              <p className="mb-2">Selected Cargo:</p>
              {selectedCargo.map((cargo, index) => (
                <li key={index}>
                  <CargoCard
                    x={cargo.pickup!}
                    y={cargo.dropoff!}
                    w={cargo.w!}
                  />
                </li>
              ))}
            </ul>
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
            className="bg-background rounded-tl-3xl rounded-bl-3xl w-[2rem] h-20 cursor-pointer self-center flex items-center justify-center "
          >
            <IoReorderThreeOutline
              style={{ transform: "rotate(90deg)", fontSize: "2rem" }}
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
