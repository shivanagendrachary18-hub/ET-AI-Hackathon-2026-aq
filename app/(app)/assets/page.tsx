import { PageHeading } from "@/components/page-heading"
import { AssetExplorer } from "@/components/assets/asset-explorer"

export default function AssetsPage() {
  return (
    <>
      <PageHeading
        title="Asset Explorer"
        description="Search equipment and drill into maintenance history, linked documents and incident records."
      />
      <AssetExplorer />
    </>
  )
}
