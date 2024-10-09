import { distance, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useRouteContext } from "../context/RouteContext";
import { CargoCard } from "./CargoCard";
import { useCargoContext } from "../context/CargoContext";
import { calculateProfit } from "../tools/Tools";
import { Cargo } from "../context/CargoContext";
import { InferRawDocType } from "mongoose";
import { coordinateSchema } from "@/db/coordinate";
import { DataItem, weightDistant, weightDistantSchema } from "@/db/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

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
  // console.log("avail", availableCargo);
  return availableCargo;
};

export default function CollapsableSheet({ dataItem }: { dataItem: DataItem }) {
  const [isOpen, setIsOpen] = useState(true);
  const containerControls = useAnimationControls();
  const weightDistantData = dataItem?.data?.weightDistantData || [];
  const informationData = dataItem?.data;
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
          <div className="bg-background w-[22rem] rounded-xl border-popover mt-2 mr-2 mb-2 p-5 overflow-y-auto">
            <div className="flex flex-col w-full gap-3 justify-between place-items-start">
              <div className="grid grid-cols-2 gap-y-3 justify-between w-full">
                <div className="flex flex-col">
                  <p className="font-light text-sm">Total Cargo</p>
                  <p className="font-extrabold text-2xl">
                    {calculateTotalWeight()}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-light text-sm">Total Distance</p>
                  <p className="font-extrabold text-2xl">
                    {totalDistance === 0
                      ? "0"
                      : Number(totalDistance).toFixed(4)}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-light text-sm">Total Profit</p>
                  <p className="font-extrabold text-2xl">
                    {calculateProfit({
                      selectedRouteWeightMap: routeWeightMap,
                      selectedCargo: selectedCargo,
                      distance: totalDistance,
                    })}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-light text-sm">Price per cargo</p>
                  <p className="font-extrabold text-2xl">
                    {informationData?.p ? informationData.p.toString() : "N/A"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-light text-sm">Travel cost </p>
                  <p className="font-extrabold text-2xl">
                    {informationData?.c ? informationData.c.toString() : "N/A"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-light text-sm">Vehicle weight</p>
                  <p className="font-extrabold text-2xl">
                    {informationData?.v ? informationData.v.toString() : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-light text-sm">Route</p>
                <div className="font-extrabold text-2xl"> {getRoute()}</div>
              </div>
            </div>

            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={["selected", "available"]}
            >
              <AccordionItem value="selected" className="border-b-neutral-300">
                <AccordionTrigger className="font-light text-sm">
                  Selected Cargo
                </AccordionTrigger>
                <AccordionContent>
                  {selectedCargo.map((cargo, index) => (
                    <CargoCard
                      x={cargo.pickup!}
                      y={cargo.dropoff!}
                      w={cargo.w!}
                      isAdd={false}
                      onClick={() => removeCargo(cargo)}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="available" className="border-b-neutral-300">
                <AccordionTrigger className="font-light text-sm">
                  Available Cargo
                </AccordionTrigger>
                <AccordionContent>
                  {returnAvailableCargo(
                    selectedCargo,
                    selectedRoute,
                    weightDistantData
                  ).map((cargo, index) => (
                    <CargoCard
                      x={cargo.pickup!}
                      y={cargo.dropoff!}
                      w={cargo.w!}
                      isAdd={true}
                      onClick={() => addCargo(selectedRoute, cargo)}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* <Accordion type="single" collapsible className="w-full"></Accordion> */}
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
