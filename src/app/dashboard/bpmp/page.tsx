"use client";
import { RouteProvider } from "@/components/context/RouteContext";
import { CargoProvider } from "@/components/context/CargoContext";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import GraphVisualization from "@/components/GraphVisualizer/core";
import { DataProvider, useDataContext } from "@/components/context/DataContext";

export default function Dashboard() {
  return (
    <div className="relative max-h-screen h-full">
      <div className="h-full">
        <DataProvider>
          <RouteProvider>
            <CargoProvider>
              <GlobalComponentManagerProvider>
                <GraphVisualization />
              </GlobalComponentManagerProvider>
            </CargoProvider>
          </RouteProvider>
        </DataProvider>
      </div>
    </div>
  );
}
