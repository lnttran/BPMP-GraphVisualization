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
import { useRouteSPContext } from "../context/RouteSPContext";

export default function SPContent({ dataItem }: { dataItem: DataItem }) {
  const weightDistantData = dataItem?.data?.weightDistantData || [];
  const informationData = dataItem?.data;
  const { getRoute, totalDistance, selectedRoute } = useRouteSPContext();

  return (
    <div className="">
      <div className="flex flex-col w-full gap-3 justify-between place-items-start">
        <div className="grid grid-cols-2 gap-y-3 justify-between w-full">
          <div className="flex flex-col">
            <p className="font-light text-sm">Total Distance</p>
            <p className="font-extrabold text-2xl">
              {totalDistance === 0 ? "0" : totalDistance}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-light text-sm">Route</p>
          <div className="font-extrabold text-2xl"> {getRoute()}</div>
        </div>
      </div>

      {/* <Accordion
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
      </Accordion> */}

      {/* <Accordion type="single" collapsible className="w-full"></Accordion> */}
    </div>
  );
}
