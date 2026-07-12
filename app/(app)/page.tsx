import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import { PageHeading } from "@/components/page-heading"
import { SeverityBadge } from "@/components/severity-badge"
import { AssetHealthChart } from "@/components/charts/asset-health-chart"
import { UptimeChart } from "@/components/charts/uptime-chart"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { kpis, aiInsights, recentUploads } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <>
      <PageHeading
        title="Operations Overview"
        description="Real-time asset intelligence across all plants, powered by AI."
        action={
          <Button render={<Link href="/assistant" />} nativeButton={false}>
            <Sparkles data-icon="inline-start" />
            Ask the AI
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <Card key={kpi.key} className="glass">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{kpi.label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{kpi.value}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-xs">
              <span
                className={
                  kpi.trend === "down" && kpi.key === "incidents"
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

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="size-4 text-primary" />
                Fleet Uptime
              </CardTitle>
              <CardDescription>Availability across all tracked assets · last 7 months</CardDescription>
            </div>
            <span className="rounded-full bg-primary/15 px-2.5 py-1 text-sm font-semibold text-primary">
              99.1%
            </span>
          </CardHeader>
          <CardContent>
            <UptimeChart />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Asset Health</CardTitle>
            <CardDescription>Distribution by condition</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetHealthChart />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="size-4 text-accent" />
                AI Insights
              </CardTitle>
              <CardDescription>Anomalies and predictions detected today</CardDescription>
            </div>
            <Button variant="ghost" size="sm" render={<Link href="/recommendations" />} nativeButton={false}>
              View all
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <SeverityBadge level={insight.severity} />
                    <span className="text-xs text-muted-foreground">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-sm font-medium">{insight.title}</p>
                  <p className="text-pretty text-xs text-muted-foreground">{insight.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="size-4 text-primary" />
                Recent Uploads
              </CardTitle>
              <CardDescription>Latest indexed documents</CardDescription>
            </div>
            <Button variant="ghost" size="sm" render={<Link href="/documents" />} nativeButton={false}>
              Open
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {recentUploads.map((f) => (
              <div key={f.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-[10px] font-semibold text-primary">
                  {f.type}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {f.by} · {f.size}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{f.when}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
