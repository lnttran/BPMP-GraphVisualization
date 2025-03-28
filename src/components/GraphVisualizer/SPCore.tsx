"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Import the Switch component
import { fetcher } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useDataSPContext } from "../context/DataSPContext";
import SPGraphVisualiser from "./SPGraphVisualizer";
import { useRouteSPContext } from "../context/RouteSPContext";

export default function SPGraphVisualization() {
  const { selectedDataset, setSelectedDataset } = useDataSPContext();
  const { resetRoute, setOptimalSolutionRoute, setReachableNodes } =
    useRouteSPContext();

  const [resetSignal, setResetSignal] = useState(false);
  const [isToggled, setIsToggled] = useState(false); // New state for toggle

  const { data: filenames, error } = useSWR<string[]>(
    `/api/shortestpath/data/filename`,
    fetcher
  );

  useEffect(() => {
    setReachableNodes([]); // Clears reachable nodes
  }, [selectedDataset]);

  if (error) return <div>Failed to load</div>;
  if (!filenames) return <div>Loading...</div>;

  const handleToggle = () => {
    setIsToggled(!isToggled);
    // Add your toggle logic here
  };

  const handleShowOptimal = async () => {
    if (!selectedDataset) {
      alert("Please select a dataset first.");
      return;
    }

    try {
      const response = await fetch(
        `/api/shortestpath/data/optimalSolution?filename=${encodeURIComponent(
          selectedDataset
        )}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch optimal solution:", errorData.message);
        alert(`Error: ${errorData.message}`);
        return;
      }

      const optimalSolution = await response.json();
      console.log("Optimal Solution:", optimalSolution);
      if (optimalSolution.content.routes.length > 0) {
        setOptimalSolutionRoute(
          optimalSolution.content.routes[
            optimalSolution.content.routes.length - 1
          ]
        );
      } else {
        setOptimalSolutionRoute([]); // Handle empty case
      }
      setReachableNodes(optimalSolution.content.routes);
    } catch (error) {
      console.error("Error while fetching optimal solution:", error);
    }
  };

  return (
    <div className="relative bg-background w-full h-full">
      <div className="flex flex-col gap-4 h-full">
        <h1 className="font-extrabold text-[32px] sm:text-3xl md:text-[32px]">
          Graph Visualization
        </h1>
        <div className="bg-popover rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between p-3 gap-2">
          <Select value={selectedDataset} onValueChange={setSelectedDataset}>
            <SelectTrigger className="sm:w-[500px] md:w-[300px] lg:w-[400px] border-black">
              <SelectValue placeholder="Select dataset" />
            </SelectTrigger>
            <SelectContent className="text-text__primary bg-background">
              <SelectGroup>
                {filenames.map((filename) => (
                  <SelectItem key={filename} value={filename}>
                    {filename}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isToggled}
                onCheckedChange={handleToggle}
                id="toggle-mode"
                thumbClassName="data-[state=checked]:bg-background data-[state=unchecked]:bg-destructive"
                className="data-[state=checked]:bg-destructive data-[state=unchecked]:bg-background border-destructive border-[1.5px]"
              />
              <label htmlFor="toggle-mode" className="text-sm">
                View All Arcs
              </label>
            </div>
            <Button
              onClick={() => {
                handleShowOptimal();
              }}
              variant="destructive"
              className="text-white w-full sm:w-auto"
            >
              Show Solution
            </Button>
            <Button
              onClick={() => {
                resetRoute();
                setResetSignal((prev) => !prev);
              }}
              variant="destructive"
              className="text-white w-full sm:w-auto"
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="relative flex-grow">
          <SPGraphVisualiser
            filename={selectedDataset}
            resetSignal={resetSignal}
            isToggled={isToggled} // Pass the toggle state to GraphVisualiser
          />
        </div>
      </div>
    </div>
  );
}
