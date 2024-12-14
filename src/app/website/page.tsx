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
import Footer from "@/components/footer/footer";
import { ExpandableCardDemo } from "@/components/ui/expandableCard";

export default function LandingPage() {
  return (
    <div className="relative">
      <div className="flex flex-col">
        {/* Navigation */}
        {/* <header className="w-full bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg"
              alt="Prodmast Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <Truck />
            <span className="text-xl font-semibold">BPMP</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium hover:underline" href="#">
              Home
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              About
            </Link>
            <Link
              className="text-sm font-medium hover:underline"
              href="#service"
            >
              Services
            </Link>
            <Link
              className="text-sm font-medium hover:underline"
              href="#footer"
            >
              Contact
            </Link>
          </nav>
          <Link
            className="rounded-full bg-[#0F1F1C] px-4 py-2 text-sm font-medium text-white hover:bg-[#0F1F1C]/90"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </header> */}

        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-10 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Compact Network Flows for Critical Infrastructure Engineering
                <br />
              </h1>
              <h2 className="mx-auto text-gray-500 md:text-xl">
                Networks are ubiquitous. Every day our society relies on
                networks for energy, transportation, and communication. The
                design and operation of networks is a major concern that cuts
                across many engineering disciplines. The Compact Network Flows
                for Critical Infrastructure Engineering project leverages a new
                paradigm for the mathematical modeling of network flow to enable
                (1) the development of faster and more scalable algorithms for
                solving large, complex routing problems in transportation and
                (2) the design of resilient telecommunication networks that have
                the ability to continue to provide a high level of service even
                when critical components are damaged. If successful, this
                project will significantly improve our ability to design and
                operate critical infrastructure networks for logistics and
                communications. The new paradigm significantly reduces the
                number of variables and constraints in integer programming
                models for network optimization problems compared to the
                standard node-arc representation. This in turn can lead to
                faster solution algorithms. The goals of the project are to use
                the paradigm to develop (1) exact algorithms for inherently
                difficult network optimization problems that find provably
                optimal solutions in less time than existing methods, and (2)
                heuristics that quickly find solutions that are high-quality,
                but not necessarily optimal. <br />
                <br />
                This site is supported by the National Science Foundation CMMI
                division under&nbsp;
                <a
                  href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2227548&HistoricalAwards=false"
                  className="underline text-[#0F1F1C] pointer font-semibold "
                >
                  Award No. 2227548
                </a>
                .
              </h2>
              {/* <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#0F1F1C] px-8 text-sm font-medium text-white hover:bg-[#0F1F1C]/90"
                href="#"
              >
                Dashboard
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100"
                href="#"
              >
                Try Demo
              </Link>
            </div> */}
              {/* <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm font-medium">5.0</span>
              <span className="text-sm text-gray-500">from 50 reviews</span>
            </div> */}
            </div>

            {/*   <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
             <div className="relative overflow-hidden rounded-lg border bg-white p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm text-gray-500">
                  Our Trusted Clients and Partners
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-white p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="text-3xl font-bold">1951+</div>
                <div className="text-sm text-gray-500">Total Projects</div>
                <div className="text-xs text-green-500">
                  Increase of 15% this month
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-white p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="text-3xl font-bold">6+</div>
                <div className="text-sm text-gray-500">
                  Years of Dedicated Service
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-white p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="text-sm font-medium">
                  Achieve Optimal Efficiency and Boost Productivity
                </div>
              </div>
            </div> 
          </div>*/}
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
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our systems boost productivity, cut costs, and drive business
              growth.
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

        {/* Integration Section */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:grid-cols-2 md:px-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Discover Powerful Graph Visualizations
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our interactive demo to see how our solution enables
                efficient route optimization, real-time data integration, and
                insightful analysis. Watch this video for a demonstration of how
                to use our BPMP visualization app and{" "}
                <a
                  href="/dashboard"
                  className="underline text-[#0F1F1C] pointer font-semibold hover:font-bold"
                >
                  click here
                </a>{" "}
                to get it try.
              </p>
            </div>
            
          </div>
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/1a5iuO0mO5s"
              title="BPMP Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section> */}
        {/* Meet Our Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[800px]">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Meet our team
                </h2>
                {/* <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                To be the company our customers want us to be, it takes an{" "}
                <span className="italic">eclectic group</span> of passionate
                operators. Get to know the people{" "}
                <span className="italic">leading the way</span> at Prodmast.
              </p> */}
              </div>
            </div>

            <ExpandableCardDemo />
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="w-full bg-[#0F1F1C] py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              From Idea to Production in Days
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Accelerate your production with our technology. Reduce downtime
              and optimize costs. Get a special offer now!
            </p>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#DCFCE7] px-8 text-sm font-medium text-black hover:bg-[#DCFCE7]/90"
              href="#"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </section> */}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
