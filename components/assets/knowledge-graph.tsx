"use client"

import { useMemo, useState } from "react"
import { BrainCircuit, FileText, Gauge, Link2, ShieldCheck, Wrench, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { type Asset, recommendations, workOrders } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

const nodeStyles = {
  asset: "border-primary/40 bg-primary/10 text-primary",
  evidence: "border-accent/40 bg-accent/10 text-accent",
  diagnosis: "border-destructive/40 bg-destructive/10 text-destructive",
  action: "border-chart-3/40 bg-chart-3/10 text-chart-3",
  impact: "border-chart-2/40 bg-chart-2/10 text-chart-2",
}

type Node = { id: string; label: string; type: keyof typeof nodeStyles; icon: typeof FileText; x: string; y: string; detail: string }

export function KnowledgeGraph({ asset }: { asset: Asset }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const recommendation = recommendations.find((item) => item.asset === asset.name)
  const workOrder = workOrders.find((item) => item.asset === asset.name)

  const nodes: Node[] = useMemo(() => [
    { id: "asset", label: asset.name, type: "asset", icon: Gauge, x: "50%", y: "50%", detail: `${asset.status} · health ${asset.health}/100 · ${asset.incidents} incidents` },
    { id: "inspection", label: "Inspection report", type: "evidence", icon: FileText, x: "13%", y: "20%", detail: "Bearing inspection evidence · 96% relevance" },
    { id: "vibration", label: "Vibration report", type: "evidence", icon: FileText, x: "13%", y: "75%", detail: "Rising harmonic component · 93% relevance" },
    { id: "diagnosis", label: asset.name.includes("Turbine A-7") ? "Bearing degradation" : "Primary risk signal", type: "diagnosis", icon: BrainCircuit, x: "50%", y: "18%", detail: "Evidence-weighted AI diagnosis" },
    { id: "action", label: recommendation?.title ?? "Engineering inspection", type: "action", icon: Wrench, x: "82%", y: "28%", detail: recommendation ? `${recommendation.downtime} · ${recommendation.savings}` : "Recommended maintenance action" },
    { id: "workorder", label: workOrder?.id ?? "Work order", type: "action", icon: Wrench, x: "82%", y: "58%", detail: workOrder ? `${workOrder.status} · ${workOrder.risk} risk` : "No active work order" },
    { id: "impact", label: "Business impact", type: "impact", icon: ShieldCheck, x: "78%", y: "83%", detail: recommendation?.savings ?? "Operational exposure" },
  ], [asset, recommendation, workOrder])

  const edges = [
    ["inspection", "asset"], ["vibration", "asset"], ["asset", "diagnosis"], ["diagnosis", "action"], ["action", "workorder"], ["workorder", "impact"], ["diagnosis", "impact"],
  ]

  const selected = nodes.find((node) => node.id === selectedNode)

  return (
    <section className="rounded-xl border border-primary/25 bg-primary/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary"><Link2 className="size-5" /></div>
          <div><p className="text-sm font-semibold">Operational Knowledge Graph</p><p className="mt-1 text-xs text-muted-foreground">Trace how evidence becomes a diagnosis, action and business outcome.</p></div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground"><span className="rounded-full border border-primary/30 px-2 py-1">7 nodes</span><span className="rounded-full border border-border px-2 py-1">7 relationships</span></div>
      </div>

      <div className="relative mt-4 h-[430px] overflow-hidden rounded-xl border border-border bg-background/60">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true">
          {edges.map(([from, to]) => {
            const a = nodes.find((n) => n.id === from)!
            const b = nodes.find((n) => n.id === to)!
            const x1 = Number.parseFloat(a.x) * 10
            const y1 = Number.parseFloat(a.y) * 4.3
            const x2 = Number.parseFloat(b.x) * 10
            const y2 = Number.parseFloat(b.y) * 4.3
            return <line key={`${from}-${to}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="6 5" />
          })}
        </svg>

        {nodes.map((node) => {
          const Icon = node.icon
          const active = selectedNode === node.id
          return (
            <button key={node.id} onClick={() => setSelectedNode(active ? null : node.id)} className={cn("absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded-xl border p-3 text-left shadow-sm transition-all hover:scale-[1.03]", nodeStyles[node.type], active && "ring-2 ring-primary ring-offset-2 ring-offset-background")} style={{ left: node.x, top: node.y }}>
              <div className="flex items-center gap-2"><Icon className="size-4 shrink-0" /><span className="line-clamp-2 text-xs font-semibold">{node.label}</span></div>
              <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">{node.detail}</p>
            </button>
          )
        })}

        {selected && (
          <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-border bg-background/95 p-3 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold">Selected relationship node</p><p className="mt-1 text-sm font-medium">{selected.label}</p><p className="mt-1 text-xs text-muted-foreground">{selected.detail}</p></div><Button size="icon" variant="ghost" className="size-7" onClick={() => setSelectedNode(null)} aria-label="Close"><X className="size-3.5" /></Button></div>
          </div>
        )}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-5">
        {["Evidence", "Asset", "Diagnosis", "Action", "Impact"].map((label, index) => <div key={label} className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-xs"><span className="flex size-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold">{index + 1}</span>{label}</div>)}
      </div>
    </section>
  )
}
