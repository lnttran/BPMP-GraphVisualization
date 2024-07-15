"use client";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import GraphVisualization from "./graph-visualization/page";
import { RouteProvider } from "@/components/context/RouteContext";
import { CargoProvider } from "@/components/context/CargoContext";

export default function Home() {
  return (
    <main className="flex h-screen">
      <RouteProvider>
        <CargoProvider>
          <Sidebar />
          <GraphVisualization />
        </CargoProvider>
      </RouteProvider>
    </main>
  );
}
