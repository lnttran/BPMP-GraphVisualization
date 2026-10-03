"use client";

import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import SPDataBase from "./db";
import { DataSPProvider } from "@/components/context/DataSPContext";
import { RouteSPProvider } from "@/components/context/RouteSPContext";

export default function DataBaseWrapper() {
  return (
    <DataSPProvider>
      <RouteSPProvider>
        <GlobalComponentManagerProvider>
          <SPDataBase />
        </GlobalComponentManagerProvider>
      </RouteSPProvider>
    </DataSPProvider>
  );
}
