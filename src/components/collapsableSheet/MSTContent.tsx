import { DataItem, weightDistant } from "@/db/data";
import { useRouteMSTContext } from "../context/RouteMSTContext";

export default function MSTContent({ dataItem }: { dataItem: DataItem }) {
  const weightDistantData = dataItem?.data?.weightDistantData || [];
  const { getEdgesList, totalWeight, selectedEdges, selectedNodes } =
    useRouteMSTContext();
  
  const coordinateData = dataItem?.coordinate || [];
  const totalNodes = coordinateData.length;

  return (
    <div className="">
      <div className="flex flex-col w-full gap-3 justify-between place-items-start">
        <div className="grid grid-cols-2 gap-y-3 justify-between w-full">
          <div className="flex flex-col">
            <p className="font-light text-sm">Total Weight</p>
            <p className="font-extrabold text-2xl">
              {totalWeight === 0 ? "0" : totalWeight}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light text-sm">Nodes Connected</p>
            <p className="font-extrabold text-2xl">
              {selectedNodes.size} / {totalNodes}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="font-light text-sm">Selected Edges</p>
          <div className="font-extrabold text-2xl">
            {selectedEdges.length > 0 ? (
              selectedEdges.map((edge, index) => (
                <div key={`${edge.from}-${edge.to}-${index}`}>
                  {edge.from} ↔ {edge.to} : {edge.weight}
                </div>
              ))
            ) : (
              <div className="text-sm font-normal text-gray-500">
                No edges selected yet
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}