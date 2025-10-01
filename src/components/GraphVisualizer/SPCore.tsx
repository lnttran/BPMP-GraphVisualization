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
import { useToast } from "../ui/use-toast";
import { ToastDescription, ToastTitle } from "@radix-ui/react-toast";
import { MdErrorOutline } from "react-icons/md";

const optimalButtonControl = {
  attemptsMap: {} as Record<string, number>,
  optimalFoundMap: {} as Record<string, boolean>,
  maxAttempts: 10,
  currentFile: '',
  
  setCurrentFile: function(filename: string) {
    this.currentFile = filename;
    if (!this.attemptsMap[filename]) {
      this.attemptsMap[filename] = 0;
      this.optimalFoundMap[filename] = false;
    }
  },
  
  getCurrentAttempts: function() {
    return this.attemptsMap[this.currentFile] || 0;
  },
  
  incrementAttempts: function() {
    if (!this.currentFile) return;
    if (!this.attemptsMap[this.currentFile]) {
      this.attemptsMap[this.currentFile] = 0;
    }
    this.attemptsMap[this.currentFile]++;
    console.log(`🔢 Attempt #${this.attemptsMap[this.currentFile]} for ${this.currentFile}`);
  },
  
  setOptimalFound: function() {
    if (!this.currentFile) return;
    this.optimalFoundMap[this.currentFile] = true;
    console.log(`🎉 Optimal solution found for ${this.currentFile}!`);
  },
  
  canShowOptimal: function() {
    if (!this.currentFile) return false;
    const attempts = this.attemptsMap[this.currentFile] || 0;
    const found = this.optimalFoundMap[this.currentFile] || false;
    return found || attempts >= this.maxAttempts;
  },
  
  getRemainingAttempts: function() {
    const attempts = this.getCurrentAttempts();
    return Math.max(0, this.maxAttempts - attempts);
  },
  
  reset: function() {
    if (!this.currentFile) return;
    this.attemptsMap[this.currentFile] = 0;
    this.optimalFoundMap[this.currentFile] = false;
    console.log(`🔄 Reset for ${this.currentFile}`);
  }
};

if (typeof window !== 'undefined') {
  (window as any).optimalButtonControl = optimalButtonControl;
}

export default function SPGraphVisualization() {
  const { selectedDataset, setSelectedDataset } = useDataSPContext();
  const { resetRoute, setOptimalSolutionRoute, setReachableNodes } =
    useRouteSPContext();
  const { toast } = useToast();

  const [resetSignal, setResetSignal] = useState(false);
  const [isToggled, setIsToggled] = useState(false); // New state for toggle

  useEffect(() => {
    if (selectedDataset && (window as any).optimalButtonControl) {
      (window as any).optimalButtonControl.setCurrentFile(selectedDataset);
    }
  }, [selectedDataset]);

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

    if (!optimalButtonControl.canShowOptimal()) {
      const remaining = optimalButtonControl.getRemainingAttempts();
          toast({
            variant: "destructive",
            style: { height: "auto", borderRadius: "15px" },
            description: (
              <div className="flex flex-row items-center gap-10">
                <MdErrorOutline className="text-white" size={"50px"} />
                <div>
                  <ToastTitle className="text-xl font-bold text-white">
                    Not Available Yet
                  </ToastTitle>
                  <ToastDescription className="text-lg text-white">
                    {`Please continue trying to find the optimal solution. You have ${remaining} attempts remaining.`}
                  </ToastDescription>
                </div>
              </div>
            ),
          });
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
