import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { FailureTrendsChart } from "@/components/charts/failure-trends-chart"
import { MaintenanceCostChart } from "@/components/charts/maintenance-cost-chart"
import { SavingsChart } from "@/components/charts/savings-chart"
import { UptimeChart } from "@/components/charts/uptime-chart"
import { PageHeading } from "@/components/page-heading"
import { SeverityBadge } from "@/components/severity-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { analyticsKpis, plantMetrics } from "@/lib/mock-data"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Analytics"
        description="Fleet-wide reliability metrics, cost trends and plant-level performance benchmarks."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {analyticsKpis.map((kpi) => (
          <Card key={kpi.key} className="border-border/60 bg-card/60">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{kpi.label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{kpi.value}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-xs">
              <span
                className={
                  kpi.trend === "down" && (kpi.key === "mttr")
                    ? "inline-flex items-center gap-0.5 rounded-full bg-chart-3/15 px-1.5 py-0.5 font-medium text-chart-3"
                    : kpi.trend === "up"
                      ? "inline-flex items-center gap-0.5 rounded-full bg-primary/15 px-1.5 py-0.5 font-medium text-primary"
                      : "inline-flex items-center gap-0.5 rounded-full bg-destructive/15 px-1.5 py-0.5 font-medium text-destructive"
                }
              >
                {kpi.trend === "down" ? (
                  <ArrowDownRight className="size-3" />
                ) : (
                  <ArrowUpRight className="size-3" />
                )}
                {kpi.delta}
              </span>
              <span className="text-muted-foreground">{kpi.hint}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/60 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">Fleet Uptime Trend</CardTitle>
            <CardDescription>Monthly availability across all tracked assets</CardDescription>
          </CardHeader>
          <CardContent>
            <UptimeChart />
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">Failure Mode Distribution</CardTitle>
            <CardDescription>Mechanical, electrical and thermal incidents by month</CardDescription>
          </CardHeader>
          <CardContent>
            <FailureTrendsChart />
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">Maintenance Spend</CardTitle>
            <CardDescription>Planned vs reactive maintenance costs</CardDescription>
          </CardHeader>
          <CardContent>
            <MaintenanceCostChart />
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">AI Savings Impact</CardTitle>
            <CardDescription>Predictive actions and avoided downtime value</CardDescription>
          </CardHeader>
          <CardContent>
            <SavingsChart />
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="text-base">Plant Performance</CardTitle>
          <CardDescription>Comparative metrics across operational sites</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plant</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>OEE</TableHead>
                <TableHead className="hidden md:table-cell">Incidents</TableHead>
                <TableHead className="hidden md:table-cell">MTBF</TableHead>
                <TableHead>Health Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plantMetrics.map((row) => (
                <TableRow key={row.plant}>
                  <TableCell className="font-medium">{row.plant}</TableCell>
                  <TableCell className="tabular-nums text-sm">{row.uptime}%</TableCell>
                  <TableCell className="tabular-nums text-sm">{row.oee}%</TableCell>
                  <TableCell className="hidden md:table-cell tabular-nums text-sm text-muted-foreground">
                    {row.incidents}
                  </TableCell>
                  <TableCell className="hidden md:table-cell tabular-nums text-sm text-muted-foreground">
                    {row.mtbf} hrs
                  </TableCell>
                  <TableCell>
                    <SeverityBadge
                      level={
                        row.health >= 85
                          ? "Optimal"
                          : row.health >= 75
                            ? "Monitor"
                            : row.health >= 65
                              ? "At Risk"
                              : "Critical"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
