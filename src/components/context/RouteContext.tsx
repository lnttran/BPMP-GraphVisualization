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

// Step 1: Define context type
type RouteContextType = {
  selectedRoute: number[];
  setSelectedRoute: React.Dispatch<React.SetStateAction<number[]>>;
  getRoute: () => string;
  resetRoute: () => void;
  addNodeToRoute: (
    node: number,
    weight: number,
    distance: number
  ) => { status: boolean; selectedRoute: number[] };
  deleteNodeToRoute: (nodeToRemove: number, distance: number) => void;
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
  const { toast } = useToast();

  const getRoute = () => {
    return selectedRoute.join(" -> ");
  };

  const resetRoute = () => {
    setSelectedRoute([1]);
    setTotalDistance(0);
  };

  const MAX_DISTANCE = 20;

  const addNodeToRoute = (
    node: number,
    weight: number,
    distance: number
  ): { status: boolean; selectedRoute: number[] } => {
    if (totalDistance + distance > MAX_DISTANCE) {
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
    // setRouteWeightMap((prevMap) => [
    //   ...prevMap,
    //   {
    //     from: selectedRoute[selectedRoute.length - 1],
    //     to: node,
    //     w: weight,
    //     d: distance,
    //   },
    // ]);
    console.log("Route in side adRoute context: ", selectedRoute);
    setTotalDistance((prevTotalDistance) => prevTotalDistance + distance);
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
    setTotalDistance((prevTotalDistance) => prevTotalDistance - distance);
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
        resetRoute,
        setSelectedRoute,
        getRoute,
        addNodeToRoute,
        deleteNodeToRoute,
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
