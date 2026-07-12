import { ComplianceBoard } from "@/components/compliance/compliance-board"
import { ComplianceChart } from "@/components/charts/compliance-chart"
import { PageHeading } from "@/components/page-heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { complianceStats } from "@/lib/mock-data"
import { FileDown, ShieldCheck } from "lucide-react"

export default function CompliancePage() {
  const total = complianceStats.reduce((sum, item) => sum + item.value, 0)
  const score = Math.round((complianceStats[0].value / total) * 100)

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Compliance"
        description="Regulatory status, safety audits and open compliance gaps across all facilities."
        action={
          <Button variant="outline">
            <FileDown data-icon="inline-start" />
            Export audit report
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 bg-card/60">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5 text-xs">
              <ShieldCheck className="size-3.5" />
              Overall compliance score
            </CardDescription>
            <CardTitle className="text-3xl tabular-nums">{score}%</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            {complianceStats[0].value} of {total} requirements met
          </CardContent>
        </Card>

        {complianceStats.map((stat) => (
          <Card key={stat.label} className="border-border/60 bg-card/60">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{stat.label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Tracked requirements
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="text-base">Compliance Breakdown</CardTitle>
          <CardDescription>Distribution of compliant, pending and non-compliant items</CardDescription>
        </CardHeader>
        <CardContent>
          <ComplianceChart />
        </CardContent>
      </Card>

      <ComplianceBoard />
    </div>
  )
}
