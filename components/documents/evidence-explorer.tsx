"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, ChevronRight, FileSearch, Link2, Search, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { assets, recentUploads } from "@/lib/mock-data"

const evidence = [
  { file: "Turbine-A7-Inspection.pdf", type: "PDF", asset: "Gas Turbine A-7", section: "Bearing inspection", snippet: "Vibration pattern is consistent with an early-stage inner-race bearing fault. Follow-up inspection is recommended within 14 days.", relevance: 96, tag: "Root cause" },
  { file: "Gearbox-Vibration-Report.pdf", type: "PDF", asset: "Gas Turbine A-7", section: "Vibration spectrum", snippet: "The latest spectrum shows a rising harmonic component around the bearing frequency compared with the previous baseline.", relevance: 93, tag: "Sensor evidence" },
  { file: "Thermal-Scan-Bearing.png", type: "Image", asset: "Gas Turbine A-7", section: "Thermal scan", snippet: "Localized temperature elevation is visible near the bearing housing and should be correlated with vibration findings.", relevance: 86, tag: "Corroboration" },
  { file: "Compressor-SOP-v3.docx", type: "DOCX", asset: "Air Compressor C-3", section: "Intercooler maintenance", snippet: "Inspect and clean the intercooler when discharge temperature exceeds the established operating baseline.", relevance: 84, tag: "Procedure" },
  { file: "Pump-Station-Logs-Q2.xlsx", type: "Excel", asset: "Centrifugal Pump P-114", section: "Operating log", snippet: "Pump P-114 remains within normal pressure and vibration ranges across the latest recorded operating cycles.", relevance: 78, tag: "Operational log" },
  { file: "Boiler-B1-Inspection.pdf", type: "PDF", asset: "Boiler B-1", section: "Compliance inspection", snippet: "Pressure-vessel inspection record requires renewal before the next audit window.", relevance: 89, tag: "Compliance" },
]

export function EvidenceExplorer() {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(evidence[0])
  const [assetFilter, setAssetFilter] = useState("All")

  const assetsWithEvidence = ["All", ...Array.from(new Set(evidence.map((item) => item.asset)))]
  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    return evidence.filter((item) => {
      const matchesAsset = assetFilter === "All" || item.asset === assetFilter
      const matchesQuery = !q || [item.file, item.asset, item.section, item.snippet, item.tag].some((value) => value.toLowerCase().includes(q))
      return matchesAsset && matchesQuery
    })
  }, [assetFilter, query])

  const askSuggestions = [
    "Why is Turbine A-7 at risk?",
    "What evidence supports the bearing diagnosis?",
    "Which document contains the maintenance procedure?",
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_1.4fr]">
      <section className="glass min-h-[560px] rounded-xl border border-border p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search evidence, assets, reports…" className="pl-9" />
          </div>
          <Badge variant="secondary">{results.length} results</Badge>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {assetsWithEvidence.map((assetName) => (
            <Button key={assetName} size="sm" variant={assetFilter === assetName ? "default" : "outline"} onClick={() => setAssetFilter(assetName)} className="shrink-0">
              {assetName === "All" ? assetName : assetName.replace("Gas Turbine ", "GT ").replace("Centrifugal Pump ", "Pump ")}
            </Button>
          ))}
        </div>

        <ScrollArea className="mt-3 h-[455px] pr-3">
          <div className="space-y-2">
            {results.map((item) => (
              <button key={`${item.file}-${item.section}`} onClick={() => setSelected(item)} className={cn("w-full rounded-lg border p-3 text-left transition-colors", selected.file === item.file && selected.section === item.section ? "border-primary bg-primary/5" : "border-border bg-secondary/20 hover:border-primary/40")}>
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary"><FileSearch className="size-4" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2"><p className="truncate text-sm font-medium">{item.file}</p><Badge variant="outline">{item.tag}</Badge></div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.asset} · {item.section}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.snippet}</p>
                    <div className="mt-2 flex items-center gap-2"><Progress value={item.relevance} className="h-1 flex-1" /><span className="text-[10px] font-semibold text-primary">{item.relevance}% match</span></div>
                  </div>
                  <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                </div>
              </button>
            ))}
            {results.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No indexed evidence matches your search.</p>}
          </div>
        </ScrollArea>
      </section>

      <section className="glass rounded-xl border border-border p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2"><Sparkles className="size-4 text-accent" /><p className="text-sm font-semibold">AI Evidence View</p><Badge variant="secondary">Grounded</Badge></div>
            <h3 className="mt-2 text-lg font-semibold">{selected.file}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{selected.asset} · {selected.section}</p>
          </div>
          <div className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-right"><p className="text-[10px] uppercase tracking-wide text-muted-foreground">Relevance</p><p className="text-lg font-bold text-primary">{selected.relevance}%</p></div>
        </div>

        <div className="mt-5 rounded-xl border border-accent/30 bg-accent/10 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent"><CheckCircle2 className="size-4" />Evidence extracted by AI</div>
          <p className="mt-3 text-sm leading-relaxed">{selected.snippet}</p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-secondary/30 p-3"><p className="text-xs text-muted-foreground">Document type</p><p className="mt-1 text-sm font-medium">{selected.type}</p></div>
          <div className="rounded-lg border border-border bg-secondary/30 p-3"><p className="text-xs text-muted-foreground">Linked asset</p><p className="mt-1 text-sm font-medium">{selected.asset}</p></div>
        </div>

        <div className="mt-4 rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 text-xs font-semibold"><Link2 className="size-4 text-primary" />Why this evidence matters</div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">This evidence is linked to the asset's operational context and can be used to justify an AI diagnosis, maintenance recommendation, or compliance decision rather than presenting an unsupported prediction.</p>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold">Ask the evidence layer</p>
          <div className="flex flex-wrap gap-2">
            {askSuggestions.map((suggestion) => <Button key={suggestion} size="sm" variant="outline" className="text-xs" onClick={() => setQuery(suggestion)}>{suggestion}</Button>)}
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold">Indexed knowledge base</p>
          <p className="mt-1 text-xs text-muted-foreground">{recentUploads.length} demo documents are surfaced here as connected evidence. The production architecture can replace this index with OCR + embeddings + vector search without changing the user experience.</p>
        </div>
      </section>
    </div>
  )
}
