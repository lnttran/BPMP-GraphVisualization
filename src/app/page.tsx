"use client";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import GraphVisualization from "./graph-visualization/core";
import { RouteProvider } from "@/components/context/RouteContext";
import { CargoProvider } from "@/components/context/CargoContext";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="relative max-h-screen h-full">
      <div className="h-full">
        <RouteProvider>
          <CargoProvider>
            <GlobalComponentManagerProvider>
              <GraphVisualization />
            </GlobalComponentManagerProvider>
          </CargoProvider>
        </RouteProvider>
      </div>
    </main>
  );
}
