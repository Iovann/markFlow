import {
  Home,
  Bookmark,
  Settings,
  PlusCircle,
  FolderHeart,
  Compass,
} from "lucide-react";

export const navigation = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
    tooltip: "Home",
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: FolderHeart,
    tooltip: "Categories",
  },
  {
    name: "Frequent",
    href: "/dashboard/frequent",
    icon: Bookmark,
    tooltip: "Frequent",
  },
  {
    name: "Explore",
    href: "/dashboard/explore",
    icon: Compass,
    tooltip: "Explore",
  },
  {
    name: "Add Bookmark",
    href: "/dashboard/add",
    icon: PlusCircle,
    tooltip: "Add Bookmark",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    tooltip: "Settings",
  },
];
