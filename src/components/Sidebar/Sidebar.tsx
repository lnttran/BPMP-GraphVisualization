"use client";
import Link from "next/link";
import { useContext, useState } from "react";
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
  TvMinimal,
  House,
  Menu,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const sidebarItems = [
  {
    name: "Visualization",
    href: "/dashboard",
    icon: GanttChart,
  },
  {
    name: "Data",
    href: "/dashboard/database",
    icon: Database,
  },
  {
    name: "Home Page",
    href: "/",
    icon: House,
  },
  // {
  //   name: "About",
  //   href: "/about",
  //   icon: LayoutGrid,
  // },
  // {
  //   name: "Demo",
  //   href: "/demo",
  //   icon: TvMinimal,
  // },
  // {
  //   name: "Contact",
  //   href: "/contact",
  //   icon: CircleUser,
  // },
];

const Sidebar = ({
  sidebarItems,
  title,
}: {
  sidebarItems: any[];
  title: string;
}) => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };
  return (
    <div>
      <div className="md:hidden fixed top-4 left-4 z-20">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-4">
            <SheetTitle>
              <div className="flex items-center gap-4 pb-6">
              <Truck className="sidebar__logo" />
                <p className="text-[24px] font-bold">{title}</p>
              </div>
            </SheetTitle>
            <ul className="space-y-2">
              {sidebarItems.map(({ name, href, icon }) => (
                 <li key={name}>
                 <Link
                   className={`sidebar__link ${
                     pathname === href ? "sidebar__link--active" : ""
                   }`}
                   href={href}
                 >
                   <span className="sidebar__icon">{icon}</span>
                   <span className="sidebar__name">{name}</span>
                 </Link>
               </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    <div className="relative hidden md:block h-full" >
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
          {!isCollapsed && <p className="text-[24px] font-bold">{title}</p>}
        </div>
        <ul className="list-none pt-8">
          {sidebarItems.map(({ name, href, icon }) => {
            return (
              <li key={name}>
                <Link
                  className={`sidebar__link ${
                    pathname === href ? "sidebar__link--active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar__icon">{icon}</span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
    </div>
  );
};

export default Sidebar;
