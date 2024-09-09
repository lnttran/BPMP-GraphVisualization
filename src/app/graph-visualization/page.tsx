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
import { fetcher } from "@/lib/utils";
import React, { useState } from "react";
import useSWR from "swr";

export default function GraphVisualization() {
  const [selectedValue, setSelectedValue] = useState("t5_10_data.txt");

  const { data: filenames, error } = useSWR<string[]>(
    "/api/data/filename",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!filenames) return <div>Loading...</div>;

  return (
    <div className="relative bg-background w-full h-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="font-extrabold text-[32px]">Graph Visualization</div>
        <div className="h-16 bg-popover rounded-xl flex flex-row items-center px-3">
          <Select value={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger className="w-[450px] border-black">
              <SelectValue placeholder="Select dataset" />
            </SelectTrigger>
            <SelectContent className="text-text__primary bg-background">
              <SelectGroup>
                <SelectLabel>5 nodes</SelectLabel>
                {filenames.map((filename) => (
                  <SelectItem key={filename} value={filename}>
                    {filename}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="relative h-full">
          <GraphVisualiser filename={selectedValue} />
        </div>
      </div>
    </div>
  );
}
