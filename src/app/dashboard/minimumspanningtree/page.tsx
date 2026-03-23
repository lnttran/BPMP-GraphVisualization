"use client";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import { DataMSTProvider } from "@/components/context/DataMSTContext";
import { RouteMSTProvider } from "@/components/context/RouteMSTContext";
import MSTGraphVisualization from "@/components/GraphVisualizer/MSTCore";

export default function MSTDashboard() {
  return (
    <div className="relative max-h-screen h-full">
      <div className="h-full">
        <DataMSTProvider>
          <RouteMSTProvider>
            <GlobalComponentManagerProvider>
              <MSTGraphVisualization />
            </GlobalComponentManagerProvider>
          </RouteMSTProvider>
        </DataMSTProvider>
      </div>
    </div>
  );
}