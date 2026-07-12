import { PageHeading } from "@/components/page-heading"
import { MaintenanceBoard } from "@/components/maintenance/maintenance-board"
import { MaintenanceCostChart } from "@/components/charts/maintenance-cost-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MaintenancePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Maintenance"
        description="Predictive and planned work orders generated from AI analysis and technician input."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 bg-card/60 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Planned vs Reactive Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <MaintenanceCostChart />
          </CardContent>
        </Card>
      </div>
      <MaintenanceBoard />
    </div>
  )
}
