"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  Sparkles,
  Box,
  Shield,
  BarChart3,
  Settings,
  Gauge,
  Truck,
} from "lucide-react";
import LandingPage from "./website/page";

export default function App() {
  return (
    <div className="relative h-fit">
      <LandingPage />
    </div>
  );
}