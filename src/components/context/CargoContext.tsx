import React, { createContext, useContext, useState, ReactNode } from "react";

// Step 1: Define context type
type Cargo = {
  pickup: number | null;
  dropoff: number | null;
  w: number | null;
  d: number | null;
};

type CargoContextType = {
  selectedCargo: Cargo[];
  setSelectedCargo: React.Dispatch<React.SetStateAction<Cargo[]>>;
  calculateTotalWeight: () => number;
  calculateTotalDistance: () => number;
};

// Step 2: Create context
const CargoContext = createContext<CargoContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type CargoProviderProps = {
  children: ReactNode;
};

export const CargoProvider: React.FC<CargoProviderProps> = ({ children }) => {
  const [selectedCargo, setSelectedCargo] = useState<Cargo[]>([]);

  const calculateTotalWeight = () => {
    return Number(
      selectedCargo
        .reduce((total, cargo) => total + (cargo.w || 0), 0)
        .toFixed(4)
    );
  };

  const calculateTotalDistance = () => {
    return Number(
      selectedCargo
        .reduce((total, cargo) => total + (cargo.d || 0), 0)
        .toFixed(4)
    );
  };

  return (
    <CargoContext.Provider
      value={{
        selectedCargo,
        setSelectedCargo,
        calculateTotalWeight,
        calculateTotalDistance,
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
