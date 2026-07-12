import { GraphEntityTable } from "@/components/knowledge-graph/graph-entity-table"
import { GraphView } from "@/components/knowledge-graph/graph-view"
import { PageHeading } from "@/components/page-heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { graphStats } from "@/lib/mock-data"
import { Download, Search } from "lucide-react"

export default function KnowledgeGraphPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Knowledge Graph"
        description="Explore relationships between equipment, failure modes, standard operating procedures and engineers."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Search data-icon="inline-start" />
              Search entities
            </Button>
            <Button variant="outline" size="sm">
              <Download data-icon="inline-start" />
              Export graph
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {graphStats.map((stat) => (
          <Card key={stat.label} className="border-border/60 bg-card/60">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{stat.label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">{stat.hint}</CardContent>
          </Card>
        ))}
      </div>

      <GraphView />
      <GraphEntityTable />
    </div>
  )
}
