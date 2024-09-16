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
import { weightDistant } from "@/db/data";

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
  const { selectedRoute } = useRouteContext();
  const { toast } = useToast();

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

    console.log("before removing", modifiedRouteWeightMap);
    console.log("before removing cargo", selectedCargo);

    let updatedCargo = [...selectedCargo];

    updatedCargo = updatedCargo.filter((cargo) => {
      // Check if the cargo has the removedNode as either pickup or dropoff
      if (cargo.pickup === removedNode || cargo.dropoff === removedNode) {
        const pickupPosition = selectedRoute.indexOf(cargo.pickup);
        const dropoffPosition = selectedRoute.indexOf(cargo.dropoff);

        console.log("pickup index: ", pickupPosition);
        console.log("dropoff position: ", dropoffPosition);

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

    console.log("removing just the selectedCargo", modifiedRouteWeightMap);

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

    console.log("remaing w: ", remainingCargo);

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
    console.log("create new relationship pre and next", modifiedRouteWeightMap);
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
