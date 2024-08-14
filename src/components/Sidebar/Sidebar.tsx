"use client";
import { SlGraph } from "react-icons/sl";
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
} from "lucide-react";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    name: "Data visualization",
    href: "/",
    icon: SlGraph,
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
        className="absolute w-14 h-14 rounded-full top-14 bg-background -right-5"
        onClick={toggleSidebarcollapse}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
      <aside
        className="h-full w-[250px] bg-popover p-4 transition-all duration-400 overflow-hidden ease-linear"
        data-collapse={isCollapsed}
      >
        <div className="flex w-auto gap-4 items-center pb-10 p-5">
          <Truck size={36} />
          {!isCollapsed && <p className="text-[24px] font-bold">BPMP</p>}
        </div>
        <ul className="list-none">
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
