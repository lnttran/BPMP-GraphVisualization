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
  Network,
  Award,
  Users,
  Route,
  Play,
} from "lucide-react";
import Footer from "@/components/footer/footer";

export default function MinimumSpanningTreePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with animated background */}
      <section className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0F1F1C] via-[#1a2f2a] to-[#0F1F1C]">
        {/* Animated dots background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute w-2 h-2 bg-white rounded-full animate-float"
            style={{ top: "10%", left: "20%" }}
          />
          <div
            className="absolute w-2 h-2 bg-white rounded-full animate-float-delay"
            style={{ top: "30%", left: "70%" }}
          />
          <div
            className="absolute w-2 h-2 bg-white rounded-full animate-float"
            style={{ top: "70%", left: "30%" }}
          />
          <div
            className="absolute w-2 h-2 bg-white rounded-full animate-float-delay"
            style={{ top: "50%", left: "80%" }}
          />
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-sm text-white/80 backdrop-blur-sm mb-8">
              <Network className="w-4 h-4" />
              <span>Network Optimization</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
                Minimum Spanning Tree
              </span>{" "}
              Problem
            </h1>

            <p className="mx-auto text-gray-200 sm:text-md md:text-lg text-justify leading-relaxed mb-12 max-w-6xl">
              In graph theory, a spanning tree is subset of a graph’s edges with two
              important properties: (1) each node in the graph is touched by at least
              one edge and (2) no cycles (loops) are formed by the edges. Spanning trees
              are important structures in graphs (and networks) because they provide
              connections (paths) between every pair of nodes using the fewest possible
              number of edges. Among all possible spanning trees for a given graph or
              network, a minimum spanning tree represents the most efficient way to
              provide connections between all the nodes by minimizing the total weight,
              distance, or cost of its edges.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/dashboard/minimumspanningtree"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#0F1F1C] bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Try Interactive Demo
              </Link>
              <a
                href="#learn-more"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section
        className="w-full py-24 bg-white relative overflow-hidden"
        id="learn-more"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full text-sm text-emerald-700">
                <Sparkles className="w-4 h-4" />
                <span>Overview</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1F1C]">
                Understanding the Challenge
              </h2>
              <p className="text-lg text-gray-600">
                This overview explains the minimum spanning tree problem and some of its
                many applications.
              </p>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl transform rotate-2 opacity-30 blur-lg"></div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  {/* TODO: replace with the MST overview video when it is ready */}
                  <div className="w-full h-full flex items-center justify-center bg-[#0F1F1C] text-white/70">
                    Video coming soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="w-full py-24 bg-[#0F1F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl transform -rotate-2 opacity-30 blur-lg"></div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  {/* TODO: replace with the MST demo video when it is ready */}
                  <div className="w-full h-full flex items-center justify-center bg-[#0F1F1C] text-white/70">
                    Video coming soon
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-sm text-white/80 backdrop-blur-sm mb-8">
                <Play className="w-4 h-4" />
                <span>Interactive Demo</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Try It Yourself
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Experience our powerful visualization tools firsthand. Watch this video for a
                demonstration of how to use our Minimum Spanning Tree visualization app.
              </p>
              <Link
                href="/dashboard/minimumspanningtree"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#0F1F1C] bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Launch Interactive Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>

      <Footer />
    </div>
  );
}