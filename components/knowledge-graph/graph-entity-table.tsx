import { graphEntityIndex } from "@/lib/mock-data"
import { SeverityBadge } from "@/components/severity-badge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function GraphEntityTable() {
  return (
    <Card className="border-border/60 bg-card/60">
      <CardHeader>
        <CardTitle className="text-base">Entity Index</CardTitle>
        <CardDescription>
          Searchable registry of nodes in the knowledge graph with relationship and document counts.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entity</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Relations</TableHead>
              <TableHead className="hidden md:table-cell">Documents</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {graphEntityIndex.map((entity) => (
              <TableRow key={entity.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{entity.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">{entity.id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {entity.type}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell tabular-nums text-sm text-muted-foreground">
                  {entity.relations}
                </TableCell>
                <TableCell className="hidden md:table-cell tabular-nums text-sm text-muted-foreground">
                  {entity.documents}
                </TableCell>
                <TableCell>
                  <SeverityBadge level={entity.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
