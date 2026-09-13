export type NavItem = {
  href: string;
  label: string;
  available: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Command Center", available: true },
  { href: "/digital-twin", label: "Digital Twin", available: false },
  { href: "/live-monitoring", label: "Live Monitoring", available: false },
  { href: "/investigation", label: "Investigation", available: false },
  { href: "/reports", label: "Reports", available: false },
];
