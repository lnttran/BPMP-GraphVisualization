"use client";

import { RouteProvider } from "@/components/context/RouteContext";
import { CargoProvider } from "@/components/context/CargoContext";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import { DataProvider } from "@/components/context/DataContext";
import SPDataBase from "./db";

export default function DataBaseWrapper() {
  return (
    <DataProvider>
      <RouteProvider>
        <CargoProvider>
          <GlobalComponentManagerProvider>
            <SPDataBase />
          </GlobalComponentManagerProvider>
        </CargoProvider>
      </RouteProvider>
    </DataProvider>
  );
}
