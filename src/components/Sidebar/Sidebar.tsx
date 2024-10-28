"use client";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Truck,
  LayoutGrid,
  CircleUser,
  GanttChart,
} from "lucide-react";

import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    name: "Visualization",
    href: "/",
    icon: GanttChart,
  },
  {
    name: "Data",
    href: "/database",
    icon: Database,
  },
  {
    name: "About",
    href: "/about",
    icon: LayoutGrid,
  },
  {
    name: "Demo",
    href: "/demo",
    icon: LayoutGrid,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: CircleUser,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="relative">
      <Button
        className="absolute w-12 h-12 rounded-full top-20 bg-background -right-5 hover:bg-background"
        onClick={toggleSidebarcollapse}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
      <aside
        className="h-full w-[13rem] bg-popover p-3 transition-all duration-400 overflow-hidden ease-linear"
        data-collapse={isCollapsed}
      >
        <div className="flex w-auto min-w-20 gap-4 items-center pb-10 pt-5">
          <Truck className="sidebar__logo" />
          {!isCollapsed && <p className="text-[24px] font-bold">BPMP</p>}
        </div>
        <ul className="list-none pt-8">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li key={name}>
                <Link
                  className={`sidebar__link ${
                    pathname === href ? "sidebar__link--active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
