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

export default function BPMPPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
              Backhaul Profit Maximization Problem
              <br />
            </h1>
            <h2 className="mx-auto text-gray-500 md:text-xl">
              Solving the Backhaul Profit Maximization Problem (BPMP) is one way
              that third-party logistics (3PL) companies use Operations Research
              (OR) to gain efficiency and increase profitability. BPMP involves
              solving two concurrent optimization problems: (1) determining the
              most efficient route for an empty delivery vehicle to return from
              its current location to its depot within a scheduled time frame,
              (2) selecting a subset of available delivery requests along this
              route to maximize profit, considering the vehicle&apos;s capacity.
              The video below gives a quick overview of BPMP and shows how 3PL
              companies can solve it to avoid costly &ldquo;deadhead&rdquo;
              miles, where vehicles travel empty incurring costs without
              generating revenue.
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
      <section className="w-full py-12 md:py-24 lg:py-32">
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
            {/* <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#DCFCE7] px-8 text-sm font-medium text-black hover:bg-[#DCFCE7]/90"
                href="#"
              >
                Learn More
              </Link>
            </div> */}
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
      <section className="w-full bg-[#0F1F1C] py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              References
            </h2>
            <p className="mx-auto max-w-[1000px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              For more technical information on applying OR to the BPMP, see the
              following references:
            </p>
            <div className="space-y-6 w-full">
              <a
                href="https://www.sciencedirect.com/science/article/abs/pii/S0925527313002351?via%3Dihub"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-200 p-6 rounded-lg text-left transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Maximizing Profit for Vehicle Routing Under Time and Weight
                    Constraints
                  </h3>
                </div>
                <p className="text-gray-700">Junfang Yu and Yuanyuan Dong</p>
                <p className="text-gray-600 mt-1">
                  International Journal of Production Economics, Vol. 145, No.
                  2, October 2013, pp. 573-583.
                </p>
              </a>
              <a
                href="https://pubsonline.informs.org/doi/abs/10.1287/ijoo.2022.0071"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-200 p-6 rounded-lg text-left transition-colors hover:bg-gray-200"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    The Backhaul Profit Maximization Problem: Optimization
                    Models and Solution Procedures
                  </h3>
                </div>
                <p className="text-gray-700">
                  Yuanyuan Dong, Yulan Bai, Eli V. Olinick, and Andrew Junfang
                  Yu
                </p>
                <p className="text-gray-600 mt-1">
                  INFORMS Journal on Optimization, Vol. 4, No. 4, Fall 2022, pp.
                  347-445.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="w-full border-t bg-[#0F1F1C] py-12 md:py-24"
      >
        <div className="container grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 md:px-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {/* <Image
                src="/placeholder.svg"
                alt="Prodmast Logo"
                width={32}
                height={32}
                className="rounded-full"
              /> */}
              <Truck color="white" />
              <span className="text-xl font-semibold text-white">BPMP</span>
            </div>
            <p className="text-sm text-gray-400">
              Our solutions make production faster and cheaper. Contact us for
              more information.
            </p>
          </div>
          <div className="grid gap-4">
            <h3 className="font-semibold text-white">Company</h3>
            <nav className="grid gap-2">
              <Link className="text-sm text-gray-400 hover:text-white" href="#">
                About
              </Link>
              <Link className="text-sm text-gray-400 hover:text-white" href="#">
                Customers
              </Link>
              <Link className="text-sm text-gray-400 hover:text-white" href="#">
                Newsroom
              </Link>
              <Link className="text-sm text-gray-400 hover:text-white" href="#">
                Events
              </Link>
            </nav>
          </div>
          <div className="grid gap-4">
            <h3 className="font-semibold text-white">Industries</h3>
            <nav className="grid gap-2">
              <Link className="text-sm text-gray-400 hover:text-white" href="#">
                Precision Manufacturing
              </Link>
              <Link className="text-sm text-gray-400 hover:text-white" href="#">
                Industrial Manufacturing
              </Link>
              <Link className="text-sm text-gray-400 hover:text-white" href="#">
                High Tech & Electronics
              </Link>
              <Link className="text-sm text-gray-400 hover:text-white" href="#">
                Aerospace
              </Link>
            </nav>
          </div>
          <div className="grid gap-4">
            <h3 className="font-semibold text-white">Get in Touch</h3>
            <div className="flex gap-4">
              <Link className="text-gray-400 hover:text-white" href="#">
                hello@bpmp.com
              </Link>
            </div>
            <div className="flex gap-4">
              <Link className="text-gray-400 hover:text-white" href="#">
                LinkedIn
              </Link>
              <Link className="text-gray-400 hover:text-white" href="#">
                YouTube
              </Link>
              <Link className="text-gray-400 hover:text-white" href="#">
                Facebook
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="container flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="text-sm text-gray-400">
            © 2024 Prodmast. All rights reserved.
          </div>
          <nav className="flex gap-4">
            <Link className="text-sm text-gray-400 hover:text-white" href="#">
              Terms & Conditions
            </Link>
            <Link className="text-sm text-gray-400 hover:text-white" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div> */}
      </footer>
    </div>
  );
}
