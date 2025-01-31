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
import { Truck } from "lucide-react";
import { usePathname } from "next/navigation";

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
    <html lang="en">
      <body className={inter.className}>
        <div className="relative max-h-screen h-full">
          <div className="relative h-full">
            <div className="flex min-h-screen flex-col">
              {/* Render Navigation only for website pages */}
              {isWebsitePage && (
                <header className="w-full bg-white">
                  <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <Truck />
                      <span className="text-xl font-semibold">BPMP</span>
                    </div>
                    <nav className="flex items-center gap-6">
                      <Link
                        className="text-sm font-medium hover:underline"
                        href="/website"
                      >
                        Home
                      </Link>
                      <Link
                        className="text-sm font-medium hover:underline"
                        href="/website/bpmp"
                      >
                        BPMP
                      </Link>
                      <Link
                        className="text-sm font-medium hover:underline"
                        href="/website/shortestpath"
                      >
                        Shortest Path
                      </Link>
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
