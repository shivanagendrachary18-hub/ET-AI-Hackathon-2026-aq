import Link from "next/link"
import { ArrowRight, BrainCircuit, CheckCircle2, CircleDot, FileSearch, Gauge, ShieldCheck, Sparkles, Wrench } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  { number: "01", label: "Detect", title: "AI finds the risk", detail: "Turbine A-7 health is 62% with a high-risk prediction.", href: "/assets", icon: Gauge },
  { number: "02", label: "Explain", title: "AI explains why", detail: "Bearing, vibration and temperature evidence support the diagnosis.", href: "/assets", icon: BrainCircuit },
  { number: "03", label: "Prove", title: "Evidence is traceable", detail: "Inspection and vibration reports are linked to the decision.", href: "/documents", icon: FileSearch },
  { number: "04", label: "Decide", title: "Simulate the action", detail: "Compare planned intervention with delayed operational exposure.", href: "/assets", icon: Wrench },
  { number: "05", label: "Protect", title: "Show business impact", detail: "Translate the recommendation into downtime and value protected.", href: "/analytics", icon: ShieldCheck },
]

export function JuryMode() {
  return (
    <Card className="glass overflow-hidden border-primary/25 bg-primary/[0.035]">
      <CardHeader className="border-b border-border/70 bg-background/30 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-accent" />
              <CardTitle className="text-base">Jury Mode · AI Decision Journey</CardTitle>
              <Badge variant="secondary">Demo-ready</Badge>
            </div>
            <CardDescription className="mt-1.5 max-w-2xl">
              A five-step story for the live presentation: detect a failure risk, explain it, prove it with evidence, simulate the decision, and quantify the outcome.
            </CardDescription>
          </div>
          <Button render={<Link href="/assets" />} nativeButton={false} size="sm">
            Start with Turbine A-7
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid gap-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Link
                key={step.number}
                href={step.href}
                className="group relative rounded-lg border border-border bg-background/45 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-background/70"
              >
                {index < steps.length - 1 && <CircleDot className="absolute -right-2.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 bg-background text-muted-foreground lg:block" />}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-semibold text-primary">{step.number}</span>
                  {index === 0 ? <span className="flex items-center gap-1 text-[10px] font-medium text-chart-3"><CheckCircle2 className="size-3" />Ready</span> : null}
                </div>
                <div className="mt-3 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{step.label}</p>
                <p className="mt-1 text-sm font-semibold leading-tight">{step.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
              </Link>
            )
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-accent/25 bg-accent/10 px-3 py-2.5">
          <p className="text-xs font-medium">Core pitch: <span className="font-normal text-muted-foreground">"Industrial Brain turns scattered operational data into an explainable maintenance decision with measurable business impact."</span></p>
          <span className="text-[10px] font-semibold text-accent">Evidence → Intelligence → Action → Value</span>
        </div>
      </CardContent>
    </Card>
  )
}
