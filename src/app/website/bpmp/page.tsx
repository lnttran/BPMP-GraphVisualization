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
  Play,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import Footer from "@/components/footer/footer";

export default function BPMPPage() {
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
              <Truck className="w-4 h-4" />
              <span>Logistics Optimization</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Backhaul Profit
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
                {" "}
                Maximization{" "}
              </span>
              Problem
            </h1>

            <p className="mx-auto text-gray-200 sm:text-md md:text-lg text-left mb-12">
            Solving the Backhaul Profit Maximization Problem (BPMP) is one way
              that third-party logistics (3PL) companies use&nbsp;
              <a
                href="https://bit.ly/49DEsSf"
                className="underline text-white pointer font-semibold "
              >
                Operations Research&nbsp;
              </a>
              (OR) (also known as&nbsp;
              <a
                href="https://bit.ly/3BcW8aJ"
                className="underline text-white pointer font-semibold "
              >
                Management Science
              </a>
              ) to gain efficiency and increase profitability. BPMP involves
              solving two concurrent optimization problems: (1) determining the
              most efficient route for an empty delivery vehicle to return from
              its current location to its depot within a scheduled time frame,
              (2) selecting a subset of available delivery requests along this
              route to maximize profit, considering the vehicle&apos;s capacity.
              The video below gives a quick overview of BPMP and shows how 3PL
              companies can solve it to avoid costly &ldquo;deadhead&ldquo;
              miles, where vehicles travel empty incurring costs without
              generating revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/dashboard/bpmp"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#0F1F1C] bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Try Interactive Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#learn-more"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section with floating cards */}
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
                This view gives a quick overview of BPMP and shows how 3PL
                companies can solve it to avoid costly “deadhead“ miles, where
                vehicles travel empty incurring costs without generating
                revenue.
              </p>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl transform rotate-2 opacity-30 blur-lg"></div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/_vWiEp-XjVU"
                    title="BPMP Overview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with hover effects */}
      <section className="w-full py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full text-sm text-emerald-700 mb-4">
              <Box className="w-4 h-4" />
              <span>Key Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1F1C] mb-4">
              Comprehensive Solution
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our approach combines advanced algorithms with practical logistics
              constraints to deliver optimal results.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6">
                <Box className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Route Optimization</h3>
              <p className="text-gray-600">
                Determine the most efficient return route for empty delivery
                vehicles using advanced algorithms.
              </p>
            </div>

            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Profit Maximization
              </h3>
              <p className="text-gray-600">
                Select optimal delivery requests to maximize revenue along the
                route while minimizing costs.
              </p>
            </div>

            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6">
                <Gauge className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Capacity Management
              </h3>
              <p className="text-gray-600">
                Balance vehicle capacity constraints with delivery schedules for
                optimal resource utilization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section with gradient overlay */}
      <section className="w-full py-24 bg-[#0F1F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl transform -rotate-2 opacity-30 blur-lg"></div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/gsJjlhx4pkQ"
                    title="BPMP Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-sm text-white/80 backdrop-blur-sm mb-8">
                <Play className="w-4 h-4" />
                <span>Interactive Demo</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                See It In Action
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Experience our powerful visualization tools firsthand. Watch
                this video for a demonstration of how to use our BPMP
                visualization app.
              </p>
              <Link
                href="/dashboard/bpmp"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#0F1F1C] bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Launch Interactive Demo
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* References Section with cards */}
      <section className="w-full py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full text-sm text-emerald-700 mb-4">
              <Star className="w-4 h-4" />
              <span>Research</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1F1C] mb-4">
              Academic Foundation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the research that powers our solution
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <a
              href="https://www.sciencedirect.com/science/article/abs/pii/S0925527313002351?via%3Dihub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-[#0F1F1C] mb-4">
                Maximizing Profit for Vehicle Routing Under Time and Weight
                Constraints
              </h3>
              <p className="text-emerald-600 font-medium mb-2">
                Junfang Yu and Yuanyuan Dong
              </p>
              <p className="text-gray-600">
                International Journal of Production Economics, Vol. 145, No. 2,
                October 2013
              </p>
            </a>

            <a
              href="https://pubsonline.informs.org/doi/abs/10.1287/ijoo.2022.0071"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-[#0F1F1C] mb-4">
                The Backhaul Profit Maximization Problem: Optimization Models
                and Solution Procedures
              </h3>
              <p className="text-emerald-600 font-medium mb-2">
                Yuanyuan Dong, Yulan Bai, Eli V. Olinick, and Andrew Junfang Yu
              </p>
              <p className="text-gray-600">
                INFORMS Journal on Optimization, Vol. 4, No. 4, Fall 2022
              </p>
            </a>

            <a
              href="https://link.springer.com/article/10.1007/s11067-025-09684-0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-[#0F1F1C] mb-4">
                Practical and Effective Heuristics for the Backhaul Profit Maximization Problem
              </h3>
              <p className="text-emerald-600 font-medium mb-2">
                Daniel Ryan, Tran Lam, Yuanyuan Dong & Eli Olinick
              </p>
              <p className="text-gray-600">
                Networks and Spatial Economics, 
                May 2025
              </p>
            </a>

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
