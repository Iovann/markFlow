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
    href: "/categories",
    icon: FolderHeart,
    tooltip: "Categories",
  },
  {
    name: "Frequent",
    href: "/frequent",
    icon: Bookmark,
    tooltip: "Frequent",
  },
  {
    name: "Explore",
    href: "/explore",
    icon: Compass,
    tooltip: "Explore",
  },
  {
    name: "Add Bookmark",
    href: "/add",
    icon: PlusCircle,
    tooltip: "Add Bookmark",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    tooltip: "Settings",
  },
];
