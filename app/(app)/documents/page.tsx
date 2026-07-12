import { FileText } from "lucide-react"

import { PageHeading } from "@/components/page-heading"
import { DocumentUploader } from "@/components/documents/document-uploader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { recentUploads } from "@/lib/mock-data"

const stats = [
  { label: "Indexed documents", value: "18,930" },
  { label: "Processing queue", value: "4" },
  { label: "Storage used", value: "128 GB" },
  { label: "Auto-tagged", value: "97%" },
]

export default function DocumentsPage() {
  return (
    <>
      <PageHeading
        title="Document Upload"
        description="Upload manuals, inspection reports and logs. Files are auto-indexed and made searchable by the AI."
      />

      <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{s.label}</CardDescription>
              <CardTitle className="text-xl tabular-nums">{s.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Upload files</CardTitle>
            <CardDescription>Drag files onto the area below to start indexing</CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentUploader />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Processing pipeline</CardTitle>
            <CardDescription>How documents become intelligence</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              { step: "01", title: "Ingest", detail: "OCR + text extraction from any format" },
              { step: "02", title: "Classify", detail: "Auto-tag by asset, type and date" },
              { step: "03", title: "Embed", detail: "Vectorize for semantic search" },
              { step: "04", title: "Link", detail: "Connect to assets in the knowledge graph" },
            ].map((s) => (
              <div key={s.step} className="flex gap-3">
                <span className="font-mono text-xs text-primary">{s.step}</span>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="size-4 text-primary" />
            Recently uploaded
          </CardTitle>
          <CardDescription>File metadata and indexing status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded by</TableHead>
                  <TableHead className="text-right">When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUploads.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium">{f.name}</TableCell>
                    <TableCell>
                      <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                        {f.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{f.size}</TableCell>
                    <TableCell className="text-muted-foreground">{f.by}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{f.when}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
