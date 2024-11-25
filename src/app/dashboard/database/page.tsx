"use client";

import { RouteProvider } from "@/components/context/RouteContext";
import DataBase from "./database";
import { CargoProvider } from "@/components/context/CargoContext";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";

export default function DataBaseWrapper() {
  return (
    <RouteProvider>
      <CargoProvider>
        <GlobalComponentManagerProvider>
          <DataBase />
        </GlobalComponentManagerProvider>
      </CargoProvider>
    </RouteProvider>
  );
}
