import { distance, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useRouteContext } from "../context/RouteContext";
import { CargoCard } from "./CargoCard";
import { useCargoContext } from "../context/CargoContext";
import { calculateProfit } from "../tools/Tools";
import { Cargo } from "../context/CargoContext";
import { InferRawDocType } from "mongoose";
import { coordinateSchema } from "@/db/coordinate";
import { weightDistant, weightDistantSchema } from "@/db/data";

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

const returnAvailableCargo = (
  selectedCargo: Cargo[],
  selectedRoute: number[],
  weightDistantArray: weightDistant[]
): Cargo[] => {
  const lastRouteElement = selectedRoute[selectedRoute.length - 1];
  const availableCargo = weightDistantArray
    .filter(
      (data) =>
        !selectedCargo.some(
          (cargo) => cargo.pickup === data.x && cargo.dropoff === data.y
        ) &&
        selectedRoute.includes(data.x) &&
        selectedRoute.includes(data.y) &&
        data.x !== lastRouteElement &&
        data.w != 0 &&
        selectedRoute.indexOf(data.x) < selectedRoute.indexOf(data.y)
    )
    .map((data) => ({
      pickup: data.x,
      dropoff: data.y,
      w: data.w,
      d: data.d,
    }));

  return availableCargo;
};

export default function CollapsableSheet({
  weightDistantArray,
}: {
  weightDistantArray: weightDistant[];
}) {
  const [isOpen, setIsOpen] = useState(true);
  const containerControls = useAnimationControls();
  const {
    getRoute,
    totalDistance,
    selectedRoute,
    routeWeightMap,
    maxDistance,
  } = useRouteContext();
  const {
    selectedCargo,
    calculateTotalWeight,
    removeCargo,
    addCargo,
    maxCapacity,
  } = useCargoContext();

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
            <div className="flex flex-col w-full justify-between place-items-start">
              {/* information */}
              <div className="flex flex-col">
                <p className="mb-2 font-bold">Vehicle information: </p>
                <p>Price charge per cargo: 1.2</p>
                <p>Travel cost: 1</p>
                <p>Vehicle weight: 0.1</p>
              </div>

              {/* constraint */}
              <div className="flex mb-4 flex-col">
                <p className="mb-2 font-bold">Constraint: </p>
                <p>Distance constraint: {maxDistance}</p>
                <p>Cargo constraint: {maxCapacity}</p>
              </div>
              <div className="text-black">Route: {getRoute()}</div>
              <div className="text-black">
                Total Cargo: {calculateTotalWeight()}{" "}
              </div>

              <div className="text-black">
                Total Distance: {Number(totalDistance).toFixed(4)}{" "}
              </div>
              <div className="text-black">
                Total Profit:{" "}
                {calculateProfit({
                  selectedRouteWeightMap: routeWeightMap,
                  selectedCargo: selectedCargo,
                  distance: totalDistance,
                })}
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
                    isAdd={false}
                    onClick={() => removeCargo(cargo)}
                  />
                </li>
              ))}
            </ul>
            <ul>
              <p className="mb-2">Available Cargo:</p>
              {returnAvailableCargo(
                selectedCargo,
                selectedRoute,
                weightDistantArray
              ).map((cargo, index) => (
                <li key={index}>
                  <CargoCard
                    x={cargo.pickup!}
                    y={cargo.dropoff!}
                    w={cargo.w!}
                    isAdd={true}
                    onClick={() => addCargo(selectedRoute, cargo)}
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
