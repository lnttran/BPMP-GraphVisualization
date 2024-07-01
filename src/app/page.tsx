import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import GraphVisualization from "./graph-visualization/page";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <GraphVisualization />
    </main>
  );
}
