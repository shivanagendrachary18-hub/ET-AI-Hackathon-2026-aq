"use client"

import { usePathname } from "next/navigation"
import { Bell, Search } from "lucide-react"

import { navItems } from "@/lib/nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  const pathname = usePathname()
  const current = navItems.find((i) => (i.href === "/" ? pathname === "/" : pathname.startsWith(i.href))) ?? navItems[0]

  return (
    <header className="glass-strong sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border px-3 sm:px-4">
      <SidebarTrigger className="text-muted-foreground" />
      <Separator orientation="vertical" className="mr-1 h-6" />
      <div className="flex min-w-0 flex-col">
        <h1 className="truncate text-sm font-semibold leading-none">{current.title}</h1>
        <span className="mt-1 hidden text-xs text-muted-foreground sm:block">Industrial Brain AI · Demo Environment</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search assets, docs, incidents…" className="h-9 w-56 bg-secondary/60 pl-9 lg:w-72" />
        </div>
        <Button variant="outline" size="icon" className="relative size-9" aria-label="Notifications">
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
        </Button>
        <div className="flex size-9 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">AE</div>
      </div>
    </header>
  )
}
