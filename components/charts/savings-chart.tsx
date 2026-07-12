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
import { costSavingsTrend } from "@/lib/mock-data"

const config = {
  predictive: { label: "Predictive Actions", color: "var(--chart-1)" },
  avoided: { label: "Downtime Avoided", color: "var(--chart-3)" },
} satisfies ChartConfig

export function SavingsChart() {
  return (
    <ChartContainer config={config} className="h-[260px] w-full">
      <BarChart data={costSavingsTrend} margin={{ left: 4, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={40}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="predictive" fill="var(--color-predictive)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="avoided" fill="var(--color-avoided)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
