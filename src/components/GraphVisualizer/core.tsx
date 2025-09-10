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
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useCargoContext } from "@/components/context/CargoContext";
import { useRouteContext } from "@/components/context/RouteContext";
import { DataItem } from "@/db/data";
import { useDataContext } from "../context/DataContext";
import { toast } from "sonner";
import { useToast } from "../ui/use-toast";
import { ToastDescription, ToastTitle } from "@radix-ui/react-toast";
import { MdErrorOutline } from "react-icons/md";

// 修改 optimalButtonControl 对象，添加对不同文件的支持
const optimalButtonControl = {
  // 使用对象存储每个文件的尝试次数
  attemptsMap: {} as Record<string, number>,
  optimalFoundMap: {} as Record<string, boolean>,
  maxAttempts: 5,
  currentFile: '',
  
  // 设置当前文件
  setCurrentFile: function(filename: string) {
    this.currentFile = filename;
    // 如果是新文件，初始化计数
    if (!this.attemptsMap[filename]) {
      this.attemptsMap[filename] = 0;
      this.optimalFoundMap[filename] = false;
    }
  },
  
  // 获取当前文件的尝试次数
  getCurrentAttempts: function() {
    return this.attemptsMap[this.currentFile] || 0;
  },
  
  // 增加当前文件的尝试次数
  incrementAttempts: function() {
    if (!this.currentFile) return;
    if (!this.attemptsMap[this.currentFile]) {
      this.attemptsMap[this.currentFile] = 0;
    }
    this.attemptsMap[this.currentFile]++;
  },
  
  // 设置当前文件找到最优解
  setOptimalFound: function() {
    if (!this.currentFile) return;
    this.optimalFoundMap[this.currentFile] = true;
  },
  
  // 检查当前文件是否可以显示最优解
  canShowOptimal: function() {
    if (!this.currentFile) return false;
    const attempts = this.attemptsMap[this.currentFile] || 0;
    const found = this.optimalFoundMap[this.currentFile] || false;
    return found || attempts >= this.maxAttempts;
  },
  
  // 获取当前文件的剩余尝试次数
  getRemainingAttempts: function() {
    const attempts = this.getCurrentAttempts();
    return Math.max(0, this.maxAttempts - attempts);
  },
  
  // 重置当前文件的状态
  reset: function() {
    if (!this.currentFile) return;
    this.attemptsMap[this.currentFile] = 0;
    this.optimalFoundMap[this.currentFile] = false;
  }
};

if (typeof window !== 'undefined') {
  (window as any).optimalButtonControl = optimalButtonControl;
}

export default function GraphVisualization() {
  const { resetCargo, setOptimalSolutionCargo } = useCargoContext();
  const { resetRoute, setOptimalSolutionRoute } = useRouteContext();
  const { selectedDataset, setSelectedDataset, maxCapacity, maxDistance } =
    useDataContext();
  const { toast } = useToast();
  const [resetSignal, setResetSignal] = useState(false);
  const [isToggled, setIsToggled] = useState(false); // New state for toggle

  const [canShowButton, setCanShowButton] = useState(false);

  useEffect(() => {
    if (selectedDataset && (window as any).optimalButtonControl) {
      (window as any).optimalButtonControl.setCurrentFile(selectedDataset);
    }
  }, [selectedDataset]);


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


  const handleReset = () => {
    resetCargo();
    resetRoute();
    setResetSignal((prev) => !prev);
    
    if ((window as any).optimalButtonControl) {
      (window as any).optimalButtonControl.reset();
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
