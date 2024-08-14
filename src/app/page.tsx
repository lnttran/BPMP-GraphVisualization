"use client";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import GraphVisualization from "./graph-visualization/page";
import { RouteProvider } from "@/components/context/RouteContext";
import { CargoProvider } from "@/components/context/CargoContext";
import { GlobalComponentManagerProvider } from "@/components/context/UIContext";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import BaseLayout from "@/components/Sidebar/BaseLayout";

export default function Home() {
  return (
    <main className="flex h-screen">
      <RouteProvider>
        <CargoProvider>
          <GlobalComponentManagerProvider>
            <GraphVisualization />
          </GlobalComponentManagerProvider>
        </CargoProvider>
      </RouteProvider>
    </main>
  );
}
