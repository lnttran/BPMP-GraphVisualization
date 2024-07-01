"use client"
import { createContext, useState } from "react";

const initialValue = { isCollapsed: false, toggleSidebarcollapse: () => { } };

const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }: { children: any }) => {
    const [isCollapsed, setCollapse] = useState(false);

    const toggleSidebarcollapse = () => {
        setCollapse(prevState => !prevState);
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
            {children}
        </SidebarContext.Provider>
    );
};

export { SidebarContext, SidebarProvider };