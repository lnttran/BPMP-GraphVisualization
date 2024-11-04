import { Cargo, useCargoContext } from "../context/CargoContext";

export const LineType = ({
  w,
  from,
  to,
  selectedRoute,
  routeWeightMap,
  selectedCargo,
}: {
  w?: number;
  d?: number;
  from?: number;
  to?: number;
  routeWeightMap?: Cargo[];
  selectedRoute?: number[];
  selectedCargo?: {
    pickup: number | null;
    dropoff: number | null;
    w: number | null;
    d: number | null;
  }[];
}) => {
  //selected distance has cargo = solid text-accent

  if (
    selectedRoute &&
    selectedCargo &&
    routeWeightMap &&
    selectedRoute.length > 1 &&
    from !== undefined &&
    to !== undefined
  ) {
    //if passing from and to does not found in the selectedCargo array
    if (
      //selected route with empty truck
      routeWeightMap.some(
        (cargo) => cargo.pickup === from && cargo.dropoff === to && cargo.w == 0
      )
    ) {
      return { style: "solid", color: "text-accent", display: "block" };
    } else if (
      //selected cargo but not a selected route
      selectedCargo.some(
        (cargo) => cargo.pickup === from && cargo.dropoff === to
      ) &&
      !areNodesAdjacentInRoute(from, to, selectedRoute)
    ) {
      //selected cargo through the route = solid red
      return {
        style: "dashed",
        color: "text-accent-foreground",
        display: "block",
      };
    } else if (
      routeWeightMap.some(
        (cargo) => cargo.pickup === from && cargo.dropoff === to && cargo.w > 0
      )
    ) {
      return {
        style: "solid",
        color: "text-accent-foreground",
        display: "block",
      }; // selected route with cargo
    } else if (w != 0.0) {
      return { style: "dashed", color: "text-accent", display: "block" };
    } else return { style: "dashed", color: "text-accent", display: "hidden" };
  } else if (w === 0.0) {
    //unselected distance without any cargo = dashed red
    return {
      style: "dashed",
      color: "text-accent-foreground",
      display: "hidden",
    };
  } else {
    //unselected distance with cargo
    return {
      style: "dashed",
      color: "text-accent",
      display: "block",
    };
  }
};

function areNodesAdjacentInRoute(
  from: number,
  to: number,
  route: number[]
): boolean {
  for (let i = 0; i < route.length - 1; i++) {
    if (route[i] === from && route[i + 1] === to) {
      return true;
    }
  }
  return false;
}
