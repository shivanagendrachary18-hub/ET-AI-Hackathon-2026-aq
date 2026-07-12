"use client"

import { useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import { graphEdges, graphNodes } from "@/lib/mock-data"

const typeMeta: Record<string, { label: string; color: string }> = {
  equipment: { label: "Equipment", color: "var(--chart-1)" },
  failure: { label: "Failure", color: "var(--destructive)" },
  sop: { label: "SOP", color: "var(--chart-2)" },
  engineer: { label: "Engineer", color: "var(--chart-3)" },
}

export function GraphView() {
  const [active, setActive] = useState<string | null>("gt-a7")

  const nodeById = useMemo(
    () => Object.fromEntries(graphNodes.map((n) => [n.id, n])),
    [],
  )

  const connectedIds = useMemo(() => {
    if (!active) return new Set<string>()
    const set = new Set<string>([active])
    graphEdges.forEach((e) => {
      if (e.from === active) set.add(e.to)
      if (e.to === active) set.add(e.from)
    })
    return set
  }, [active])

  const activeNode = active ? nodeById[active] : null
  const relations = graphEdges.filter((e) => e.from === active || e.to === active)

  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="glass relative overflow-hidden rounded-xl border border-border">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] [background-size:22px_22px]" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="relative h-[440px] w-full">
          {/* Edges */}
          {graphEdges.map((e, i) => {
            const from = nodeById[e.from]
            const to = nodeById[e.to]
            const highlighted = active && (e.from === active || e.to === active)
            return (
              <g key={i}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={highlighted ? "var(--primary)" : "var(--border)"}
                  strokeWidth={highlighted ? 0.6 : 0.3}
                  className="transition-all"
                  opacity={active && !highlighted ? 0.25 : 1}
                />
                {highlighted && (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 1}
                    textAnchor="middle"
                    className="fill-muted-foreground"
                    style={{ fontSize: 2.1 }}
                  >
                    {e.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {graphNodes.map((n) => {
            const meta = typeMeta[n.type]
            const dim = active && !connectedIds.has(n.id)
            const isActive = n.id === active
            return (
              <g
                key={n.id}
                className="cursor-pointer transition-opacity"
                opacity={dim ? 0.3 : 1}
                onClick={() => setActive(n.id)}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isActive ? 3.6 : 2.8}
                  fill={meta.color}
                  stroke="var(--background)"
                  strokeWidth={0.6}
                />
                {isActive && (
                  <circle cx={n.x} cy={n.y} r={5.2} fill="none" stroke={meta.color} strokeWidth={0.4} opacity={0.5} />
                )}
                <text
                  x={n.x}
                  y={n.y + 6.5}
                  textAnchor="middle"
                  className="fill-foreground font-medium"
                  style={{ fontSize: 2.4 }}
                >
                  {n.label}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-lg border border-border bg-background/70 px-3 py-2 backdrop-blur">
          {Object.entries(typeMeta).map(([key, m]) => (
            <span key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-2.5 rounded-full" style={{ background: m.color }} />
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="glass flex flex-col gap-4 rounded-xl border border-border p-5">
        {activeNode ? (
          <>
            <div className="flex items-center gap-3">
              <span
                className="flex size-10 items-center justify-center rounded-lg text-primary-foreground"
                style={{ background: typeMeta[activeNode.type].color }}
              >
                <span className="text-sm font-bold">{activeNode.label.slice(0, 2)}</span>
              </span>
              <div>
                <p className="text-sm font-semibold">{activeNode.label}</p>
                <p className="text-xs capitalize text-muted-foreground">
                  {typeMeta[activeNode.type].label}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Relationships ({relations.length})
              </p>
              <div className="flex flex-col gap-2">
                {relations.map((r, i) => {
                  const otherId = r.from === active ? r.to : r.from
                  const other = nodeById[otherId]
                  return (
                    <button
                      key={i}
                      onClick={() => setActive(otherId)}
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 p-2.5 text-left transition-colors hover:border-primary/40"
                    >
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ background: typeMeta[other.type].color }}
                      />
                      <span className="text-sm font-medium">{other.label}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{r.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <p className="mt-auto text-pretty text-xs text-muted-foreground">
              Click any node in the graph or a relationship above to explore how equipment,
              failures, SOPs and engineers are connected.
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Select a node to see its relationships.</p>
        )}
      </div>
    </div>
  )
}
