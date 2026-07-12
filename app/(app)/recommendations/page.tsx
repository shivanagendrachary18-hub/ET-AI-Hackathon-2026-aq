import { PageHeading } from "@/components/page-heading"
import { RecommendationsBoard } from "@/components/recommendations/recommendations-board"

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="AI Recommendations"
        description="Prioritized, evidence-backed actions ranked by risk, cost avoidance, and confidence."
      />
      <RecommendationsBoard />
    </div>
  )
}
