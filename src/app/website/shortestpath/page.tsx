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

export default function ShortestPathPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with animated background */}
      <section className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0F1F1C] via-[#1a2f2a] to-[#0F1F1C]">
        {/* Animated dots background */}
        <div className="absolute inset-0 opacity-10">
          {/* <div
            className="absolute w-2 h-2 bg-white rounded-full animate-float"
            style={{ top: "10%", left: "20%" }}
          /> */}
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
              <Route className="w-4 h-4" />
              <span>Path Optimization</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Shortest Path using{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
                Dijkstra
              </span>
            </h1>

            <p className="mx-auto text-gray-200 sm:text-md md:text-lg text-left mb-12">
              Dijkstra&apos;s algorithm is a fundamental approach in Operations
              Research and Computer Science for finding the shortest path
              between nodes in a graph. It is widely used in transportation,
              network routing, and logistics to optimize travel efficiency and
              reduce costs. The algorithm works by iteratively selecting the
              node with the smallest known distance, updating its neighbors, and
              expanding the search until the shortest path to all reachable
              nodes is determined. This method is particularly valuable for
              third-party logistics (3PL) companies, enabling them to optimize
              delivery routes, minimize fuel consumption, and improve overall
              efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/dashboard/shortestpath"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#0F1F1C] bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Try Interactive Demo
                {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
              </Link>
              {/* <a
                href="#learn-more"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </a> */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* <section
        id="service"
        className="w-full bg-[#0F1F1C] py-12 md:py-24 lg:py-32"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Efficient and Integrated Manufacturing Services
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Simplify operations with our efficient, quality-focused services.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Production and Assembly",
                description:
                  "Details on production processes, assembly, capacity and product types",
                icon: Settings,
              },
              {
                title: "Custom Manufacturing",
                description:
                  "Custom product creation with design and customization options",
                icon: Sparkles,
              },
              {
                title: "Quality Control",
                description:
                  "Procedures and systems in place to ensure high product quality",
                icon: Shield,
              },
              {
                title: "Technology and Innovation",
                description:
                  "Details on the latest manufacturing technologies and ongoing innovations",
                icon: Gauge,
              },
              {
                title: "Packaging and Logistics",
                description:
                  "Packaging and logistics for shipping to customers and distributors",
                icon: Box,
              },
              {
                title: "Consulting Market Research",
                description:
                  "Services to help companies understand market needs and provide strategic advice",
                icon: BarChart3,
              },
            ].map((service, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-gray-800 bg-[#0F1F1C] p-6 hover:bg-[#1A2A27]"
              >
                <div className="flex h-full flex-col justify-between">
                  <service.icon className="h-12 w-12 text-white" />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <ArrowRight className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Key Benefits of Our System for Your Business Efficiency
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our interactive demo to see how Dijkstra's algorithm efficiently finds 
              the shortest path in complex networks.
            </p>
            <div className="space-y-4 pt-4">
              {[
                {
                  title: "Boosting Quality with Tech",
                  description:
                    "With advanced technology, we help you achieve top product quality. Discover how we can enhance your standards.",
                },
                {
                  title: "Optimization Production Process",
                  description:
                    "Boost factory efficiency and productivity with our innovative solutions. See how the latest technology can maximize your output.",
                },
                {
                  title: "AI-Driven Production",
                  description:
                    "Leverage the power of AI to transform your manufacturing processes, achieving faster and more effective results.",
                },
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F1F1C]">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-gray-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="rounded-lg border bg-white p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500">
                      Total Projects
                    </div>
                    <div className="text-3xl font-bold">1475</div>
                    <div className="text-sm text-green-500">↑ 45%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 w-3/4 rounded-full bg-[#0F1F1C]" />
                    </div>
                    <div className="grid grid-cols-3 text-sm">
                      <div>Finished</div>
                      <div className="text-center">In Progress</div>
                      <div className="text-right">Rejected</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Demo Section */}
      {/* <section className="w-full py-24 bg-[#0F1F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl transform -rotate-2 opacity-30 blur-lg"></div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/1a5iuO0mO5s"
                    title="Shortest Path Demo"
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
                Try It Yourself
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Experience our powerful visualization tools firsthand. Watch this video for a 
                demonstration of how to use our Shortest Path visualization app.
              </p>
              <Link
                href="/dashboard/shortestpath"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#0F1F1C] bg-white rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Launch Interactive Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section> */}

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
