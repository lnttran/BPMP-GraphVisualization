"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import Dropdown from "@/components/ui/dropdown";

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

  let buttonLabel = "Interactive App";

  // if (pathName.includes("bpmp")) {
  //   buttonLabel = "Shortest Path";
  //   buttonHref = "/dashboard/shortestpath";
  // } else if (pathName.includes("shortestpath")) {
  //   buttonLabel = "BPMP";
  //   buttonHref = "/dashboard/bpmp";
  // } else {
  //   buttonLabel = "Home";
  //   buttonHref = "/";
  // }

  return (
    <div className="layout bg-background">
      <Sidebar sidebarItems={sidebarItems} title={title} />
      <main className="layout__main-content h-full relative">
      <Dropdown
        label={buttonLabel}
        href=""
        variant="destructive"
        className="absolute top-0 right-0 z-10"
        items={[
          { label: "BPMP", href: "/dashboard/bpmp" },
          { label: "Shortest Path", href: "/dashboard/shortestpath" },
        ]}
      />
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
