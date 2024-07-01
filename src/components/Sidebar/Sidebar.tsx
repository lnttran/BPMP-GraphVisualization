"use client"
import Image from "next/image";
import { SlGraph } from "react-icons/sl";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Database, Truck, LayoutGrid, CircleUser } from "lucide-react";
// import { useRouter } from "next/router";


const sidebarItems = [
    {
        name: "Data visualization",
        href: "/",
        icon: SlGraph,
    },
    {
        name: "Data",
        href: "/",
        icon: Database,
    },
    {
        name: "About",
        href: "/",
        icon: LayoutGrid,
    },
    {
        name: "Contact",
        href: "/",
        icon: CircleUser,
    },
];

const Sidebar = () => {
    // const router = useRouter();

    const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

    return (
        <div className="relative">
            <Button className="absolute w-14 h-14 rounded-full top-14 bg-background -right-5" onClick={toggleSidebarcollapse}>
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            <aside className="h-full w-[300px] bg-popover p-5 transition-all duration-400 overflow-hidden ease-linear" data-collapse={isCollapsed}>
                <div className="flex w-auto gap-4 items-center pb-10 p-5">
                    <Truck size={36} />
                    <p className="text-[24px] font-bold">BPMP</p>
                </div>
                <ul className="list-none">
                    {sidebarItems.map(({ name, href, icon: Icon }) => {
                        return (
                            <li className="p-3 rounded-xl flex flex-row gap-5 items-center justify-start hover:bg-popover-foreground mb-6" key={name}>
                                {/* <div className="p-3 bg-red-50 rounded-xl flex flex-row gap-5"> */}
                                {/* <Link
                                    className={`sidebar__link ${router.pathname === href ? "sidebar__link--active" : ""
                                        }`}
                                    href={href}
                                > */}
                                <div className="inline-block">
                                    <Icon size={30} />
                                </div>
                                {!isCollapsed && (
                                    <div className="text-[18px]">{name}</div>
                                )}
                                {/* </Link>/ */}
                                {/* </div> */}




                            </li>
                        );
                    })}
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;