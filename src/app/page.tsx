"use client";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import GraphVisualization from "./graph-visualization/page";
import { RouteProvider } from "@/components/context/RouteContext";

export default function Home() {
  return (
    <main className="flex max-h-screen min-h-screen">
      <RouteProvider>
        <Sidebar />
        <GraphVisualization />
      </RouteProvider>
    </main>
  );
}
