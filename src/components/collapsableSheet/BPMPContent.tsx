import { DataItem, weightDistant } from "@/db/data";
import { Cargo, useCargoContext } from "../context/CargoContext";
import { useRouteContext } from "../context/RouteContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { calculateProfit } from "../tools/Tools";
import { CargoCard } from "./CargoCard";

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

export default function BPMPContent({ dataItem }: { dataItem: DataItem }) {
  const weightDistantData = dataItem?.data?.weightDistantData || [];
  const informationData = dataItem?.data;
  const { getRoute, totalDistance, selectedRoute, routeWeightMap } =
    useRouteContext();
  const { selectedCargo, calculateTotalWeight, removeCargo, addCargo } =
    useCargoContext();
  return (
    <div className="">
      <div className="flex flex-col w-full gap-3 justify-between place-items-start">
        <div className="grid grid-cols-2 gap-y-3 justify-between w-full">
          <div className="flex flex-col">
            <p className="font-light text-sm">Total Cargo</p>
            <p className="font-extrabold text-2xl">{calculateTotalWeight()}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light text-sm">Total Distance</p>
            <p className="font-extrabold text-2xl">
              {totalDistance === 0 ? "0" : totalDistance}
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
                key={index}
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
                key={index}
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
  );
}
