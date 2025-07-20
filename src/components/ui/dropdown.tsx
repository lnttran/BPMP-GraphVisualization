"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

interface DropdownTabProps {
    label: string;
    href: string;
    icon?: ReactNode;
    className?: string;
    variant?: "default" | "destructive";
    children?: {
        label: string;
        href: string;
    }[];
}


const Dropdown = ({ label, href, icon, className = "", variant, children = [] }: DropdownTabProps) => {
            
    const getItemClasses = (href: string) => {
        const isActive = pathname === href;
      
        if (variant === "destructive") {
          return isActive
            ? "text-emerald-600 bg-destructive"
            : "text-white bg-destructive hover:text-emerald-600";
        }
      
        // default/fallback
        return isActive
          ? "text-emerald-600 font-semibold"
          : "text-gray-800 hover:text-emerald-600";
    };

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const active = pathname === href || children.some(child => pathname === child.href);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(true)}>
            <div>
                <button
                    onClick={() => setIsOpen(true)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                        variant === "destructive"
                          ? "bg-destructive text-white hover:bg-destructive/90"
                          : variant === "default"
                          ? "border border-gray-300 text-gray-800 hover:bg-gray-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      } ${className}`}
                >
                    <span>{label}</span>
                    {/* <ChevronDown className="ml-2 -mr-1 h-5 w-5" /> */}
                    <ChevronDown className="w-4 h-4" />
                </button>

                {isOpen && children.length > 0 && (
                    <div className={`absolute right-0 z-10 w-56 origin-top-right rounded-md ${
                        variant === "destructive"
                            ? "bg-destructive mt-10 "
                            : variant === "default"
                            ? "bg-white mt-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
                            : "bg-white mt-2 "
                        } ${className}`}
                    >
                        <div className="py-1">
                            {children.map((child) => (
                                <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${getItemClasses(child.href)}`}
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Link href="/dashboard/bpmp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            BPMP
                        </Link>
                        <Link href="/dashboard/shortestpath" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Shortest Path
                        </Link>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Dropdown;

