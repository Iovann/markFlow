"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  SidebarProvider,
} from "@/src/components/ui/sidebar";
import Image from "next/image";
import { github, heart } from "lucide-react";
import { navigation } from "./navItems";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
      <Sidebar>
        <SidebarHeader className="border-b border-border/40 pb-2">
          <div className="flex items-center px-2 py-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 font-semibold w-full"
            >
              <Image
                src="/assets/icons/logo.svg"
                alt="Logo"
                className=" md:size-32 size-20 "
                width={100}
                height={100}
              />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="px-4 space-y-4">
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.tooltip}
                  className="py-4 px-3 rounded-lg hover:bg-muted transition-colors h-12"
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10">
                      <item.icon className="size-6 md:size-7" />
                    </div>
                    <span className="text-base">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-border/40 p-2">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ❤️ Built by Iovann
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  );
}
