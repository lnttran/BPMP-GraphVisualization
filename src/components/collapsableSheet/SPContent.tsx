import { DataItem, weightDistant } from "@/db/data";
import { useRouteSPContext } from "../context/RouteSPContext";
import { getWeightDistantbyPickupDropoff } from "../GraphVisualizer/GraphVisualizer";

export default function SPContent({ dataItem }: { dataItem: DataItem }) {
  const weightDistantData = dataItem?.data?.weightDistantData || [];
  const informationData = dataItem?.data;
  const { getRoute, totalDistance, selectedRoute, reachableNodes } =
    useRouteSPContext();

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
        <div className="flex flex-col">
          <p className="font-light text-sm">Distances</p>
          <div className="font-extrabold text-2xl">
            {selectedRoute.length > 1 ? (
              selectedRoute.map((node, index) => {
                if (index < selectedRoute.length - 1) {
                  const from = node;
                  const to = selectedRoute[index + 1];
                  const { d } = getWeightDistantbyPickupDropoff(
                    from,
                    to,
                    weightDistantData
                  );
                  return (
                    <div key={`${from}-${to}-${index}`}>
                      {from} -&gt; {to} : {d}
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {reachableNodes && reachableNodes.length > 1 && (
          <div className="flex flex-col">
            <p className="font-light text-sm">All Reachable Routes</p>
            <div className="font-bold text-2xl">
              {reachableNodes.slice(0, -1).map((route, index) => {
                const lastNode = route[route.length - 1]; // Last node in the route
                const routeWithoutLast = route.slice(0, -1); // All nodes except last

                return (
                  <div key={index} className="mb-2 flex items-center gap-1">
                    <p>{routeWithoutLast.join(" -> ")}</p>
                    {routeWithoutLast.length > 0 && " -> "}
                    <div className="px-3 py-1 rounded-sm bg-popover">
                      {lastNode}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
