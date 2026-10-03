"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { DataItem } from "@/db/data";

type DataTSPContextType = {
  setSelectedDataset: React.Dispatch<React.SetStateAction<string>>;
  retrievedData: DataItem | null;
  selectedDataset: string;
  //   maxCapacity: number;
  lastNode: number | null;
  //   maxDistance: number;
};

// Step 2: Create context
const DataTSPContext = createContext<DataTSPContextType | undefined>(undefined);

// Step 3: Create provider component with typed props
type DataTSPProviderProps = {
  children: ReactNode;
};

export const DataTSPProvider: React.FC<DataTSPProviderProps> = ({ children }) => {
  const [retrievedData, setRetrievedData] = useState<DataItem | null>(null);
  const [lastNode, setLastNode] = useState<number | null>(null);
  const defaultDataset = "sp_02_data.txt";

  const [selectedDataset, setSelectedDataset] = useState(() => {
    if (typeof window !== "undefined") {
      // Safe to access localStorage in the browser
      const storedVersion = localStorage.getItem("appVersion");
      const currentVersion = "1.0.1"; // Change this when you release updates
      const storedDataset = localStorage.getItem("selectedTSPDataset");

      // Reset localStorage if version has changed or no dataset is stored
      if (storedVersion !== currentVersion || !storedDataset) {
        localStorage.setItem("appVersion", currentVersion);
        localStorage.setItem("selectedTSPDataset", defaultDataset);
        return defaultDataset;
      }

      return storedDataset;
    }
    // Default value for SSR
    return defaultDataset;
  });

  useEffect(() => {
    localStorage.setItem("selectedTSPDataset", selectedDataset);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/travelingsalesmanproblem/data?fileName=${selectedDataset}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        const data = result[0];

        let locationMap: Record<string, string> = {};

        // Fetch corresponding locations
        const locationResponse = await fetch(
          `/api/travelingsalesmanproblem/data/location?fileName=${selectedDataset}`
        );

        if (locationResponse.status === 200) {
          locationMap = await locationResponse.json();
        } else if (locationResponse.status !== 404) {
          throw new Error(`HTTP error! Status: ${locationResponse.status}`);
        }

    


        // Merge location into coordinate
        if (data.coordinate) {
          const enrichedCoordinates = data.coordinate.map((coord: any) => ({
            ...coord,
            location: locationMap[String(coord.node)],
          }));

          // Replace coordinates and set updated data
          const updatedData = {
            ...data,
            coordinate: enrichedCoordinates,
          };

          setRetrievedData(updatedData);
        } else {
          // No coordinate? Just set original data
          console.log("No coordinate data found, setting original data");
          setRetrievedData(data);
        }

        console.log(retrievedData?.coordinate?.[0]);

        
        // setRetrievedData(data);
        // // Set max capacity and max distance
        // if (data && data.data) {
        //   setLastNode(Number(data.data.n));
        // }

        

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
    <DataTSPContext.Provider
      value={{
        setSelectedDataset,
        retrievedData,
        lastNode,
        selectedDataset,
      }}
    >
      {children}
    </DataTSPContext.Provider>
  );
};

// Step 4: Custom hook to use context
export const useDataTSPContext = () => {
  const context = useContext(DataTSPContext);
  if (!context) {
    throw new Error("useDataTSPContext must be used within a DataTSPProvider");
  }
  return context;
};


