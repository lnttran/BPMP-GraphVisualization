"use client";

import { RouteProvider } from "@/components/context/RouteContext";
import DataBase from "./database";
import { CargoProvider } from "@/components/context/CargoContext";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import { DataProvider } from "@/components/context/DataContext";

export default function DataBaseWrapper() {
  return (
    <DataProvider>
      <RouteProvider>
        <CargoProvider>
          <GlobalComponentManagerProvider>
            <DataBase />
          </GlobalComponentManagerProvider>
        </CargoProvider>
      </RouteProvider>
    </DataProvider>
  );
}
