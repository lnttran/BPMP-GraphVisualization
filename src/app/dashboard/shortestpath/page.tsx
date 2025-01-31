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
import { DataProvider } from "@/components/context/DataContext";
import {
  DataSPProvider,
  useDataSPContext,
} from "@/components/context/DataSPContext";
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
