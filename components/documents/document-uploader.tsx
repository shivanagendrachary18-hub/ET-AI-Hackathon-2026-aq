"use client"

import { useCallback, useRef, useState } from "react"
import { CheckCircle2, FileText, UploadCloud, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type UploadFile = {
  id: string
  name: string
  size: string
  type: string
  progress: number
  done: boolean
}

const typeFromName = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase()
  if (ext === "pdf") return "PDF"
  if (ext === "doc" || ext === "docx") return "DOCX"
  if (ext === "xls" || ext === "xlsx" || ext === "csv") return "Excel"
  if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext ?? "")) return "Image"
  return "File"
}

const fmtSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function DocumentUploader() {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<UploadFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const simulate = useCallback((id: string) => {
    const tick = () => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== id || f.done) return f
          const next = Math.min(100, f.progress + Math.random() * 22 + 8)
          return { ...f, progress: next, done: next >= 100 }
        }),
      )
    }
    const interval = setInterval(() => {
      tick()
      setFiles((prev) => {
        const target = prev.find((f) => f.id === id)
        if (target?.done) clearInterval(interval)
        return prev
      })
    }, 400)
  }, [])

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return
      const incoming: UploadFile[] = Array.from(list).map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: fmtSize(file.size),
        type: typeFromName(file.name),
        progress: 0,
        done: false,
      }))
      setFiles((prev) => [...incoming, ...prev])
      incoming.forEach((f) => simulate(f.id))
    },
    [simulate],
  )

  return (
    <div className="flex flex-col gap-4">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
          dragging
            ? "border-primary bg-primary/10"
            : "border-border bg-secondary/20 hover:border-primary/50 hover:bg-secondary/40",
        )}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <UploadCloud className="size-7" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">
            Drag &amp; drop files here, or <span className="text-primary">browse</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, DOCX, Excel and image files up to 50 MB
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {["PDF", "DOCX", "Excel", "Image"].map((t) => (
            <span key={t} className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
        />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((f) => (
            <div key={f.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/15 text-[10px] font-semibold text-primary">
                {f.done ? <CheckCircle2 className="size-5 text-chart-3" /> : <FileText className="size-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{f.size}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Progress value={f.progress} className="h-1.5" />
                  <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                    {Math.round(f.progress)}%
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                aria-label="Remove"
                onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
