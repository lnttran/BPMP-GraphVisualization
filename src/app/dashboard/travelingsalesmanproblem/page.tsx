"use client";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import TSPGraphVisualization from "@/components/GraphVisualizer/TSPCore";
import { RouteTSPProvider } from "@/components/context/RouteTSPContext";

export default function Dashboard() {
  return (
    <div className="relative max-h-screen h-full">
      <div className="h-full">
          <RouteTSPProvider>
            <GlobalComponentManagerProvider>
              <TSPGraphVisualization />
            </GlobalComponentManagerProvider>
          </RouteTSPProvider>
      </div>
    </div>
  );
}
