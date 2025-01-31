"use client";
import GraphVisualiser from "@/components/GraphVisualizer/GraphVisualizer";
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
import React, { useState } from "react";
import useSWR from "swr";
import { useCargoContext } from "@/components/context/CargoContext";
import { useRouteContext } from "@/components/context/RouteContext";
import { DataItem } from "@/db/data";
import { useDataContext } from "../context/DataContext";

export default function GraphVisualization() {
  const { resetCargo, setOptimalSolutionCargo } = useCargoContext();
  const { resetRoute, setOptimalSolutionRoute } = useRouteContext();
  const { selectedDataset, setSelectedDataset, maxCapacity, maxDistance } =
    useDataContext();
  const [resetSignal, setResetSignal] = useState(false);
  const [isToggled, setIsToggled] = useState(false); // New state for toggle

  const { data: filenames, error } = useSWR<string[]>(
    `/api/data/filename`,
    fetcher
  );

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
        `/api/data/optimalSolution?filename=${encodeURIComponent(
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
      setOptimalSolutionRoute(
        optimalSolution.content.route,
        optimalSolution.content.cargo
      );
      setOptimalSolutionCargo(
        optimalSolution.content.route,
        optimalSolution.content.cargo
      );
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
        <div className="bg-popover rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 space-y-3 sm:space-y-0">
          <Select value={selectedDataset} onValueChange={setSelectedDataset}>
            <SelectTrigger className="w-full sm:w-[300px] md:w-[400px] border-black">
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

          {maxCapacity && (
            <div className="flex flex-row gap-4 items-center">
              <div>Max Capacity</div>
              <div className="w-[50px] h-[35px] border border-input bg-background text-sm rounded-md flex items-center justify-center">
                {maxCapacity}
              </div>

              {/* <Select
              value={maxCapacity.toString()}
              onValueChange={(value) => setNewMaxCapacity(Number(value))}
            >
              <SelectTrigger className="w-full sm:w-[50px] md:w-[70px] border-black">
                <SelectValue placeholder="Max Capacity" />
              </SelectTrigger>
              <SelectContent className="text-text__primary bg-background">
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            </div>
          )}

          {maxDistance && (
            <div className="flex flex-row gap-4 items-center">
              <div>Max Distance</div>
              <div className="w-[50px] h-[35px] border border-input bg-background text-sm rounded-md flex items-center justify-center">
                {maxDistance}
              </div>
              {/* <Select
              value={maxDistance.toString()}
              onValueChange={(value) => setNewMaxDistance(Number(value))}
            >
              <SelectTrigger className="w-full sm:w-[50px] md:w-[70px] border-black">
                <SelectValue placeholder="Max Capacity" />
              </SelectTrigger>
              <SelectContent className="text-text__primary bg-background">
                {[20, 25, 30, 35, 40].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            </div>
          )}

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
                View All Requests
              </label>
            </div>
            <Button
              onClick={() => {
                handleShowOptimal();
              }}
              variant="destructive"
              className="text-white w-full sm:w-auto"
            >
              Show Optimal
            </Button>
            <Button
              onClick={() => {
                resetCargo();
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
          <GraphVisualiser
            filename={selectedDataset}
            resetSignal={resetSignal}
            isToggled={isToggled} // Pass the toggle state to GraphVisualiser
          />
        </div>
      </div>
    </div>
  );
}
