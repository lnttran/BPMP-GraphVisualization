"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { fetcher } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { DataItem } from "@/db/data";
import { JSONtoText } from "@/components/tools/dataParser";
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
        <div className="font-extrabold text-[32px]">User Guide</div>
        <div className="relative w-full bg-popover rounded-xl flex lg:flex-row md:flex-col flex-col gap-4 h-full p-5 ">
                <iframe 
                    src="/UserGuide.pdf" 
                    className="w-full h-full" 
                    title="User Guide" 
                ></iframe>
        </div>
      </div>
    </div>
  );
}
