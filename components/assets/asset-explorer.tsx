"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  Calendar,
  FileText,
  MapPin,
  Search,
  Wrench,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { SeverityBadge } from "@/components/severity-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { assets, maintenanceTimeline, recentUploads, type Asset } from "@/lib/mock-data"

const incidents = [
  { id: "in1", date: "2025-07-06", title: "High vibration alarm", severity: "high" },
  { id: "in2", date: "2025-05-02", title: "Temperature threshold exceeded", severity: "medium" },
  { id: "in3", date: "2025-03-18", title: "Unexpected shutdown", severity: "high" },
]

function healthColor(h: number) {
  if (h >= 85) return "text-chart-3"
  if (h >= 70) return "text-chart-2"
  if (h >= 55) return "text-accent"
  return "text-destructive"
}

export function AssetExplorer() {
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string>(assets[0].id)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return assets.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q),
    )
  }, [query])

  const selected = assets.find((a) => a.id === selectedId) as Asset

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr] xl:grid-cols-[1fr_1.3fr]">
      {/* List */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search equipment by name, tag, type or location…"
            className="h-10 bg-secondary/50 pl-9"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={cn(
                "glass flex flex-col gap-3 rounded-xl border p-4 text-left transition-colors",
                a.id === selectedId
                  ? "border-primary ring-1 ring-primary/40"
                  : "border-border hover:border-primary/40",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{a.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{a.tag}</p>
                </div>
                <SeverityBadge level={a.status} />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {a.location}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Health</span>
                  <span className={cn("font-semibold tabular-nums", healthColor(a.health))}>
                    {a.health}%
                  </span>
                </div>
                <Progress value={a.health} className="h-1.5" />
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
              No equipment matches “{query}”.
            </p>
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="glass flex flex-col gap-4 rounded-xl border border-border p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{selected.name}</h3>
            <p className="font-mono text-xs text-muted-foreground">
              {selected.tag} · {selected.type}
            </p>
          </div>
          <SeverityBadge level={selected.status} />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Health", value: `${selected.health}%`, cls: healthColor(selected.health) },
            { label: "Documents", value: selected.docs, cls: "text-foreground" },
            { label: "Incidents", value: selected.incidents, cls: "text-foreground" },
            { label: "Last service", value: selected.lastService.slice(5), cls: "text-foreground" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={cn("mt-1 text-lg font-semibold tabular-nums", s.cls)}>{s.value}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="history" className="mt-1">
          <TabsList>
            <TabsTrigger value="history">
              <Wrench data-icon="inline-start" />
              History
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText data-icon="inline-start" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="incidents">
              <AlertTriangle data-icon="inline-start" />
              Incidents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="pt-4">
            <ol className="relative ml-3 border-l border-border">
              {maintenanceTimeline.map((t) => (
                <li key={t.id} className="mb-5 ml-5 last:mb-0">
                  <span className="absolute -left-[7px] mt-1 size-3 rounded-full border-2 border-background bg-primary" />
                  <div className="flex items-center gap-2">
                    <Calendar className="size-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{t.date}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.meta}</p>
                </li>
              ))}
            </ol>
          </TabsContent>

          <TabsContent value="documents" className="flex flex-col gap-2 pt-4">
            {recentUploads.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-2.5">
                <div className="flex size-9 items-center justify-center rounded-md bg-primary/15 text-[10px] font-semibold text-primary">
                  {d.type}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.size}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="incidents" className="flex flex-col gap-2 pt-4">
            {incidents.map((i) => (
              <div key={i.id} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{i.title}</p>
                  <p className="text-xs text-muted-foreground">{i.date}</p>
                </div>
                <SeverityBadge level={i.severity} />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
