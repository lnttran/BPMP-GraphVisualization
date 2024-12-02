import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { DataItem } from "@/db/data";

type DataContextType = {
  setSelectedDataset: React.Dispatch<React.SetStateAction<string>>;
  retrievedData: DataItem | null;
  selectedDataset: string;
  maxCapacity: number;
  lastNode: number | null;
  maxDistance: number;
};

// Step 2: Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [retrievedData, setRetrievedData] = useState<DataItem | null>(null);
  const [maxCapacity, setMaxCapacity] = useState(1);
  const [lastNode, setLastNode] = useState<number | null>(null);
  const [maxDistance, setMaxDistance] = useState(20);
  const defaultDataset = "demo_data_2.txt";

  const [selectedDataset, setSelectedDataset] = useState(() => {
    const storedVersion = localStorage.getItem("appVersion");
    const currentVersion = "1.0.0"; // Change this when you release updates
    const storedDataset = localStorage.getItem("selectedDataset");

    // Reset localStorage if version has changed or no dataset is stored
    if (storedVersion !== currentVersion || !storedDataset) {
      localStorage.setItem("appVersion", currentVersion);
      localStorage.setItem("selectedDataset", defaultDataset);
      return defaultDataset;
    }

    return storedDataset;
  });

  useEffect(() => {
    localStorage.setItem("selectedDataset", selectedDataset);

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
          setLastNode(Number(data.data.n));
          setNewMaxDistance(Number(data.data.DIS));
        }
      } catch (err) {
        console.log("error");
      }
    };

    fetchData();
  }, [selectedDataset]);

  const setNewMaxCapacity = (newCapacity: number) => {
    if (newCapacity > 0) {
      setMaxCapacity(newCapacity);
    } else {
      console.error("Max capacity must be greater than 0");
    }
  };

  const setNewMaxDistance = (newDistance: number) => {
    if (newDistance > 0) {
      setMaxDistance(newDistance);
    } else {
      console.error("Max distance must be greater than 0");
    }
  };

  return (
    <DataContext.Provider
      value={{
        setSelectedDataset,
        retrievedData,
        maxCapacity,
        lastNode,
        maxDistance,
        selectedDataset,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Step 4: Custom hook to use context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
