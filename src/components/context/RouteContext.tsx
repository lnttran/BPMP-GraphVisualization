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

// Step 1: Define context type
type RouteContextType = {
  selectedRoute: number[];
  setSelectedRoute: React.Dispatch<React.SetStateAction<number[]>>;
  setRouteWeightMap: React.Dispatch<React.SetStateAction<Cargo[]>>;
  setSelectedDataset: React.Dispatch<React.SetStateAction<string>>;
  setOptimalSolutionRoute: (route: number[], cargo: [number, number][]) => void;
  selectedDataset: string;
  routeWeightMap: Cargo[];
  getRoute: () => string;
  resetRoute: () => void;
  addNodeToRoute: (
    node: number,
    weight: number,
    distance: number
  ) => { status: boolean; selectedRoute: number[] };
  deleteNodeToRoute: (nodeToRemove: number, distance: number) => void;
  totalDistance: number;
  maxDistance: number;
  setNewMaxDistance: (newDistance: number) => void;
};

// Step 2: Create context
const RouteContext = createContext<RouteContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type RouteProviderProps = {
  children: ReactNode;
};

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const [selectedDataset, setSelectedDataset] = useState("demo_data_2.txt");
  const [selectedRoute, setSelectedRoute] = useState<number[]>([1]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [routeWeightMap, setRouteWeightMap] = useState<Cargo[]>([]);
  // const { setSelectedCargo } = useCargoContext();
  const { toast } = useToast();
  const [retrievedData, setRetrievedData] = useState<DataItem | null>(null);
  const weightDistantData = retrievedData?.data?.weightDistantData || [];
  const coordinateData = retrievedData?.coordinate || [];
  const dataSize = coordinateData.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data?fileName=${selectedDataset}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        const data = result[0];
        setRetrievedData(data);
        // Set max capacity and max distance
        // if (data && data.data) {
        //   setNewMaxCapacity(Number(data.data.c));
        //   setLastNode(Number(data.data.n));
        //   setNewMaxDistance(Number(data.data.DIS));
        // }
      } catch (err) {
        console.log("error");
        // if (err instanceof Error) {
        //   setError(err.message);
        // } else {
        //   // Handle unexpected error type
        //   setError("An unknown error occurred.");
        // }
      }
    };

    fetchData();
  }, [selectedDataset]);

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

  const setNewMaxDistance = (newDistance: number) => {
    if (newDistance > 0) {
      setMaxDistance(newDistance);
    } else {
      console.error("Max distance must be greater than 0");
    }
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
        w: weight,
        d: distance,
      },
    ]);
    console.log("Route in side adRoute context: ", selectedRoute);
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
    <RouteContext.Provider
      value={{
        selectedRoute,
        totalDistance,
        maxDistance,
        routeWeightMap,
        selectedDataset,
        setSelectedDataset,
        setRouteWeightMap,
        setNewMaxDistance,
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
