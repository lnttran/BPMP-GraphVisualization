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
import { toast } from "sonner";
import { useToast } from "../ui/use-toast";
import { ToastDescription, ToastTitle } from "@radix-ui/react-toast";
import { MdErrorOutline } from "react-icons/md";

export default function GraphVisualization() {
  const { resetCargo, setOptimalSolutionCargo } = useCargoContext();
  const { resetRoute, setOptimalSolutionRoute } = useRouteContext();
  const { selectedDataset, setSelectedDataset, maxCapacity, maxDistance } =
    useDataContext();
  const { toast } = useToast();
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
        // console.error("Failed to fetch optimal solution:", errorData.message);

        toast({
          variant: "destructive",
          style: { height: "auto", borderRadius: "15px" },
          description: (
            <div className="flex flex-row items-center gap-10">
              <MdErrorOutline className="text-white" size={"50px"} />
              <div>
                <ToastTitle className="text-xl font-bold text-white">
                  {`Solution is not yet available! `}
                </ToastTitle>
                <ToastDescription className="text-lg text-white">{`${errorData.message}`}</ToastDescription>
              </div>
            </div>
          ),
        });
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
        <h1 className="font-extrabold text-xl pl-14 md:pl-0 sm:text-3xl md:text-4xl lg:text-[32px]">
          Graph Visualization
        </h1>
        <div className="bg-popover rounded-xl flex flex-col xl:flex-row items-start justify-between p-3 gap-3">
          <div className="flex flex-col lg:flex-row justify-between gap-3 w-full">
            <div className="flex flex-row justify-between w-full">

            
            <Select value={selectedDataset} onValueChange={setSelectedDataset}>
              <SelectTrigger className="w-[160px] sm:w-full lg:w-[500px] xl:w-[400px] border-black text-xs sm:text-sm ">
                <SelectValue placeholder="Select dataset"/>
              </SelectTrigger>
              <SelectContent className="text-black bg-background">
                <SelectGroup>
                  {filenames.map((filename) => (
                    <SelectItem key={filename} value={filename} className="text-xs sm:text-sm">
                      {filename}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2 sm:hidden ">
              <Switch
                checked={isToggled}
                onCheckedChange={handleToggle}
                id="toggle-mode"
                thumbClassName="data-[state=checked]:bg-background data-[state=unchecked]:bg-destructive"
                className="data-[state=checked]:bg-destructive data-[state=unchecked]:bg-background border-destructive border-[1.5px]"
              />
              <label htmlFor="toggle-mode" className="text-xs">
                All Requests
              </label>
            </div>
            </div>

            <div className="flex flex-row justify-between sm:justify-around w-full">
              {maxCapacity && (
                <div className="flex flex-row gap-4 items-center">
                  <div className="text-xs sm:text-sm md:text-base">Max Capacity</div>
                  <div className="w-[50px] h-[35px] border border-input bg-background text-sm rounded-md flex items-center justify-center">
                    {maxCapacity}
                  </div>
                </div>
              )}

              {maxDistance && (
                <div className="flex flex-row gap-4 items-center">
                  <div className="text-xs sm:text-sm md:text-base">Max Distance</div>
                  <div className="w-[50px] h-[35px] border border-input bg-background text-sm rounded-md flex items-center justify-center">
                    {maxDistance}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:justify-between lg:justify-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            <div className="items-center space-x-2 sm:flex hidden">
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
            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={() => {
                  handleShowOptimal();
                }}
                variant="destructive"
                className="text-white w-full sm:w-auto "
              >
                <div className="text-xs sm:text-sm md:text-md">Show Optimal</div>
                
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
               <div className="text-xs sm:text-sm md:text-md">Reset</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative flex-grow min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
          <GraphVisualiser
            filename={selectedDataset}
            resetSignal={resetSignal}
            isToggled={isToggled}
          />
        </div>
      </div>
    </div>
  );
}
