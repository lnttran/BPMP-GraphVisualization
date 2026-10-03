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
import { useDataTSPContext } from "./DataTSPContext";

// Step 1: Define context type
type RouteTSPContextType = {
  selectedRoute: number[];
  setSelectedRoute: React.Dispatch<React.SetStateAction<number[]>>;
  setOptimalSolutionRoute: (route: number[], totalDist?: number) => void;
  getRoute: () => string;
  resetRoute: () => void;
  reachableNodes: number[][];
  setReachableNodes: React.Dispatch<React.SetStateAction<number[][]>>;
  addNodeToRoute: (
    node: number,
    distance: number
  ) => { status: boolean; selectedRoute: number[] };
  deleteNodeToRoute: (nodeToRemove: number) => boolean;
  totalDistance: number;
  studentRoute: number[];
  saveStudentRoute: () => void;
};

// Step 2: Create context
const RouteTSPContext = createContext<RouteTSPContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type RouteTSPProviderProps = {
  children: ReactNode;
};

export const RouteTSPProvider: React.FC<RouteTSPProviderProps> = ({
  children,
}) => {
  const [selectedRoute, setSelectedRoute] = useState<number[]>([1]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [reachableNodes, setReachableNodes] = useState<number[][]>([]);
  const [studentRoute, setStudentRoute] = useState<number[]>([]);
  const { toast } = useToast();
  const { retrievedData } = useDataTSPContext();
  const weightDistantData = retrievedData?.data?.weightDistantData || [];
  const coordinateData = retrievedData?.coordinate || [];

  const saveStudentRoute = () => {
    setStudentRoute([...selectedRoute]);
  };

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

  const setOptimalSolutionRoute = (route: number[], totalDist?: number) => {
    setSelectedRoute(route);
    if (typeof totalDist === "number") {
      setTotalDistance(totalDist);
    } else {
      calculateTotalDistance(route);
    }
  };

  const getRoute = () => {
    return selectedRoute.join(" -> ");
  };

  const resetRoute = () => {
    setSelectedRoute([1]);
    setReachableNodes([]);
    setTotalDistance(0);
    setStudentRoute([]);
  };

  const addNodeToRoute = (
    node: number,
    distance: number
  ): { status: boolean; selectedRoute: number[] } => {
    if (distance > 9998) {
      toast({
        variant: "destructive",
        style: { height: "auto", borderRadius: "15px" },
        description: (
          <div className="flex flex-row items-center gap-10">
            <MdErrorOutline className="text-white" size={"50px"} />
            <div>
              <ToastTitle className="text-xl font-bold text-white">
                {`Node ${node} cannot be added`}
              </ToastTitle>
            </div>
          </div>
        ),
      });
      return { status: false, selectedRoute };
    }
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

  const deleteNodeToRoute = (nodeToRemove: number): boolean => {
    // Work on the current route directly so the result is known before we return.
    // lastIndexOf is used because node 1 appears twice once the tour is closed.
    const currentIndex = selectedRoute.lastIndexOf(nodeToRemove);
    if (currentIndex === -1) return false;

    // Only the last node in the route can be removed.
    // To remove an earlier node, remove the nodes after it first.
    const isSuccess = currentIndex === selectedRoute.length - 1;

    if (isSuccess) {
      const updatedRoute = selectedRoute.slice(0, currentIndex);
      setSelectedRoute(updatedRoute);
      calculateTotalDistance(updatedRoute);
    }

    toast({
      variant: "destructive",
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
            {isSuccess ? (
              <ToastDescription className="text-lg text-white">
                {`Node ${nodeToRemove} removed from the route.`}
              </ToastDescription>
            ) : (
              <ToastDescription className="text-lg text-white">
                {`Remove the nodes after node ${nodeToRemove} first.`}
              </ToastDescription>
            )}
          </div>
        </div>
      ),
    });

    return isSuccess;
  };

  return (
    <RouteTSPContext.Provider
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
        studentRoute,
        saveStudentRoute,
      }}
    >
      {children}
    </RouteTSPContext.Provider>
  );
};

// Step 4: Custom hook to use context
export const useRouteTSPContext = () => {
  const context = useContext(RouteTSPContext);
  if (!context) {
    throw new Error("useRouteTSPContext must be used within a RouteTSPProvider");
  }
  return context;
};