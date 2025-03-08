"use client";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import { DataSPProvider } from "@/components/context/DataSPContext";
import SPGraphVisualization from "@/components/GraphVisualizer/SPCore";
import { RouteSPProvider } from "@/components/context/RouteSPContext";

export default function Dashboard() {
  return (
    <div className="relative max-h-screen h-full">
      <div className="h-full">
        <DataSPProvider>
          <RouteSPProvider>
            <GlobalComponentManagerProvider>
              <SPGraphVisualization />
            </GlobalComponentManagerProvider>
          </RouteSPProvider>
        </DataSPProvider>
      </div>
    </div>
  );
}
