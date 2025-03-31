import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "../ui/toast";
import { Cargo, useCargoContext } from "./CargoContext";
import { DataItem } from "@/db/data";
import { useDataContext } from "./DataContext";

// Step 1: Define context type
type RouteContextType = {
  selectedRoute: number[];
  setSelectedRoute: React.Dispatch<React.SetStateAction<number[]>>;
  setRouteWeightMap: React.Dispatch<React.SetStateAction<Cargo[]>>;
  setOptimalSolutionRoute: (route: number[], cargo: [number, number][]) => void;
  routeWeightMap: Cargo[];
  getRoute: () => string;
  resetRoute: () => void;
  addNodeToRoute: (
    node: number,
    weight: number,
    distance: number
  ) => { status: boolean; selectedRoute: number[] };
  deleteNodeToRoute: (nodeToRemove: number) => boolean;
  totalDistance: number;
};

// Step 2: Create context
const RouteContext = createContext<RouteContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type RouteProviderProps = {
  children: ReactNode;
};

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState<number[]>([1]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [routeWeightMap, setRouteWeightMap] = useState<Cargo[]>([]);
  const { toast } = useToast();
  const { retrievedData, maxDistance } = useDataContext();
  const weightDistantData = retrievedData?.data?.weightDistantData || [];
  const coordinateData = retrievedData?.coordinate || [];

  const calculateTotalDistance = (route: any) => {
    if (!retrievedData || !retrievedData.data || !weightDistantData.length) {
      console.log("No data available to calculate total distance");
      setTotalDistance(0);
      return;
    }

    let totalDistance = 0;

    for (let i = 0; i < route.length - 1; i++) {
      const currentNode = route[i];
      const nextNode = route[i + 1];

      // Find the distance between currentNode and nextNode in weightDistantData
      const distanceData = weightDistantData.find(
        (item) => item.x === currentNode && item.y === nextNode
      );

      if (distanceData) {
        totalDistance += distanceData.d;
      } else {
        console.log(
          `No distance found between nodes ${currentNode} and ${nextNode}`
        );
      }
    }
    setTotalDistance(parseFloat(totalDistance.toFixed(2)));
  };

  const setOptimalSolutionRoute = (
    route: number[],
    cargo: [number, number][]
  ) => {
    setSelectedRoute(route);
    calculateTotalDistance(route);
  };

  const getRoute = () => {
    return selectedRoute.join(" -> ");
  };

  const resetRoute = () => {
    setSelectedRoute([1]);
    setTotalDistance(0);
  };

  const addNodeToRoute = (
    node: number,
    weight: number,
    distance: number
  ): { status: boolean; selectedRoute: number[] } => {
    if (totalDistance + distance > maxDistance) {
      toast({
        variant: "destructive",
        style: {
          height: "auto",
          borderRadius: "15px",
        },
        description: (
          <div className="flex flex-row items-center gap-10">
            <MdErrorOutline className="text-white" size={"50px"} />
            <div>
              <ToastTitle className="text-xl font-bold text-white">
                {`Failed to add node ${node}.`}
              </ToastTitle>
              <ToastDescription className="text-lg text-white">{`Total distance would exceed the maximum limit`}</ToastDescription>
            </div>
          </div>
        ),
        action: (
          <ToastAction
            className="text-white group-[.destructive]:hover:bg-white group-[.destructive]:hover:text-destructive"
            altText="Try again"
          >
            Try again
          </ToastAction>
        ),
      });

      return { status: false, selectedRoute: [] };
    }
    setSelectedRoute((prevRoute) => [...prevRoute, node]);
    const updatedRoute = [...selectedRoute, node];
    setRouteWeightMap((prevMap) => [
      ...prevMap,
      {
        pickup: selectedRoute[selectedRoute.length - 1],
        dropoff: node,
        w: 0,
        d: distance,
      },
    ]);
    console.log("Route in side adRoute context: ", selectedRoute);
    console.log("RouteWeighMap", routeWeightMap);
    setTotalDistance((prevTotalDistance) =>
      parseFloat((prevTotalDistance + distance).toFixed(2))
    );
    toast({
      variant: "destructive",
      style: { height: "auto", borderRadius: "15px" },
      description: (
        <div className="flex flex-row items-center gap-10">
          <IoIosCheckmarkCircleOutline className="text-white" size={"40px"} />
          <div>
            <ToastTitle className="text-xl font-bold text-white">
              {`Added successfully`}
            </ToastTitle>
            <ToastDescription className="text-lg text-white">{`Node ${node} added to the route`}</ToastDescription>
          </div>
        </div>
      ),
    });

    return { status: true, selectedRoute: updatedRoute };
  };

  const deleteNodeToRoute = (nodeToRemove: number): boolean => {
    let isSuccess = false;
    let nodeBefore: number | null = null;
    let nodeAfter: number | null = null;
    setSelectedRoute((prevRoute) => {
      const currentIndex = prevRoute.indexOf(nodeToRemove);

      // Get the node before and after
      nodeBefore = currentIndex > 0 ? prevRoute[currentIndex - 1] : null;
      nodeAfter =
        currentIndex < prevRoute.length - 1
          ? prevRoute[currentIndex + 1]
          : null;
      // If we have both a before and after node, check the distance
      if (nodeBefore !== null && nodeAfter !== null && weightDistantData) {
        // Find the distance between nodeBefore and nodeAfter in weightDistantData
        const distanceData = weightDistantData.find(
          (item) => item.x === nodeBefore && item.y === nodeAfter
        );

        // Check if distance exists and is greater than 100
        if (distanceData && distanceData.d > 100) {
          return prevRoute;
        }
      }
      // Filter out the node to remove and get the new route
      const updatedRoute = prevRoute.filter((n) => n !== nodeToRemove);

      // Use the updated route immediately for calculation
      calculateTotalDistance(updatedRoute);
      isSuccess = true;

      // Return the updated route to update the state
      return updatedRoute;
    });

    toast({
      variant: isSuccess ? "default" : "destructive",
      style: { height: "auto", borderRadius: "15px" },
      description: (
        <div className="flex flex-row items-center gap-10">
          {isSuccess ? (
            <IoIosCheckmarkCircleOutline className="text-white" size={"40px"} />
          ) : (
            <MdErrorOutline className="text-white" size={"50px"} />
          )}
          <div>
            <ToastTitle className="text-xl font-bold text-white">
              {isSuccess ? "Removed successfully" : "Removal Prevented"}
            </ToastTitle>
            <ToastDescription className="text-lg text-white">
              {isSuccess
                ? `Node ${nodeToRemove} removed from the route.`
                : `There is no request from ${nodeBefore} to ${nodeAfter}.`}
            </ToastDescription>
          </div>
        </div>
      ),
    });

    return isSuccess;
  };

  return (
    <RouteContext.Provider
      value={{
        selectedRoute,
        totalDistance,
        routeWeightMap,
        setRouteWeightMap,
        resetRoute,
        setSelectedRoute,
        getRoute,
        addNodeToRoute,
        deleteNodeToRoute,
        setOptimalSolutionRoute,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

// Step 4: Custom hook to use context
export const useRouteContext = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRouteContext must be used within a RouteProvider");
  }
  return context;
};
