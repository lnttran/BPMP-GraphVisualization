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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { fetcher } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { DataItem } from "@/db/data";
import {
  convertWeightDistanceData,
  JSONtoText,
} from "@/components/tools/dataParser";
import { useDataContext } from "@/components/context/DataContext";

export default function DataBase() {
  const { selectedDataset } = useDataContext();
  const [selectedValue, setSelectedValue] = useState(selectedDataset);
  const [showJSON, setShowJSON] = useState(false);
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
      <div className="relative flex flex-col gap-4 h-full">
        <div className="font-extrabold text-[32px]">Data</div>
        <div className="relative w-full bg-popover rounded-xl flex flex-row gap-4 h-full p-5">
          <div className="relative bg-background rounded-xl h-full p-5 w-2/6 flex flex-col gap-2">
            <div className="flex items-center space-x-2 mb-2">
              <Switch
                checked={showJSON}
                onCheckedChange={setShowJSON}
                thumbClassName="data-[state=checked]:bg-background data-[state=unchecked]:bg-destructive"
                className="data-[state=checked]:bg-destructive data-[state=unchecked]:bg-background border-destructive border-[1.5px]"
              />
              <div>Show JSON format</div>
            </div>

            <ScrollArea className="h-full border-[1.5px] rounded-lg border-destructive">
              {filenames.map((filename) => (
                <Button
                  key={filename}
                  variant={
                    selectedValue === filename ? "destructive" : "default"
                  }
                  className="w-full justify-start mb-1"
                  onClick={() => setSelectedValue(filename)}
                >
                  {filename}
                </Button>
              ))}
            </ScrollArea>
          </div>
          <div className="relative w-full bg-background rounded-xl h-full">
            <Tabs defaultValue="request" className="relative w-full h-full">
              <TabsList className="grid w-full grid-cols-2 bg-background">
                <TabsTrigger
                  value="request"
                  className="data-[state=active]:bg-destructive data-[state=active]:text-white"
                >
                  Request
                </TabsTrigger>
                <TabsTrigger
                  value="coordinate"
                  className="data-[state=active]:bg-destructive data-[state=active]:text-white"
                >
                  Coordinate
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="request"
                className="mt-10 ml-10 absolute h-5/6 w-11/12"
              >
                <ScrollArea className="absolute h-full overflow-y-auto ">
                  {!showJSON && allInfoData !== null ? (
                    <pre>{JSONtoText(allInfoData)}</pre>
                  ) : (
                    <pre>{JSON.stringify(allInfoData, null, 2)}</pre>
                  )}
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
