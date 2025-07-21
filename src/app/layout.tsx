"use client";
import { Metadata } from "next";
import {
  Inter,
  Libre_Baskerville,
  Poppins,
  Roboto_Slab,
} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Truck, Network, Route, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import Dropdown from "@/components/ui/dropdown";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });
const poppin = Poppins({ subsets: ["latin"], weight: "400" });
const libre = Libre_Baskerville({ subsets: ["latin"], weight: ["400"] });
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route path

  // Check if the current page is within "website" (e.g., starts with /bpmp) and not "dashboard"
  const isWebsitePage = pathname?.startsWith("/website") || pathname === "/";

  return (
    console.log('Rendering html'),
    <html lang="en">
      <body className={inter.className}>
        <div className="relative max-h-screen h-full">
          <div className="relative h-full">
            <div className="flex min-h-screen flex-col">
              {/* Modern Navigation for website pages */}
              {isWebsitePage && (
                <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                  <div className="container flex h-16 items-center justify-between px-4">
                    <Link href="/website" className="flex items-center gap-3 group">
                      <div className="flex items-center gap-2">
                        <Truck className="w-7 h-7 text-emerald-600" />
                        {/* <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                          BPMP
                        </span> */}
                      </div>
                    </Link>
                    <nav className="flex items-center gap-8">
                      <Link
                        href="/website"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                          pathname === "/website"
                            ? "text-emerald-600"
                            : "text-gray-600 hover:text-emerald-600"
                        }`}
                      >
                        {/* <Home className="w-4 h-4" /> */}
                        <span>Home</span>
                      </Link>
                      <Link
                        href="/website/bpmp"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                          pathname === "/website/bpmp"
                            ? "text-emerald-600"
                            : "text-gray-600 hover:text-emerald-600"
                        }`}
                      >
                        {/* <Network className="w-4 h-4" /> */}
                        <span>BPMP</span>
                      </Link>
                      <Link
                        href="/website/shortestpath"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                          pathname === "/website/shortestpath"
                            ? "text-emerald-600"
                            : "text-gray-600 hover:text-emerald-600"
                        }`}
                      >
                        {/* <Route className="w-4 h-4" /> */}
                        <span>Shortest Path</span>
                      </Link>
                      {/* <Link
                        href="/dashboard/bpmp"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                          pathname === "/dashboard/bpmp"
                            ? "text-emerald-600"
                            : "text-gray-600 hover:text-emerald-600"
                        }`}
                      > */}
                        {/* <Network className="w-4 h-4" /> */}
                        {/* <span>Interactive App</span>
                      </Link> */}
                      <Dropdown
                        label="Interactive App"
                        href="/dashboard/bpmp"
                        icon={<Network className="w-4 h-4" />}
                        children={[
                          {
                            label: "BPMP",
                            href: "/dashboard/bpmp",
                          },
                          {
                            label: "Shortest Path",
                            href: "/dashboard/shortestpath",
                          },
                        ]}
                      />
                    </nav>
                  </div>
                </header>
              )}
              {/* Page Content */}
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
