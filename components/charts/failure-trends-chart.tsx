"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { failureTrends } from "@/lib/mock-data"

const config = {
  mechanical: { label: "Mechanical", color: "var(--chart-1)" },
  electrical: { label: "Electrical", color: "var(--chart-2)" },
  thermal: { label: "Thermal", color: "var(--chart-3)" },
} satisfies ChartConfig

export function FailureTrendsChart() {
  return (
    <ChartContainer config={config} className="h-[260px] w-full">
      <BarChart data={failureTrends} margin={{ left: 4, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={28} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="mechanical" fill="var(--color-mechanical)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="electrical" fill="var(--color-electrical)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="thermal" fill="var(--color-thermal)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
