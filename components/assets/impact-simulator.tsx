"use client"

import { useMemo, useState } from "react"
import { ArrowDown, ArrowRight, BrainCircuit, Clock3, DollarSign, Gauge, ShieldCheck, Sparkles, TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { type Asset, recommendations, workOrders } from "@/lib/mock-data"

export function ImpactSimulator({ asset }: { asset: Asset }) {
  const [delayDays, setDelayDays] = useState(0)
  const recommendation = recommendations.find((item) => item.asset === asset.name)
  const workOrder = workOrders.find((item) => item.asset === asset.name)

  const baseline = useMemo(() => {
    const plannedHours = Number.parseInt(recommendation?.downtime ?? workOrder?.downtime ?? "4", 10) || 4
    const match = recommendation?.downtime.match(/~(\d+)\s*hrs/)
    const unplannedHours = match ? Number(match[1]) : Math.max(plannedHours * 4, 16)
    const savingsMatch = recommendation?.savings.match(/\$([\d.]+)([kKmM]?)/)
    let valueProtected = 0
    if (savingsMatch) {
      valueProtected = Number(savingsMatch[1]) * (savingsMatch[2]?.toLowerCase() === "m" ? 1000000 : 1000)
    }
    return { plannedHours, unplannedHours, valueProtected }
  }, [recommendation, workOrder])

  const scenario = useMemo(() => {
    const escalation = 1 + delayDays * 0.07
    const projectedRisk = Math.min(99, Math.round((asset.status === "Critical" ? 87 : asset.status === "At Risk" ? 72 : 35) * escalation))
    const avoidedHours = Math.max(0, Math.round((baseline.unplannedHours - baseline.plannedHours) * (1 - delayDays * 0.05)))
    const protectedValue = Math.max(0, Math.round(baseline.valueProtected * (1 - delayDays * 0.08)))
    const exposureHours = delayDays === 0 ? baseline.plannedHours : Math.round(baseline.plannedHours + (baseline.unplannedHours - baseline.plannedHours) * Math.min(1, delayDays / 14))
    return { projectedRisk, avoidedHours, protectedValue, exposureHours }
  }, [asset.status, baseline, delayDays])

  const urgency = delayDays === 0 ? "Recommended window" : delayDays <= 3 ? "Risk increasing" : "High exposure"

  return (
    <section className="rounded-xl border border-primary/25 bg-primary/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <BrainCircuit className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">AI Impact Simulator</p>
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">What-if analysis</span>
            </div>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
              Compare planned intervention with the operational exposure created by delaying the AI recommendation.
            </p>
          </div>
        </div>
        <div className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold", delayDays === 0 ? "bg-chart-3/15 text-chart-3" : delayDays <= 3 ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive")}>
          {urgency}
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {[0, 3, 7, 14].map((days) => (
          <Button
            key={days}
            variant={delayDays === days ? "default" : "outline"}
            size="sm"
            onClick={() => setDelayDays(days)}
            className="justify-center"
          >
            {days === 0 ? "Act now" : `Delay ${days} days`}
          </Button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <div className="rounded-lg border border-chart-3/25 bg-chart-3/5 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-chart-3"><ShieldCheck className="size-4" /> Planned intervention</div>
          <p className="mt-3 text-2xl font-bold tabular-nums">{baseline.plannedHours} hrs</p>
          <p className="text-xs text-muted-foreground">controlled downtime</p>
          <div className="mt-3 flex items-center gap-2 text-xs"><Clock3 className="size-3" />Maintenance can be scheduled</div>
        </div>
        <div className="hidden items-center justify-center md:flex"><ArrowRight className="size-5 text-muted-foreground" /></div>
        <div className="rounded-lg border border-destructive/25 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-destructive"><TrendingUp className="size-4" /> Delayed exposure</div>
          <p className="mt-3 text-2xl font-bold tabular-nums">{scenario.exposureHours} hrs</p>
          <p className="text-xs text-muted-foreground">projected operational exposure</p>
          <div className="mt-3 flex items-center gap-2 text-xs"><Gauge className="size-3" />{scenario.projectedRisk}% modeled failure risk</div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-background/40 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="size-3.5" />Potential downtime avoided</div>
          <p className="mt-1 text-lg font-bold tabular-nums">{scenario.avoidedHours} hrs</p>
          <Progress value={Math.min(100, scenario.avoidedHours / Math.max(1, baseline.unplannedHours) * 100)} className="mt-2 h-1" />
        </div>
        <div className="rounded-lg border border-border bg-background/40 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><DollarSign className="size-3.5" />Value protected</div>
          <p className="mt-1 text-lg font-bold tabular-nums">${Math.round(scenario.protectedValue / 1000)}k</p>
          <p className="mt-1 text-[11px] text-muted-foreground">based on current AI estimate</p>
        </div>
        <div className="rounded-lg border border-border bg-background/40 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Gauge className="size-3.5" />Risk escalation</div>
          <p className="mt-1 text-lg font-bold tabular-nums">{scenario.projectedRisk}%</p>
          <p className="mt-1 text-[11px] text-muted-foreground">current scenario</p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
        <div>
          <p className="text-xs font-semibold">AI decision summary</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {delayDays === 0
              ? `Acting now keeps ${asset.name} inside the planned maintenance window and preserves an estimated $${Math.round(scenario.protectedValue / 1000)}k of value.`
              : `A ${delayDays}-day delay increases modeled failure risk to ${scenario.projectedRisk}%. The safest decision is to execute the recommended ${recommendation?.title?.toLowerCase() ?? "maintenance action"} before exposure moves into an unplanned outage.`}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span>Recommendation confidence: {recommendation?.confidence ?? 80}%</span>
        <span>{workOrder ? `${workOrder.id} · ${workOrder.status}` : "No active work order"}</span>
      </div>
    </section>
  )
}
