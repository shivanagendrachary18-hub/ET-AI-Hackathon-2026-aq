"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { complianceStats } from "@/lib/mock-data"

const colors = ["var(--chart-3)", "var(--chart-4)", "var(--destructive)"]

const config = {
  value: { label: "Items" },
  Compliant: { label: "Compliant", color: "var(--chart-3)" },
  "Pending Review": { label: "Pending Review", color: "var(--chart-4)" },
  "Non-Compliant": { label: "Non-Compliant", color: "var(--destructive)" },
}

export function ComplianceChart() {
  const total = complianceStats.reduce((s, d) => s + d.value, 0)
  return (
    <ChartContainer config={config} className="mx-auto aspect-square max-h-[220px]">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="label" />} />
        <Pie
          data={complianceStats}
          dataKey="value"
          nameKey="label"
          innerRadius={60}
          outerRadius={90}
          strokeWidth={2}
        >
          {complianceStats.map((_, i) => (
            <Cell key={i} fill={colors[i]} stroke="var(--card)" />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
