"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // Function to get page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/") return "Home";
    return pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="mr-2 md:hidden" />

      <div className="flex flex-1 items-center justify-between">
        {/* Title */}
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
          <p className="text-sm lg:text-lg font-medium text-muted-foreground">
            {pathname === "/"
              ? "Effortless Bookmark Management"
              : "Manage your bookmarks with ease"}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 mr-3 overflow-hidden ml-auto">
          <Button asChild>
            <span className="flex items-center gap-2 overflow-hidden">
            <Plus className="h-4 w-4" />
            New bookmark
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
