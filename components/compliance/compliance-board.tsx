"use client"

import { useState } from "react"
import { ShieldAlert } from "lucide-react"

import { auditSchedule, complianceAlerts } from "@/lib/mock-data"
import { SeverityBadge } from "@/components/severity-badge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

const alertFilters = ["All", "high", "medium", "low"] as const

const auditStatusStyles: Record<string, string> = {
  Compliant: "bg-emerald-500/15 text-emerald-400",
  "Pending Review": "bg-accent/15 text-accent",
  "Non-Compliant": "bg-destructive/15 text-destructive",
}

export function ComplianceBoard() {
  const [filter, setFilter] = useState<string>("All")

  const alerts = complianceAlerts.filter(
    (a) => filter === "All" || a.severity === filter,
  )

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="border-border/60 bg-card/60 lg:col-span-2">
        <CardHeader className="flex-row items-center justify-between gap-2">
          <CardTitle className="text-base">Active Compliance Alerts</CardTitle>
          <ToggleGroup
            value={[filter]}
            onValueChange={(v) => v[0] && setFilter(v[0])}
            className="hidden sm:flex"
          >
            {alertFilters.map((f) => (
              <ToggleGroupItem key={f} value={f} size="sm" className="text-xs capitalize">
                {f}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert</TableHead>
                <TableHead className="hidden md:table-cell">Asset / Area</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-destructive/80" />
                      <span className="text-sm font-medium leading-tight">{a.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {a.asset}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {a.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <SeverityBadge level={a.severity} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.due}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="text-base">Audit Schedule</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {auditSchedule.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-border/60 bg-background/40 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-tight">{item.standard}</p>
                <Badge className={cn("shrink-0 border-0 font-medium", auditStatusStyles[item.status])}>
                  {item.status}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{item.area}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Next: {item.nextDue}</span>
                <span>{item.owner}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
