import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouteContext } from "./RouteContext";
import {
  ToastAction,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { getWeightDistantbyPickupDropoff } from "../GraphVisualizer/GraphVisualizer";
import { DataItem, weightDistant } from "@/db/data";

// Step 1: Define context type
export type Cargo = {
  pickup: number;
  dropoff: number;
  w: number;
  d: number;
};

// const MAX_CAPACITY = 1;

type CargoContextType = {
  selectedCargo: Cargo[];
  setSelectedCargo: React.Dispatch<React.SetStateAction<Cargo[]>>;
  setOptimalSolutionCargo: (route: number[], cargo: [number, number][]) => void;
  // setRouteWeightMap: React.Dispatch<React.SetStateAction<Cargo[]>>;
  calculateTotalWeight: () => number;
  setNewMaxCapacity: (newCapacity: number) => void;
  maxCapacity: number;
  resetCargo: () => void;
  // routeWeightMap: Cargo[];
  addCargo: (selectedRoute: number[], cargo: Cargo) => void;
  removeCargoGivenRemovedNode: (
    removedNode: number,
    data: weightDistant[]
  ) => void;
  removeCargo: (cargoToRemove: Cargo) => void;
  getCurrentRouteWeight: ({ from, to }: { from: number; to: number }) => number;
};

// Step 2: Create context
const CargoContext = createContext<CargoContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type CargoProviderProps = {
  children: ReactNode;
};

export const CargoProvider: React.FC<CargoProviderProps> = ({ children }) => {
  const [maxCapacity, setMaxCapacity] = useState(1);
  const [selectedCargo, setSelectedCargo] = useState<Cargo[]>([]);
  const { routeWeightMap, setRouteWeightMap } = useRouteContext();
  const { selectedRoute, selectedDataset } = useRouteContext();
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
        if (data && data.data) {
          setNewMaxCapacity(Number(data.data.c));
          // setLastNode(Number(data.data.n));
          // setNewMaxDistance(Number(data.data.DIS));
        }
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

  const setOptimalSolutionCargo = (
    route: number[],
    cargo: [number, number][]
  ) => {
    const updatedCargo: Cargo[] = cargo.map(
      ([pickup, dropoff]: [number, number]) => {
        const weightDistance = weightDistantData.find(
          (item) => item.x === pickup && item.y === dropoff
        );

        if (weightDistance) {
          return {
            pickup,
            dropoff,
            w: weightDistance.w,
            d: weightDistance.d,
          };
        } else {
          console.warn(
            `No weight or distance data found for pickup ${pickup} and dropoff ${dropoff}`
          );
          return {
            pickup,
            dropoff,
            w: 0, // Default or fallback values
            d: 0, // Default or fallback values
          };
        }
      }
    );

    setSelectedCargo(updatedCargo);

    const updatedRouteWeightMap: Cargo[] = [];

    for (let i = 0; i < route.length - 1; i++) {
      const pickup = route[i];
      const dropoff = route[i + 1];

      const weightDistance = weightDistantData.find(
        (item) => item.x === pickup && item.y === dropoff
      );

      updatedRouteWeightMap.push({
        pickup,
        dropoff,
        w: 0, // Default weight
        d: weightDistance ? weightDistance.d : 0, // Use distance from data or 0 if not found
      });
    }
    console.log("initlaise routeWeightmap", updatedRouteWeightMap);

    updatedCargo.forEach(({ pickup, dropoff, w }) => {
      // Find existing route segment in routeWeightMap
      const existingSegment = updatedRouteWeightMap.find(
        (segment) => segment.pickup === pickup && segment.dropoff === dropoff
      );

      if (existingSegment) {
        // Update weight for the existing segment
        existingSegment.w = w;
      } else {
        // Add weight for a new segment by iterating through selectedRoute
        let currentIndex = route.indexOf(pickup);
        const dropoffIndex = route.indexOf(dropoff);

        if (
          currentIndex === -1 ||
          dropoffIndex === -1 ||
          currentIndex > dropoffIndex
        ) {
          console.warn(
            `Invalid route configuration: pickup ${pickup} or dropoff ${dropoff} not in selectedRoute`
          );
          return;
        }

        while (currentIndex < dropoffIndex) {
          const currentPickup = route[currentIndex];
          const currentDropoff = route[currentIndex + 1];

          // Find or add the current segment in the routeWeightMap
          let segment = updatedRouteWeightMap.find(
            (segment) =>
              segment.pickup === currentPickup &&
              segment.dropoff === currentDropoff
          );

          if (segment) {
            // Add weight to the segment
            segment.w += w;
          }
          // Move to the next segment
          currentIndex++;
        }
      }
    });
    setRouteWeightMap(updatedRouteWeightMap);
  };

  const setNewMaxCapacity = (newCapacity: number) => {
    if (newCapacity > 0) {
      setMaxCapacity(newCapacity);
    } else {
      console.error("Max capacity must be greater than 0");
    }
  };

  const calculateTotalWeight = () => {
    return Number(
      selectedCargo
        .reduce((total, cargo) => total + (cargo.w || 0), 0)
        .toFixed(4)
    );
  };

  const resetCargo = () => {
    setSelectedCargo([]);
    setRouteWeightMap([]);
  };

  const getCurrentRouteWeight = ({
    from,
    to,
  }: {
    from: number;
    to: number;
  }): number => {
    const cargo = routeWeightMap.find(
      (item) => item.pickup === from && item.dropoff === to
    );

    return cargo ? parseFloat(cargo.w.toFixed(2)) : 0;
  };

  const addCargo = (selectedRoute: number[], cargo: Cargo) => {
    const pickupIndex = selectedRoute.indexOf(cargo.pickup);
    const dropoffIndex = selectedRoute.indexOf(cargo.dropoff);

    if (Math.abs(pickupIndex - dropoffIndex) === 1) {
      setSelectedCargo((prevSelectedCargo) => [...prevSelectedCargo, cargo]);
      setRouteWeightMap((prevRouteWeightMap) => {
        const cargoIndex = prevRouteWeightMap.findIndex(
          (item) =>
            item.pickup === cargo.pickup && item.dropoff === cargo.dropoff
        );

        if (cargoIndex !== -1) {
          // Update the existing cargo by replacing w and d
          return prevRouteWeightMap.map((item, index) =>
            index === cargoIndex ? { ...item, w: cargo.w, d: cargo.d } : item
          );
        } else {
          // Add the new cargo
          return [...prevRouteWeightMap, cargo];
        }
      });
      // console.log("cargo added");
    } else {
      let modifiedRouteWeightMap = [...routeWeightMap];

      let exceedCapacity = false;
      for (let i = pickupIndex; i < dropoffIndex; ++i) {
        modifiedRouteWeightMap = modifiedRouteWeightMap.map((item) => {
          if (
            item.pickup === selectedRoute[i] &&
            (item.w || 0) + (cargo.w || 0) > maxCapacity
          ) {
            exceedCapacity = true;
          } else if (item.pickup === selectedRoute[i]) {
            return {
              ...item,
              w: (item.w || 0) + (cargo.w || 0), // Adding the weights
            };
          }
          return item;
        });

        if (exceedCapacity) {
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
                    {`Failed to add cargo ${cargo.pickup} - ${cargo.dropoff}`}
                  </ToastTitle>
                  <ToastDescription className="text-lg text-white">{`Exceed the maximum cargo limit (1).`}</ToastDescription>
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

          break;
        }
      }

      if (!exceedCapacity) {
        setRouteWeightMap(modifiedRouteWeightMap);
        setSelectedCargo((prevSelectedCargo) => [...prevSelectedCargo, cargo]);
        toast({
          variant: "destructive",
          style: { height: "auto", borderRadius: "15px" },
          description: (
            <div className="flex flex-row items-center gap-10">
              <IoIosCheckmarkCircleOutline
                className="text-white"
                size={"40px"}
              />
              <div>
                <ToastTitle className="text-xl font-bold text-white">
                  {`Cargo added successfully`}
                </ToastTitle>
                <ToastDescription className="text-lg text-white">{`Cargo ${cargo.pickup} - ${cargo.dropoff} added to the route`}</ToastDescription>
              </div>
            </div>
          ),
        });
      }
    }
  };

  const removeCargoGivenRemovedNode = (
    removedNode: number,
    data: weightDistant[]
  ) => {
    let modifiedRouteWeightMap = [...routeWeightMap];
    let remainingCargo, previousNode, nextNode;

    let updatedCargo = [...selectedCargo];

    updatedCargo = updatedCargo.filter((cargo) => {
      // Check if the cargo has the removedNode as either pickup or dropoff
      if (cargo.pickup === removedNode || cargo.dropoff === removedNode) {
        const pickupPosition = selectedRoute.indexOf(cargo.pickup);
        const dropoffPosition = selectedRoute.indexOf(cargo.dropoff);

        for (let i = pickupPosition; i < dropoffPosition; ++i) {
          modifiedRouteWeightMap = modifiedRouteWeightMap.map((item) => {
            if (item.pickup === selectedRoute[i]) {
              return {
                ...item,
                w: Math.max(0, (item.w || 0) - (cargo.w || 0)),
              };
            }
            return item;
          });
        }

        return false; // Remove this cargo
      }

      return true;
    });

    // Update the selectedCargo state with the modified copy
    setSelectedCargo(updatedCargo);

    modifiedRouteWeightMap = modifiedRouteWeightMap.filter((cargo) => {
      if (cargo.pickup === removedNode || cargo.dropoff === removedNode) {
        remainingCargo = cargo.w;

        if (cargo.dropoff === removedNode) {
          previousNode = cargo.pickup;
        } else if (cargo.pickup === removedNode) {
          nextNode = cargo.dropoff;
        }

        // Remove this cargo by returning false
        return false;
      }

      // Keep this cargo by returning true
      return true;
    });

    if (
      previousNode !== undefined &&
      nextNode !== undefined &&
      remainingCargo !== undefined
    ) {
      const { w, d } = getWeightDistantbyPickupDropoff(
        previousNode,
        nextNode,
        data
      );

      modifiedRouteWeightMap.push({
        pickup: previousNode,
        dropoff: nextNode,
        w: remainingCargo,
        d: d,
      });
    }
    setRouteWeightMap(modifiedRouteWeightMap);
  };

  const removeCargo = (cargoToRemove: Cargo) => {
    const pickupIndex = selectedRoute.indexOf(cargoToRemove.pickup);
    const dropoffIndex = selectedRoute.indexOf(cargoToRemove.dropoff);

    let modifiedRouteWeightMap = [...routeWeightMap];
    for (let i = pickupIndex; i < dropoffIndex; ++i) {
      modifiedRouteWeightMap = modifiedRouteWeightMap.map((item) => {
        if (item.pickup === selectedRoute[i]) {
          return {
            ...item,
            w: Math.max(0, (item.w || 0) - (cargoToRemove.w || 0)), // Adding the weights
          };
        }
        return item;
      });
    }

    setRouteWeightMap(modifiedRouteWeightMap);
    setSelectedCargo((prevSelectedCargo) =>
      prevSelectedCargo.filter(
        (cargo) =>
          cargo.pickup !== cargoToRemove.pickup ||
          cargo.dropoff !== cargoToRemove.dropoff
      )
    );

    toast({
      variant: "destructive",
      style: { height: "auto", borderRadius: "15px" },
      description: (
        <div className="flex flex-row items-center gap-10">
          <IoIosCheckmarkCircleOutline className="text-white" size={"40px"} />
          <div>
            <ToastTitle className="text-xl font-bold text-white">
              {`Cargo removed successfully`}
            </ToastTitle>
            <ToastDescription className="text-lg text-white">{`Cargo ${cargoToRemove.pickup} - ${cargoToRemove.dropoff} removed from the route`}</ToastDescription>
          </div>
        </div>
      ),
    });
  };

  return (
    <CargoContext.Provider
      value={{
        selectedCargo,
        maxCapacity,
        setNewMaxCapacity,
        resetCargo,
        removeCargoGivenRemovedNode,
        removeCargo,
        setSelectedCargo,
        addCargo,
        calculateTotalWeight,
        getCurrentRouteWeight,
        setOptimalSolutionCargo,
      }}
    >
      {children}
    </CargoContext.Provider>
  );
};

// Step 4: Custom hook to use context
export const useCargoContext = () => {
  const context = useContext(CargoContext);
  if (!context) {
    throw new Error("useCargoContext must be used within a CargoProvider");
  }
  return context;
};
