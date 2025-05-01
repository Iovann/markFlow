import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SidebarTrigger, SidebarProvider } from "@/src/components/ui/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col h-full dark:bg-[#262626]">
            <Header />
            <div className="p-2 sm:p-3 md:p-4">{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;
