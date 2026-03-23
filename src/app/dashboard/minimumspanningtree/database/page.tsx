"use client";

import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import MSTDataBase from "./db";
import { DataMSTProvider } from "@/components/context/DataMSTContext";
import { RouteMSTProvider } from "@/components/context/RouteMSTContext";

export default function DataBaseWrapper() {
  return (
    <DataMSTProvider>
      <RouteMSTProvider>
        <GlobalComponentManagerProvider>
          <MSTDataBase />
        </GlobalComponentManagerProvider>
      </RouteMSTProvider>
    </DataMSTProvider>
  );
}
