"use client"

import { Check, Clock, Lightbulb, TrendingDown, X } from "lucide-react"

import { recommendationHistory, recommendationSummary, recommendations } from "@/lib/mock-data"
import { SeverityBadge } from "@/components/severity-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const historyStatusStyles: Record<string, string> = {
  Approved: "bg-emerald-500/15 text-emerald-400",
  Dismissed: "bg-muted text-muted-foreground",
}

export function RecommendationsBoard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Open recommendations", value: recommendationSummary.open, icon: Lightbulb },
          { label: "Approved (30d)", value: recommendationSummary.approved, icon: Check },
          { label: "Dismissed (30d)", value: recommendationSummary.dismissed, icon: X },
          { label: "Est. savings pipeline", value: recommendationSummary.totalSavings, icon: TrendingDown },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/60 bg-card/60">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5 text-xs">
                <stat.icon className="size-3.5" />
                {stat.label}
              </CardDescription>
              <CardTitle className="text-2xl tabular-nums">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {recommendations.map((r) => (
          <Card key={r.id} className="flex flex-col border-border/60 bg-card/60">
            <CardHeader className="gap-3">
              <div className="flex items-center justify-between gap-2">
                <SeverityBadge level={r.risk} />
                <span className="text-xs text-muted-foreground">{r.asset}</span>
              </div>
              <CardTitle className="text-base leading-snug text-pretty">{r.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{r.rationale}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/60 bg-background/40 p-3">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    Downtime
                  </p>
                  <p className="mt-1 text-sm font-medium">{r.downtime}</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/40 p-3">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <TrendingDown className="size-3.5" />
                    Est. savings
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-400">{r.savings}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">AI confidence</span>
                  <span className="font-medium tabular-nums">{r.confidence}%</span>
                </div>
                <Progress value={r.confidence} />
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm" className="flex-1">
                <Check data-icon="inline-start" />
                Approve
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <X data-icon="inline-start" />
                Dismiss
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="text-base">Recommendation History</CardTitle>
          <CardDescription>Recently reviewed AI-generated actions and outcomes.</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead className="hidden md:table-cell">Asset</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recommendationHistory.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{row.id}</TableCell>
                  <TableCell className="text-sm font-medium">{row.title}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {row.asset}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border-0 font-medium", historyStatusStyles[row.status])}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground tabular-nums">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.outcome}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
