"use client";

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
    <div className="relative bg-background h-full">
      {/* <div className="relative h-full"> */}
      <div className="relative flex flex-col gap-4 h-full">
        <div className="font-extrabold text-[32px]">Data</div>
        <div className="relative w-full bg-popover rounded-xl flex flex-row gap-4 h-full p-5">
          <div className="relative bg-background rounded-xl h-full p-5 w-2/6">
            {/* <div className="p-5 gap-5"> */}
            <Select value={selectedValue} onValueChange={setSelectedValue}>
              <SelectTrigger className=" border-black">
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
            {/* </div> */}
          </div>
          <div className="relative w-full bg-background rounded-xl h-full">
            <Tabs defaultValue="data" className="relative w-full h-full">
              {/* <div className="relative h-full"> */}
              <TabsList className="grid w-full grid-cols-2 bg-background">
                <TabsTrigger
                  value="data"
                  className="data-[state=active]:bg-destructive data-[state=active]:text-white"
                >
                  Data
                </TabsTrigger>
                <TabsTrigger
                  value="coordinate"
                  className="data-[state=active]:bg-destructive data-[state=active]:text-white"
                >
                  Coordinate
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="data"
                className="mt-10 ml-10 absolute h-5/6 w-11/12"
              >
                <ScrollArea className="absolute h-full overflow-y-auto ">
                  <pre>{JSON.stringify(allInfoData, null, 2)}</pre>
                </ScrollArea>
              </TabsContent>
              <TabsContent
                value="coordinate"
                className="mt-10 ml-10 absolute h-5/6 w-11/12"
              >
                <ScrollArea className="absolute h-full overflow-y-auto">
                  <div>
                    <pre>{JSON.stringify(coordinateData, null, 2)}</pre>
                  </div>
                </ScrollArea>
              </TabsContent>
              {/* </div> */}
            </Tabs>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
