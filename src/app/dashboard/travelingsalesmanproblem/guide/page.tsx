"use client";

import { RouteProvider } from "@/components/context/RouteContext";
import Guide from "./guide";
import { CargoProvider } from "@/components/context/CargoContext";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import { DataProvider } from "@/components/context/DataContext";

export default function DataBaseWrapper() {
  return (
    <DataProvider>
      <RouteProvider>
        <CargoProvider>
          <GlobalComponentManagerProvider>
            <Guide />
          </GlobalComponentManagerProvider>
        </CargoProvider>
      </RouteProvider>
    </DataProvider>
  );
}
