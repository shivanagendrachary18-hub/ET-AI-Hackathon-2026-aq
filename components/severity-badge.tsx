import { cn } from "@/lib/utils"

type Level = string

const styles: Record<string, string> = {
  low: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  medium: "bg-accent/15 text-accent border-accent/30",
  high: "bg-destructive/15 text-destructive border-destructive/30",
  critical: "bg-destructive/20 text-destructive border-destructive/40",
  operational: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  monitor: "bg-accent/15 text-accent border-accent/30",
  "at risk": "bg-destructive/15 text-destructive border-destructive/30",
  optimal: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  scheduled: "bg-primary/15 text-primary border-primary/30",
  "in progress": "bg-accent/15 text-accent border-accent/30",
  overdue: "bg-destructive/20 text-destructive border-destructive/40",
  done: "bg-chart-3/15 text-chart-3 border-chart-3/30",
}

export function SeverityBadge({
  level,
  children,
  className,
}: {
  level: Level
  children?: React.ReactNode
  className?: string
}) {
  const key = level.toLowerCase()
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[key] ?? "bg-secondary text-secondary-foreground border-border",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {children ?? level}
    </span>
  )
}
