// get Route

import { useDataContext } from "../context/DataContext";

// const PRICE_CHARGE = 1.2;
// const TRAVEL_COST = 1;
// const VEHICLE_WEIGHT = 0.1;

//get Cargo

type Cargo = {
  pickup: number;
  dropoff: number;
  w: number;
  d: number;
};

//calculate cargo
export const CalculateProfit = ({
  selectedRouteWeightMap,
  selectedCargo,
  distance,
}: {
  selectedRouteWeightMap: Cargo[];
  selectedCargo: Cargo[];
  distance: number;
}) => {
  const { priceCharge, travelCost, vehicleWeight } = useDataContext();
  let p1 = 0;
  let p2 = 0;

  //calculate price charge per cargo picked up
  p1 += selectedCargo.reduce((accumulate, cargo) => {
    if (cargo.w !== null && cargo.d !== null) {
      return accumulate + cargo.w * cargo.d;
    }
    return accumulate;
  }, 0);

  //calculate the travel cost
  p2 += selectedRouteWeightMap.reduce((accumulate, weight) => {
    return accumulate + weight.w * weight.d;
  }, 0);

  const revenue = priceCharge * p1;
  const cost = travelCost * p2;
  const TotalProfit = revenue - cost - travelCost * vehicleWeight * distance;

  return parseFloat(TotalProfit.toFixed(4));
};

//calculate distant
