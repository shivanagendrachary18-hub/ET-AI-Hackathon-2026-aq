import { PageHeading } from "@/components/page-heading"
import { GraphView } from "@/components/knowledge-graph/graph-view"

export default function KnowledgeGraphPage() {
  return (
    <>
      <PageHeading
        title="Knowledge Graph"
        description="Explore relationships between equipment, failure modes, standard operating procedures and engineers."
      />
      <GraphView />
    </>
  )
}
