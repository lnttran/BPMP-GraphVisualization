"use client";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RouteProvider } from "@/components/context/RouteContext";
import { CargoProvider } from "@/components/context/CargoContext";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import GraphVisualization from "@/components/GraphVisualizer/core";
import { SidebarProvider } from "@/components/Sidebar/SidebarContext";
import BaseLayout from "@/components/Sidebar/BaseLayout";
import { Toaster } from "@/components/ui/toaster";
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
