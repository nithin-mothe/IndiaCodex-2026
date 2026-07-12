import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CircleHelp,
  Code2,
  Gauge,
  FileBadge2,
  LayoutDashboard,
  Settings,
  UserRound,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

export const appNavigation: readonly NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/escrows", label: "Escrows", icon: BriefcaseBusiness },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/wallet", label: "Wallet", icon: WalletCards },
  { href: "/nft-certificates", label: "NFT Certificates", icon: FileBadge2 },
  { href: "/developers", label: "Developer Portal", icon: Code2 },
  { href: "/admin", label: "Admin Portal", icon: Gauge },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/help", label: "Help Center", icon: CircleHelp },
] as const;
