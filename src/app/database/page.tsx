"use client";
import GraphVisualiser from "@/components/graphVisualizer/GraphVisualizer";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { DataItem } from "@/db/data";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DataBase() {
  const [selectedValue, setSelectedValue] = useState("t5_10_data.txt");
  const [retrievedData, setRetrievedData] = useState<DataItem[] | null>(null);
  const [dataError, setDataError] = useState("");
  const { data: filenames, error } = useSWR<string[]>(
    "/api/data/filename",
    fetcher
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data?fileName=${selectedValue}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setRetrievedData(result);
      } catch (err) {
        if (err instanceof Error) {
          setDataError(err.message);
        } else {
          // Handle unexpected error type
          setDataError("An unknown error occurred.");
        }
      }
    };

    fetchData();
  }, [selectedValue]);

  if (error) return <div>Failed to load</div>;
  if (!filenames) return <div>Loading...</div>;

  const allInfoData = retrievedData?.[0]?.data || null;
  const coordinateData = retrievedData?.[0]?.coordinate || [];

  return (
    <div className="relative bg-background w-full h-screen px-10 pt-16">
      <div className="flex flex-col gap-3 flew-grow">
        <div className="font-extrabold text-[32px]">Data</div>
      </div>
      <div className="w-full h-5/6 mb-4 bg-popover rounded-xl flex flex-row">
        <div className="w-[600px] bg-background m-5 rounded-xl">
          <div className="p-5 flex flex-row gap-5">
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
        </div>
        <div className="w-full bg-background m-5 rounded-xl">
          <Tabs defaultValue="data" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="coordinate">Coordinate</TabsTrigger>
            </TabsList>
            <TabsContent value="data">
              <ScrollArea className="h-[800px]  p-4">
                <div>
                  <pre>{JSON.stringify(allInfoData, null, 2)}</pre>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="coordinate">
              <ScrollArea className="h-[800px]  p-4">
                <div>
                  <pre>{JSON.stringify(coordinateData, null, 2)}</pre>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
