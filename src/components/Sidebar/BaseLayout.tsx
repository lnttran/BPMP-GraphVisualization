import { ReactNode } from "react";
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
  return (
    <div className="layout bg-background">
      <Sidebar sidebarItems={sidebarItems} title={title} />
      <main className="layout__main-content h-full">{children}</main>
    </div>
  );
};

export default BaseLayout;
