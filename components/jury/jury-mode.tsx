"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, Circle, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const steps = [
  { title: "Detect", text: "Identify the highest-priority asset risk from operational health signals.", metric: "62% health · At Risk" },
  { title: "Explain", text: "Show the AI root-cause reasoning instead of presenting a black-box prediction.", metric: "87% modeled risk" },
  { title: "Prove", text: "Trace the diagnosis back to inspection, vibration and thermal evidence.", metric: "96% top evidence match" },
  { title: "Connect", text: "Follow the relationship from evidence to diagnosis, work order and business impact.", metric: "7 nodes · 7 relationships" },
  { title: "Decide", text: "Simulate the operational consequence of delaying the recommended intervention.", metric: "12 hrs planned window" },
  { title: "Protect", text: "Translate the maintenance decision into avoided downtime and protected business value.", metric: "$76k estimated value" },
]

export function JuryMode() {
  const [active, setActive] = useState(0)
  const [running, setRunning] = useState(false)
  const step = steps[active]

  return (
    <section className="rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"><Sparkles className="size-5" /></div>
          <div>
            <div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-semibold">Jury Mode</h2><span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">Guided product story</span></div>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground">A six-step path that demonstrates how Industrial Brain turns operational evidence into an explainable maintenance decision.</p>
          </div>
        </div>
        <Button size="sm" onClick={() => { setRunning(true); setActive(0) }}><Play className="size-3.5" />Start 3–5 min demo</Button>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-border bg-background/70 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((item, index) => <button key={item.title} onClick={() => { setActive(index); setRunning(false) }} className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-colors", index === active ? "bg-primary text-primary-foreground" : index < active ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground")}><span>{index < active ? <CheckCircle2 className="size-3" /> : index === active ? <Circle className="size-3 fill-current" /> : <span className="inline-block size-3 rounded-full border" />}</span>{item.title}</button>)}
          </div>
          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">Step {active + 1} of {steps.length}</p>
            <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            <div className="mt-4 inline-flex rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-semibold">{step.metric}</div>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <Button variant="outline" size="sm" disabled={active === 0} onClick={() => setActive((value) => Math.max(0, value - 1))}>Previous</Button>
            <Button size="sm" disabled={active === steps.length - 1} onClick={() => { setActive((value) => Math.min(steps.length - 1, value + 1)); setRunning(false) }}>Next <ArrowRight className="size-3.5" /></Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/50 p-4">
          <p className="text-xs font-semibold">Jury takeaway</p>
          <p className="mt-2 text-sm font-medium leading-relaxed">“We don't stop at predicting failure. We explain it, prove it, connect it to an action, and quantify the decision.”</p>
          <div className="mt-4 space-y-2">
            {["Explainable AI", "Evidence-grounded reasoning", "Operational decision support", "Business impact"].map((item) => <div key={item} className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs"><CheckCircle2 className="size-3.5 text-primary" />{item}</div>)}
          </div>
          {running && <p className="mt-4 text-[11px] text-muted-foreground">Demo started. Use Next to guide the jury through the story.</p>}
        </div>
      </div>
    </section>
  )
}
