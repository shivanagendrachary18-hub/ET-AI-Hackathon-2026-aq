import { PageHeading } from "@/components/page-heading"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SeverityBadge } from "@/components/severity-badge"
import { recommendations } from "@/lib/mock-data"
import { Check, Clock, TrendingDown, X } from "lucide-react"

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="AI Recommendations"
        description="Prioritized, evidence-backed actions ranked by risk, cost avoidance, and confidence."
      />
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
    </div>
  )
}
