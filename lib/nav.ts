import {
  LayoutDashboard,
  Upload,
  Bot,
  Boxes,
  Share2,
  Wrench,
  Lightbulb,
  ShieldCheck,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
}

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Document Upload", href: "/documents", icon: Upload },
  { title: "AI Assistant", href: "/assistant", icon: Bot },
  { title: "Asset Explorer", href: "/assets", icon: Boxes },
  { title: "Knowledge Graph", href: "/knowledge-graph", icon: Share2 },
  { title: "Maintenance", href: "/maintenance", icon: Wrench, badge: "23" },
  { title: "Recommendations", href: "/recommendations", icon: Lightbulb },
  { title: "Compliance", href: "/compliance", icon: ShieldCheck, badge: "6" },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Settings", href: "/settings", icon: Settings },
]
