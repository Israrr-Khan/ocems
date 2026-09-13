import { Activity, Box, FileBarChart, LayoutDashboard, Search } from "lucide-react";

import { NAV_ITEMS, type NavItem } from "@/lib/navigation";

const ICONS = {
  "Command Center": LayoutDashboard,
  "Digital Twin": Box,
  "Live Monitoring": Activity,
  Investigation: Search,
  Reports: FileBarChart,
} as const;

type SidebarProps = {
  open: boolean;
  onNavigate: () => void;
};

export function Sidebar({ open, onNavigate }: SidebarProps) {
  // Navigation is now rendered inside TopHeader.
  // This component intentionally keeps no left-side sidebar.
  return null;
}