"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { workOrders, maintenanceTimeline, type WorkOrder } from "@/lib/mock-data"
import { SeverityBadge } from "@/components/severity-badge"
import { cn } from "@/lib/utils"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

const statusStyles: Record<WorkOrder["status"], string> = {
  Scheduled: "bg-muted text-muted-foreground",
  "In Progress": "bg-accent/15 text-accent",
  Overdue: "bg-destructive/15 text-destructive",
  Done: "bg-emerald-500/15 text-emerald-400",
}

const timelineStyles: Record<string, string> = {
  predictive: "bg-accent",
  planned: "bg-primary",
  corrective: "bg-amber-400",
  reactive: "bg-destructive",
}

const filters = ["All", "Scheduled", "In Progress", "Overdue"] as const

export function MaintenanceBoard() {
  const [filter, setFilter] = useState<string>("All")

  const rows = workOrders.filter((w) => filter === "All" || w.status === filter)

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="border-border/60 bg-card/60 lg:col-span-2">
        <CardHeader className="flex-row items-center justify-between gap-2">
          <CardTitle className="text-base">Work Orders</CardTitle>
          <ToggleGroup
            value={[filter]}
            onValueChange={(v) => v[0] && setFilter(v[0])}
            className="hidden sm:flex"
          >
            {filters.map((f) => (
              <ToggleGroupItem key={f} value={f} size="sm" className="text-xs">
                {f}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="hidden md:table-cell">Downtime</TableHead>
                <TableHead className="hidden md:table-cell">Due</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((w) => (
                <TableRow key={w.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{w.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-tight">{w.task}</span>
                      <span className="text-xs text-muted-foreground">{w.asset}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <SeverityBadge level={w.risk} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {w.downtime}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground tabular-nums">
                    {w.due}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarFallback className="text-[10px]">{initials(w.assignee)}</AvatarFallback>
                      </Avatar>
                      <span className="hidden text-xs text-muted-foreground lg:inline">{w.assignee}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border-0 font-medium", statusStyles[w.status])}>{w.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="relative flex flex-col gap-5 border-l border-border/60 pl-5">
            {maintenanceTimeline.map((item) => (
              <li key={item.id} className="relative">
                <span
                  className={cn(
                    "absolute -left-[1.6rem] top-1 size-3 rounded-full ring-4 ring-card",
                    timelineStyles[item.type],
                  )}
                  aria-hidden
                />
                <p className="text-sm font-medium leading-tight text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.meta}</p>
                <p className="mt-0.5 text-xs text-muted-foreground/70 tabular-nums">{item.date}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
