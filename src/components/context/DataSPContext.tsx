import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { DataItem } from "@/db/data";

type DataSPContextType = {
  setSelectedDataset: React.Dispatch<React.SetStateAction<string>>;
  retrievedData: DataItem | null;
  selectedDataset: string;
  //   maxCapacity: number;
  lastNode: number | null;
  //   maxDistance: number;
};

// Step 2: Create context
const DataSPContext = createContext<DataSPContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type DataSPProviderProps = {
  children: ReactNode;
};

export const DataSPProvider: React.FC<DataSPProviderProps> = ({ children }) => {
  const [retrievedData, setRetrievedData] = useState<DataItem | null>(null);
  const [lastNode, setLastNode] = useState<number | null>(null);
  const defaultDataset = "sp_02_data.txt";

  const [selectedDataset, setSelectedDataset] = useState(() => {
    if (typeof window !== "undefined") {
      // Safe to access localStorage in the browser
      const storedVersion = localStorage.getItem("appVersion");
      const currentVersion = "1.0.0"; // Change this when you release updates
      const storedDataset = localStorage.getItem("selectedSPDataset");

      // Reset localStorage if version has changed or no dataset is stored
      if (storedVersion !== currentVersion || !storedDataset) {
        localStorage.setItem("appVersion", currentVersion);
        localStorage.setItem("selectedSPDataset", defaultDataset);
        return defaultDataset;
      }

      return storedDataset;
    }
    // Default value for SSR
    return defaultDataset;
  });

  useEffect(() => {
    localStorage.setItem("selectedSPDataset", selectedDataset);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/shortestpath/data?fileName=${selectedDataset}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        const data = result[0];
        setRetrievedData(data);
        // Set max capacity and max distance
        if (data && data.data) {
          setLastNode(Number(data.data.n));
        }
      } catch (err) {
        console.log("error");
      }
    };

    fetchData();
  }, [selectedDataset]);

  //   const setNewMaxCapacity = (newCapacity: number) => {
  //     if (newCapacity > 0) {
  //       setMaxCapacity(newCapacity);
  //     } else {
  //       console.error("Max capacity must be greater than 0");
  //     }
  //   };

  //   const setNewMaxDistance = (newDistance: number) => {
  //     if (newDistance > 0) {
  //       setMaxDistance(newDistance);
  //     } else {
  //       console.error("Max distance must be greater than 0");
  //     }
  //   };

  return (
    <DataSPContext.Provider
      value={{
        setSelectedDataset,
        retrievedData,
        // maxCapacity,
        lastNode,
        // maxDistance,
        selectedDataset,
      }}
    >
      {children}
    </DataSPContext.Provider>
  );
};

// Step 4: Custom hook to use context
export const useDataSPContext = () => {
  const context = useContext(DataSPContext);
  if (!context) {
    throw new Error("useDataSPContext must be used within a DataSPProvider");
  }
  return context;
};
