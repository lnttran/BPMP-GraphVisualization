// get Route

const PRICE_CHARGE = 1.2;
const TRAVEL_COST = 1;
const VEHICLE_WEIGHT = 0.1;

//get Cargo

type Cargo = {
  pickup: number;
  dropoff: number;
  w: number;
  d: number;
};

//calculate cargo
export const calculateProfit = ({
  selectedRouteWeightMap,
  selectedCargo,
  distance,
}: {
  selectedRouteWeightMap: Cargo[];
  selectedCargo: Cargo[];
  distance: number;
}) => {
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

  const revenue = PRICE_CHARGE * p1;
  const cost = TRAVEL_COST * p2;
  const TotalProfit = revenue - cost - TRAVEL_COST * VEHICLE_WEIGHT * distance;

  return parseFloat(TotalProfit.toFixed(4));
};

//calculate distant
