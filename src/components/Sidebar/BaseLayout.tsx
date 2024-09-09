import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="layout bg-background">
      <Sidebar />
      <main className="layout__main-content h-full">{children}</main>
    </div>
  );
};

export default BaseLayout;
