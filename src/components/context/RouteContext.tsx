import React, { createContext, useContext, useState, ReactNode } from "react";

// Step 1: Define context type
type RouteContextType = {
  selectedRoute: number[];
  setSelectedRoute: React.Dispatch<React.SetStateAction<number[]>>;
  getRoute: () => string;
  addNodeToRoute: (node: number, weight: number, distance: number) => void;
  deleteNodeToRoute: (nodeToRemove: number, distance: number) => void;
  routeWeightMap: Weight[];
  totalDistance: number;
};

type Weight = {
  from: number;
  to: number;
  w: number;
  d: number;
};

// Step 2: Create context
const RouteContext = createContext<RouteContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type RouteProviderProps = {
  children: ReactNode;
};

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState<number[]>([1]);
  const [routeWeightMap, setRouteWeightMap] = useState<Weight[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const getRoute = () => {
    return selectedRoute.join(" -> ");
  };

  const addNodeToRoute = (node: number, weight: number, distance: number) => {
    setSelectedRoute((prevRoute) => [...prevRoute, node]);
    setRouteWeightMap((prevMap) => [
      ...prevMap,
      {
        from: selectedRoute[selectedRoute.length - 1],
        to: node,
        w: weight,
        d: distance,
      },
    ]);
    setTotalDistance((prevTotalDistance) => prevTotalDistance + distance);
    // need to write more function in here
  };

  const deleteNodeToRoute = (nodeToRemove: number, distance: number) => {
    setSelectedRoute((prevRoute) =>
      prevRoute.filter((n) => n !== nodeToRemove)
    );

    setRouteWeightMap((prevMap) =>
      prevMap.filter(
        (route) => route.from !== nodeToRemove && route.to !== nodeToRemove
      )
    );
    setTotalDistance((prevTotalDistance) => prevTotalDistance - distance);
  };

  return (
    <RouteContext.Provider
      value={{
        selectedRoute,
        totalDistance,
        routeWeightMap,
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
