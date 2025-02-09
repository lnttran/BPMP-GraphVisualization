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
import { DataItem } from "@/db/data";
import { useDataSPContext } from "./DataSPContext";

// Step 1: Define context type
type RouteSPContextType = {
  selectedRoute: number[];
  setSelectedRoute: React.Dispatch<React.SetStateAction<number[]>>;
  setOptimalSolutionRoute: (route: number[]) => void;
  getRoute: () => string;
  resetRoute: () => void;
  reachableNodes: number[][];
  setReachableNodes: React.Dispatch<React.SetStateAction<number[][]>>;
  addNodeToRoute: (
    node: number,
    distance: number
  ) => { status: boolean; selectedRoute: number[] };
  deleteNodeToRoute: (nodeToRemove: number, distance: number) => void;
  totalDistance: number;
};

// Step 2: Create context
const RouteSPContext = createContext<RouteSPContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type RouteSPProviderProps = {
  children: ReactNode;
};

export const RouteSPProvider: React.FC<RouteSPProviderProps> = ({
  children,
}) => {
  const [selectedRoute, setSelectedRoute] = useState<number[]>([1]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [reachableNodes, setReachableNodes] = useState<number[][]>([]);
  const { toast } = useToast();
  const { retrievedData } = useDataSPContext();
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

  const setOptimalSolutionRoute = (route: number[]) => {
    setSelectedRoute(route);
    calculateTotalDistance(route);
  };

  const getRoute = () => {
    return selectedRoute.join(" -> ");
  };

  const resetRoute = () => {
    setSelectedRoute([1]);
    setReachableNodes([]);
    setTotalDistance(0);
  };

  const addNodeToRoute = (
    node: number,
    distance: number
  ): { status: boolean; selectedRoute: number[] } => {
    setSelectedRoute((prevRoute) => [...prevRoute, node]);
    const updatedRoute = [...selectedRoute, node];

    console.log("inside addnodetoroute function", distance);
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

    console.log("current route", selectedRoute);

    return { status: true, selectedRoute: updatedRoute };
  };

  const deleteNodeToRoute = (nodeToRemove: number, distance: number) => {
    setSelectedRoute((prevRoute) =>
      prevRoute.filter((n) => n !== nodeToRemove)
    );
    setTotalDistance((prevTotalDistance) =>
      parseFloat((prevTotalDistance - distance).toFixed(2))
    );
    toast({
      variant: "destructive",
      style: { height: "auto", borderRadius: "15px" },
      description: (
        <div className="flex flex-row items-center gap-10">
          <IoIosCheckmarkCircleOutline className="text-white" size={"40px"} />
          <div>
            <ToastTitle className="text-xl font-bold text-white">
              {`Removed successfully`}
            </ToastTitle>
            <ToastDescription className="text-lg text-white">{`Node ${nodeToRemove} removed from the route`}</ToastDescription>
          </div>
        </div>
      ),
    });
  };

  return (
    <RouteSPContext.Provider
      value={{
        selectedRoute,
        totalDistance,
        setReachableNodes,
        reachableNodes,
        resetRoute,
        setSelectedRoute,
        getRoute,
        addNodeToRoute,
        deleteNodeToRoute,
        setOptimalSolutionRoute,
      }}
    >
      {children}
    </RouteSPContext.Provider>
  );
};

// Step 4: Custom hook to use context
export const useRouteSPContext = () => {
  const context = useContext(RouteSPContext);
  if (!context) {
    throw new Error("useRouteSPContext must be used within a RouteSPProvider");
  }
  return context;
};
