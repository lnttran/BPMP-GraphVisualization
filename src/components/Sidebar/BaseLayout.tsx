"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";

const BaseLayout = ({
  children,
  sidebarItems,
  title,
}: {
  children: ReactNode;
  sidebarItems: any[];
  title: string;
}) => {
  const pathName = usePathname();

  let buttonLabel = "";
  let buttonHref = "";

  if (pathName.includes("bpmp")) {
    buttonLabel = "Shortest Path";
    buttonHref = "/dashboard/shortestpath";
  } else if (pathName.includes("shortestpath")) {
    buttonLabel = "BPMP";
    buttonHref = "/dashboard/bpmp";
  } else {
    buttonLabel = "Home";
    buttonHref = "/";
  }

  return (
    <div className="layout bg-background">
      <Sidebar sidebarItems={sidebarItems} title={title} />
      <main className="layout__main-content h-full relative">
        <Link href={buttonHref}>
          {/* <button className="absolute top-6 right-0 z-10 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
            {buttonLabel}
          </button> */}
          <Button
              // onClick={() => {
              //   handleShowOptimal();
              // }}
              variant="destructive"
              className="absolute top-6 right-0 z-10 text-white"
            >
              {buttonLabel} 
          </Button>
        </Link>
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
